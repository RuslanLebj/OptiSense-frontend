import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import PageTitle from '../../components/pageTitle/PageTitle';
import SmallTitle from '../../components/smallTitle/SmallTitle';

const MediaContentDetailPage = () => {
  const { id } = useParams(); // Извлечение ID из URL
  const navigate = useNavigate();
  const [mediaContent, setMediaContent] = useState(null);
  const [editName, setEditName] = useState('');
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

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/mediacontent/${id}/`, {
        ...mediaContent,
        name: editName,
      });
      setMediaContent(response.data);
      // Additional success handling
    } catch (err) {
      console.error('Error saving media content details:', err);
      // Additional error handling
    }
  };

  const handleCancel = () => {
    setEditName(mediaContent.name); // Revert changes
    // If you want to navigate away on cancel, use the navigate function:
    // navigate(-1); // This will take the user back to the previous page
  };

  // Функция для обработки изменения названия
  const handleChangeName = (event) => {
    setEditName(event.target.value);
  };

  //if (loading) return <PageTitle title={`Загрузка...`} />; // Индикатор загрузки
  if (error) return <PageTitle title={`Error: ${error}`} />; // Сообщение об ошибке

  return (
    <div className="container p-4">
      <div className="flex justify-between items-center mb-4">
        <PageTitle title={"Сведения о контенте"} />
        <div>
          <button onClick={handleCancel} className="text-red-600 hover:underline">
            Отменить
          </button>
          <button onClick={handleSave} className="ml-2 text-green-600 hover:underline">
            Сохранить
          </button>
        </div>
      </div>
      <div className="flex justify-between mb-4">
        <div>
          <SmallTitle title={"Название видео:"} />
          <input
            type="text"
            value={editName} // Используем состояние editName для значения input
            onChange={handleChangeName}
            className="text-m mb-2 px-2 py-1 rounded border border-gray-300"
          />
          <div className="w-full mb-6">
            <SmallTitle title={"Продолжительность видео:"} />
            {mediaContent && (
              <p className="mb-2 px-2 py-1">{mediaContent.duration}</p>
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/2 px-3">
          {mediaContent && (
            <>
              <img
                className="rounded shadow-lg mb-4"
                src={mediaContent.preview}
                alt={mediaContent.name}
              />
              <SmallTitle title={"Ссылка на видео:"} />
              {mediaContent.video && (
                <a
                  href={mediaContent.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 mb-2 px-2 py-1 hover:text-blue-700 transition duration-300"
                >
                  {mediaContent.video}
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaContentDetailPage;