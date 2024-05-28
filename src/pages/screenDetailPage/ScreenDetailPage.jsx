import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import PageTitle from "../../components/titles/pageTitle/PageTitle.jsx";
import DetailPageContainer from "../../components/containers/detailPageContainer/DetailPageContainer.jsx";
import FlexSpacerContainer from "../../components/containers/flexSpacerContainer/FlexSpacerContainer.jsx";
import ButtonsContainer from "../../components/containers/buttonsContainer/ButtonsContainer.jsx";
import CancelButton from "../../components/buttons/CancelButton.jsx";
import AcceptButton from "../../components/buttons/AcceptButton.jsx";
import DropdownMenuContainer from "../../components/dropdownMenu/DropdownMenuContiner.jsx";
import IconButton from "../../components/buttons/IconButton.jsx";
import {EllipsisVerticalIcon} from "@heroicons/react/24/outline/index.js";
import DropdownMenu from "../../components/dropdownMenu/DropdownMenu.jsx";
import DropdownMenuButton from "../../components/dropdownMenu/DropdownMenuButton.jsx";
import HalfWidthContainer from "../../components/containers/halfWidthContainer/HalfWidthContainer.jsx";
import DetailPageElementContainer
    from "../../components/containers/detailPageElementContainer/DetailPageElementContainer.jsx";
import SmallTitle from "../../components/titles/smallTitle/SmallTitle.jsx";
import ScheduleDashboard from "../../components/dashboards/scheduleDashboard/ScheduleDashboard.jsx";

const ScreenDetailPage = () => {
    const { id } = useParams(); // Извлечение ID из URL
    const [screen, setScreen] = useState({ name: '', start_time: '', end_time: '', pause_time: '', update_date: '', camera: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Dropdown menu
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/screen/${id}/`);
                setScreen(response.data); // Устанавливаем значение screen
                console.log(response.data)
            } catch (err) {
                console.error('Error fetching screen details:', err);
                setError('Failed to load screen details');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    // if (loading) return <PageTitle title={`Загрузка...`} />;
    if (error) return <PageTitle title={`Error: ${error}`}/>;

    return (
        <>
            <DetailPageContainer>
                <FlexSpacerContainer>
                    <PageTitle title={"Сведения о экране"} />
                    <ButtonsContainer>
                        <CancelButton>
                            Отменить
                        </CancelButton>
                        <AcceptButton>
                            Сохранить
                        </AcceptButton>
                        <DropdownMenuContainer>
                            <IconButton onClick={toggleDropdown}>
                                <EllipsisVerticalIcon className="h-6 w-6" />
                            </IconButton>
                            <DropdownMenu isOpen={isOpen}>
                                <DropdownMenuButton>
                                    <Link to="#">
                                        Удалить
                                    </Link>
                                </DropdownMenuButton>
                            </DropdownMenu>
                        </DropdownMenuContainer>
                    </ButtonsContainer>
                </FlexSpacerContainer>
                <FlexSpacerContainer>
                    <HalfWidthContainer>
                        <DetailPageElementContainer>
                            <SmallTitle title={"Название:"} />
                            <p className="mb-2 py-1 pl-2">{screen.name}</p>
                        </DetailPageElementContainer>
                        <DetailPageElementContainer>
                            <SmallTitle title={"Время начала трансляции:"} />
                            <p className="mb-2 py-1 pl-2">{screen.start_time}</p>
                        </DetailPageElementContainer>
                        <DetailPageElementContainer>
                            <SmallTitle title={"Время окончания трансляции:"} />
                            <p className="mb-2 py-1 pl-2">{screen.end_time}</p>
                        </DetailPageElementContainer>
                        <DetailPageElementContainer>
                            <SmallTitle title={"Время паузы между контентом:"} />
                            <p className="mb-2 py-1 pl-2">{screen.pause_time}</p>
                        </DetailPageElementContainer>
                        <DetailPageElementContainer>
                            <SmallTitle title={"Дата последнего обновления трансляции:"} />
                            <p className="mb-2 py-1 pl-2">{screen.update_date}</p>
                        </DetailPageElementContainer>
                    </HalfWidthContainer>
                    <HalfWidthContainer>
                        <ScheduleDashboard screenId={id}/>
                    </HalfWidthContainer>
                </FlexSpacerContainer>
            </DetailPageContainer>
        </>
    );
};

export default ScreenDetailPage;