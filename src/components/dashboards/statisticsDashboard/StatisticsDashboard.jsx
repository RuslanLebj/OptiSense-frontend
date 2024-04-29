import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StatisticsCard from '../../cards/statisticsCard/StatisticsCard';
import MiddleTitle from '../../titles/middleTitle/MiddleTitle';
import HalfWidthContainer from '../../containers/halfWidthContainer/HalfWidthContainer';

const StatisticsDashboard = ({ mediaContentId }) => {
    const [detailedStats, setDetailedStats] = useState(null);
    const [aggregateStats, setAggregateStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStatistics = async () => {
            setLoading(true);
            try {
                // 'Promise.all' функция позволяет одновременно выполнить несколько асинхронных запросов. 
                // Это улучшает производительность, поскольку запросы выполняются параллельно, а не последовательно.
                const [detailedResponse, aggregateResponse] = await Promise.all([
                    axios.get(`http://127.0.0.1:8000/api/statistics/?media_content=${mediaContentId}`),
                    axios.get(`http://127.0.0.1:8000/api/statistics/aggregate/?media_content=${mediaContentId}`)
                ]);
                setDetailedStats(detailedResponse.data);
                setAggregateStats(aggregateResponse.data);
            } catch (error) {
                console.error('Error fetching statistics:', error);
                setError('Failed to load statistics');
            } finally {
                setLoading(false);
            }
        };

        if (mediaContentId) {
            fetchStatistics();
        }
    }, [mediaContentId]);

    // if (loading) return <PageTitle title={`Загрузка...`} />; // Индикатор загрузки
    if (error) return <PageTitle title={`Error: ${error}`} />; // Сообщение об ошибке

    return (
        <>
            <HalfWidthContainer>
                <MiddleTitle title={"Общая статистика"} />
                {aggregateStats && aggregateStats.total_viewing_time && (
                    <MiddleTitle title={`Общее время просмотра: ${aggregateStats.total_viewing_time}`} />
                )}
                {aggregateStats && aggregateStats.max_viewers_count && (
                    <MiddleTitle title={`Максимальное число зрителей: ${aggregateStats.max_viewers_count}`} />
                )}
            </HalfWidthContainer>
            <HalfWidthContainer>
                <MiddleTitle title={"Статистика по каждому экрану"} />
                {detailedStats && detailedStats.map(stat => (
                    <div key={stat.id}>
                        <StatisticsCard stat={stat} />
                    </div>
                ))}
            </HalfWidthContainer>
        </>
    );
};

export default StatisticsDashboard;