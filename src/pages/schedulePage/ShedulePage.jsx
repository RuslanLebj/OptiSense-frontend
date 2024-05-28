import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import PageTitle from "../../components/titles/pageTitle/PageTitle.jsx";

const SchedulePage = () => {
    const {id} = useParams(); // Извлечение ID из URL
    const [schedule, setSchedule] = useState({ id: '', start_time: '', end_time: '', media_content_id: '', media_content_name: '', screen_id: '', screen_name: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/screen/${id}/schedule/`);
                setSchedule(response.data); // Устанавливаем значение schedule
            } catch (err) {
                console.error('Error fetching schedule data:', err);
                setError('Failed to load schedule data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    // if (loading) return <PageTitle title={`Загрузка...`} />;
    if (error) return <PageTitle title={`Error: ${error}`}/>;

    return (
        <div className="container mx-auto p-4">
            <PageTitle title={`Расписание контента для экрана ${id}`}/>
            <table className="min-w-full bg-white pt-7">
                <thead>
                <tr>
                    <th className="py-2">Номер</th>
                    <th className="py-2">Время начала</th>
                    <th className="py-2">Время конца</th>
                    <th className="py-2">Название контента</th>
                </tr>
                </thead>
                <tbody>
                {schedule.map((item) => (
                    <tr key={item.id}>
                        <td className="border px-4 py-2">{item.id}</td>
                        <td className="border px-4 py-2">{item.start_time}</td>
                        <td className="border px-4 py-2">{item.end_time}</td>
                        <td className="border px-4 py-2">{item.media_content_name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default SchedulePage;