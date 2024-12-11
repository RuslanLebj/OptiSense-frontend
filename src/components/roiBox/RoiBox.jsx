import React, { useRef, useState, useEffect } from 'react';
import AcceptButton from "../buttons/AcceptButton.jsx";
import { CheckIcon, XMarkIcon, ArrowUturnLeftIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import ButtonsContainer from "../containers/buttonsContainer/ButtonsContainer.jsx";
import dragImg from "../../assets/dragImg.png"

const RoiBox = ({ imageSrc, initialPolygons = [], onPolygonsChange}) => {
    const canvasRef = useRef(null);
    const offScreenCanvasRef = useRef(document.createElement('canvas'));
    const [scaleFactor, setScaleFactor] = useState(1);
    const [points, setPoints] = useState([]);
    const [masterPoints, setMasterPoints] = useState([]);
    const [imgLoaded, setImgLoaded] = useState(false);
    const [img, setImg] = useState(null);
    const [mousePosition, setMousePosition] = useState(null);

    const containerWidth = 700;
    const containerHeight = 500;

    useEffect(() => {
        if (initialPolygons && initialPolygons.polygons && initialPolygons.polygons.length > 0) {
            // Преобразуем формат данных
            const formattedPolygons = initialPolygons.polygons.map(polygon =>
                polygon.points.map(point => [point.x, point.y])
            );
            setMasterPoints(formattedPolygons);
        }
    }, [initialPolygons]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const offScreenCanvas = offScreenCanvasRef.current;

        if (!canvas || !offScreenCanvas) return;

        const context = canvas.getContext('2d');
        const offScreenCtx = offScreenCanvas.getContext('2d');

        // Загружаем изображение из props или используем дефолтное
        const defaultImg = new Image();
        defaultImg.src = imageSrc || dragImg;
        defaultImg.onload = () => {
            setImg(defaultImg);
            setImgLoaded(true);

            const scale = Math.min(containerWidth / defaultImg.width, containerHeight / defaultImg.height);
            setScaleFactor(scale);

            canvas.width = defaultImg.width;
            canvas.height = defaultImg.height;
            offScreenCanvas.width = defaultImg.width;
            offScreenCanvas.height = defaultImg.height;

            offScreenCtx.drawImage(defaultImg, 0, 0);
            context.drawImage(defaultImg, 0, 0);
        };
    }, [imageSrc]); // Обновляем картинку при изменении `imageSrc`

    const handleImageDrop = (e) => {
        e.preventDefault();
        const canvas = canvasRef.current;
        const offScreenCanvas = offScreenCanvasRef.current;
        const context = canvas.getContext('2d');
        const offScreenCtx = offScreenCanvas.getContext('2d');

        const file = e.dataTransfer.files[0];
        if (!file || !file.type.startsWith('image/')) {
            alert('Пожалуйста, прикрепите изображение!');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const newImg = new Image();
            newImg.src = event.target.result;
            newImg.onload = () => {
                setImg(newImg);
                setImgLoaded(true);

                const scale = Math.min(containerWidth / newImg.width, containerHeight / newImg.height);
                setScaleFactor(scale);

                canvas.width = newImg.width;
                canvas.height = newImg.height;
                offScreenCanvas.width = newImg.width;
                offScreenCanvas.height = newImg.height;

                offScreenCtx.clearRect(0, 0, offScreenCanvas.width, offScreenCanvas.height);
                offScreenCtx.drawImage(newImg, 0, 0);
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(newImg, 0, 0);
            };
        };
        reader.readAsDataURL(file);
    };

    const handleCanvasClick = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = Math.round((e.clientX - rect.left) / scaleFactor);
        const y = Math.round((e.clientY - rect.top) / scaleFactor);

        if (points.length > 1) {
            const [startX, startY] = points[0];
            const distance = Math.sqrt((x - startX) ** 2 + (y - startY) ** 2);
            if (distance < 10) {
                completePolygon();
                return;
            }
        }
        setPoints((prevPoints) => [...prevPoints, [x, y]]);
    };

    const completePolygon = () => {
        const updatedPolygons = [...masterPoints, points]; // Объединённый массив для готовых и только завершённого полигонов

        setMasterPoints(updatedPolygons); // Сохраняем актуальные данные
        setPoints([]);
        setMousePosition(null);

        if (onPolygonsChange) {
            const polygonsData = convertToPolygonsData(updatedPolygons);
            onPolygonsChange(polygonsData);
        }
    };

    const undoLastAction = () => {
        if (points.length > 0) {
            // Удаляем последнюю точку из текущего полигона
            const updatedPoints = points.slice(0, -1);
            setPoints(updatedPoints);

            // Обновляем родительский компонент с измененным текущим полигоном
            if (onPolygonsChange) {
                const polygonsData = convertToPolygonsData([...masterPoints, updatedPoints].filter(polygon => polygon.length > 0));
                onPolygonsChange(polygonsData);
            }
        } else if (masterPoints.length > 0) {
            // Удаляем последний завершенный полигон
            const updatedPolygons = masterPoints.slice(0, -1);
            setMasterPoints(updatedPolygons);

            // Обновляем родительский компонент с новыми данными
            if (onPolygonsChange) {
                const polygonsData = convertToPolygonsData(updatedPolygons);
                onPolygonsChange(polygonsData);
            }
        }
    };

    const clearAll = () => {
        setMasterPoints([]);
        setPoints([]);
        setMousePosition(null);
        if (onPolygonsChange) {
            onPolygonsChange([]); // Уведомляем родителя об очистке
        }
    };

    const drawPolygons = () => {
        const context = canvasRef.current.getContext('2d');
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        if (imgLoaded && img) {
            context.drawImage(img, 0, 0);
        }

        masterPoints.forEach((polygon) => {
            context.beginPath();
            polygon.forEach(([x, y], index) => {
                if (index === 0) {
                    context.moveTo(x, y);
                } else {
                    context.lineTo(x, y);
                }
            });
            context.closePath();

            context.fillStyle = 'rgba(0, 0, 0, 0.3)';
            context.fill();

            context.strokeStyle = 'red';
            context.lineWidth = 3;
            context.stroke();

            polygon.forEach(([x, y]) => {
                context.beginPath();
                context.arc(x, y, 5, 0, Math.PI * 2);
                context.fillStyle = 'red';
                context.fill();
            });
        });

        if (points.length > 0) {
            context.beginPath();
            points.forEach(([x, y], index) => {
                if (index === 0) {
                    context.moveTo(x, y);
                } else {
                    context.lineTo(x, y);
                }
            });
            context.strokeStyle = 'blue';
            context.lineWidth = 3;
            context.stroke();

            points.forEach(([x, y]) => {
                context.beginPath();
                context.arc(x, y, 5, 0, Math.PI * 2);
                context.fillStyle = 'blue';
                context.fill();
            });

            if (mousePosition) {
                const [lastX, lastY] = points[points.length - 1];
                const [mouseX, mouseY] = mousePosition;
                context.beginPath();
                context.moveTo(lastX, lastY);
                context.lineTo(mouseX, mouseY);
                context.strokeStyle = 'orange';
                context.lineWidth = 3;
                context.stroke();
            }
        }
    };

    const convertToPolygonsData = (polygons) => ({
        polygons: polygons.map((polygon, index) => ({
            id: index + 1,
            points: polygon.map(([x, y]) => ({ x, y }))
        }))
    });

    useEffect(() => {
        if (imgLoaded) {
            drawPolygons();
        }
    }, [imgLoaded, points, masterPoints, mousePosition]);

    return (
        <>
            <div
                className="image-container rounded border-solid border-2 border-red-400 bg-gray-100"
                onDrop={handleImageDrop}
                onDragOver={(e) => e.preventDefault()}
                style={{
                    width: `${containerWidth}px`,
                    height: `${containerHeight}px`,
                    overflow: 'hidden',
                    position: 'relative'
                }}
            >
                <canvas
                    ref={canvasRef}
                    onClick={handleCanvasClick}
                    onMouseMove={(e) => {
                        const rect = canvasRef.current.getBoundingClientRect();
                        const x = Math.round((e.clientX - rect.left) / scaleFactor);
                        const y = Math.round((e.clientY - rect.top) / scaleFactor);
                        setMousePosition([x, y]);
                    }}
                    style={{
                        width: `${canvasRef.current?.width * scaleFactor}px`,
                        height: `${canvasRef.current?.height * scaleFactor}px`,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                />
            </div>
            <ButtonsContainer>
                <AcceptButton onClick={completePolygon} icon={CheckIcon} label="Завершить область" />
                <AcceptButton onClick={undoLastAction} icon={ArrowUturnLeftIcon} label="Назад" />
                <AcceptButton onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(convertToPolygonsData(masterPoints), null, 2));
                }} icon={ArrowTopRightOnSquareIcon} label="Экспортировать JSON" />
                <AcceptButton onClick={clearAll} icon={XMarkIcon} label="Очистить всё" />
            </ButtonsContainer>
        </>
    );
};

export default RoiBox;
