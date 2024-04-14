import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PageTitle from '../../components/pageTitle/PageTitle';

const MediaContentDetailPage = () => {
  const { id } = useParams(); // Извлечение ID из URL
  const [mediaContent, setMediaContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/mediacontent/${id}/`);
        setMediaContent(response.data);
      } catch (err) {
        console.error('Error fetching media content details:', err);
        setError('Failed to load media content details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // Обновление компонента при изменении ID

  //if (loading) return <PageTitle title={`Загрузка...`} />; // Индикатор загрузки
  if (error) return <PageTitle title={`Error: ${error}`} />; // Сообщение об ошибке

  return (
    <div>
      <PageTitle title={`Сведения о контенте`} />
      {mediaContent ? (
        <div>
          <h1>{mediaContent.name}</h1>
          <p>Duration: {mediaContent.duration}</p>
          <img src={mediaContent.preview} alt={mediaContent.name} />
        </div>
      ) : (
        <p>Media content not found.</p>
      )}
    </div>
  );
};

export default MediaContentDetailPage;