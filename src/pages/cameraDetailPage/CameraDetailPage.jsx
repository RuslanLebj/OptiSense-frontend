import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import PageTitle from '../../components/titles/pageTitle/PageTitle';
import SmallTitle from '../../components/titles/smallTitle/SmallTitle';
import DetailPageContainer from '../../components/containers/detailPageContainer/DetailPageContainer';
import FlexSpacerContainer from '../../components/containers/flexSpacerContainer/FlexSpacerContainer';
import DetailPageElementContainer
    from '../../components/containers/detailPageElementContainer/DetailPageElementContainer';
import SaveButton from '../../components/buttons/SaveButton.jsx';
import CancelButton from '../../components/buttons/CancelButton';
import ButtonsContainer from '../../components/containers/buttonsContainer/ButtonsContainer';
import RoiBox from "../../components/roiBox/RoiBox.jsx";
import CheckboxGroup from "../../components/checkboxGroup/CheckboxGroup.jsx";

const baseUrl = import.meta.env.VITE_BASE_URL;

const parameterLabels = {
    has_earrings: 'Наличие украшений',
    queue_length: 'Длина очереди',
    service_duration: 'Скорость обслуживания',
};

const CameraDetailPage = () => {
    const {id} = useParams(); // Извлечение ID из URL
    const [cameraDetails, setCameraDetails] = useState([]);
    const [formData, setFormData] = useState({
        preview: '',
        roi_polygons_points: '',
        parameter_types: {},
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${baseUrl}/cameras/${id}/`);
                setCameraDetails(response.data);
                setFormData({
                    preview: response.data.preview,
                    roi_polygons_points: response.data.roi_polygons_points,
                    parameter_types: response.data.parameter_types || {},
                }); // Устанавливаем начальное значение формы
            } catch (err) {
                console.error('Error fetching camera details:', err);
                setError('Failed to load camera details');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    // Обработчик сохранения изменений
    const handleSave = async () => {
        try {
            const response = await axios.patch(`${baseUrl}/cameras/${id}/`, formData);
            setCameraDetails(response.data);
        } catch (err) {
            console.error('Error saving camera details:', err);
        }
    };

    // Обработчик отмены изменений
    const handleCancel = () => {
        // Отмена изменений и восстановление изначальных данных
        setFormData({
            preview: cameraDetails.preview,
            roi_polygons_points: cameraDetails.roi_polygons_points,
            parameter_types: cameraDetails.parameter_types,
        });
    };

    // Обработчик изменения значений параметров
    const handleParameterChange = (param, checked) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            parameter_types: {
                ...prevFormData.parameter_types,
                [param]: checked, // Обновляем конкретный параметр в formData
            },
        }));
        console.log(formData.parameter_types);
    };

    // if (loading) return <PageTitle title={`Загрузка...`} />;
    if (error) return <PageTitle title={`Error: ${error}`}/>;

    return (
        <>
            <DetailPageContainer>
                <FlexSpacerContainer>
                    <PageTitle title={`Камера ${cameraDetails.name} на ${cameraDetails.outlet_detail?.address}`}/>
                    <ButtonsContainer>
                        <CancelButton onClick={handleCancel}>
                            Отменить
                        </CancelButton>
                        <SaveButton onClick={handleSave}>
                            Сохранить
                        </SaveButton>
                    </ButtonsContainer>
                </FlexSpacerContainer>
                <FlexSpacerContainer>
                    <div className="lg:w-2/4">
                        <DetailPageElementContainer>
                            <SmallTitle title={"Логин для камеры:"}/>
                            {cameraDetails.connection_login}
                        </DetailPageElementContainer>
                        <DetailPageElementContainer>
                            <SmallTitle title={"Пароль для камеры:"}/>
                            {cameraDetails.connection_password}
                        </DetailPageElementContainer>
                        <DetailPageElementContainer>
                            <SmallTitle title={"Ссылка на видеотрансляцию:"}/>
                            <a
                                href={cameraDetails.url_address}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 mb-2 py-1 hover:text-blue-700 transition duration-300"
                            >
                                {cameraDetails.url_address}
                            </a>
                        </DetailPageElementContainer>
                        <DetailPageElementContainer>
                            <SmallTitle title={"Параметры отслеживания:"}/>
                            <CheckboxGroup
                                parameters={formData.parameter_types} // Передаем параметры из formData
                                labels={parameterLabels}
                                onChange={handleParameterChange} // Обработчик изменения
                            />
                        </DetailPageElementContainer>
                    </div>
                    <div className="lg:w-3/4">
                        <RoiBox imageSrc={cameraDetails.preview} initialPolygons={cameraDetails.roi_polygons_points}
                                onPolygonsChange={(updatedPolygons) => setFormData((prev) => ({
                                    ...prev,
                                    roi_polygons_points: updatedPolygons
                                }))}/>
                    </div>
                </FlexSpacerContainer>
            </DetailPageContainer>
        </>
    );
};

export default CameraDetailPage;