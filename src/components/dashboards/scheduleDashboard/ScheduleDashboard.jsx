import React, {useEffect, useState} from 'react';
import axios from 'axios';
import StatisticsCard from '../../cards/statisticsCard/StatisticsCard';
import MiddleTitle from '../../titles/middleTitle/MiddleTitle';
import HalfWidthContainer from '../../containers/halfWidthContainer/HalfWidthContainer';
import PageTitle from "../../titles/pageTitle/PageTitle.jsx";
import {Link} from "react-router-dom";
import ScreenCard from "../../cards/screenCard/ScreenCard.jsx";

const ScheduleDashboard = ({screenId}) => {
    const [scheduleList, setScheduleList] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/schedule/?screen=${screenId}`);
                setScheduleList(response.data);
                console.log(response.data)
            } catch (err) {
                console.error('Error fetching schedule:', err);
                setError('Failed to load schedule');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [screenId]);

    if (loading) return <PageTitle title={`Загрузка...`}/>; // Индикатор загрузки
    if (error) return <PageTitle title={`Error: ${error}`}/>; // Сообщение об ошибке

    // Используем в компоненте условный рендеринг для избежания вывода результатов со значениями полей null/undefined, т.к. статистики по контенту может не быть.
    return (
        <>
            <HalfWidthContainer>
                <MiddleTitle title={"Плейлист"}/>
                <ul>
                    {scheduleList.map(schedule => (
                        <li key={schedule.id} className="border-b border-gray-200 py-4">
                            <p className="mb-2 text-md">{schedule.media_content_detail.name}</p>
                        </li>
                    ))}
                </ul>
            </HalfWidthContainer>
        </>
    );
};

export default ScheduleDashboard;