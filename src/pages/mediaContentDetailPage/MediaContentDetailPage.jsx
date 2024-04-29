import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import PageTitle from '../../components/titles/pageTitle/PageTitle';
import SmallTitle from '../../components/titles/smallTitle/SmallTitle';
import StatisticsDashboard from '../../components/dashboards/statisticsDashboard/StatisticsDashboard';
import DetailPageContainer from '../../components/containers/detailPageContainer/DetailPageContainer';
import FlexSpacerContainer from '../../components/containers/flexSpacerContainer/FlexSpacerContainer';
import HalfWidthContainer from '../../components/containers/halfWidthContainer/HalfWidthContainer';
import DetailPageElementContainer from '../../components/containers/detailPageElementContainer/DetailPageElementContainer';

const MediaContentDetailPage = () => {
  const { id } = useParams(); // Извлечение ID из URL
  const [mediaContent, setMediaContent] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/mediacontent/${id}/`);
        setMediaContent(response.data);
        setEditName(response.data.name); // Устанавливаем начальное значение для editName, после загрузки данных
        setEditDescription(response.data.description);
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
        description: editDescription,
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
    setEditDescription(mediaContent.description)
    // If you want to navigate away on cancel, use the navigate function:
    // navigate(-1); // This will take the user back to the previous page
  };

  // Функция для обработки изменения названия
  const handleChangeName = (event) => {
    setEditName(event.target.value);
  };

  // Функция для обработки изменения описания
  const handleChangeDescription = (event) => {
    setEditDescription(event.target.value);
  };

  // if (loading) return <PageTitle title={`Загрузка...`} />; // Индикатор загрузки
  if (error) return <PageTitle title={`Error: ${error}`} />; // Сообщение об ошибке

  return (
    // !РАЗБИТЬ НА КОМПОНЕНТЫ!
    <DetailPageContainer>
      <FlexSpacerContainer>
        <PageTitle title={"Сведения о контенте"} />
        <div>
          <button onClick={handleCancel} className="text-red-600 hover:underline">
            Отменить
          </button>
          <button onClick={handleSave} className="ml-2 text-green-600 hover:underline">
            Сохранить
          </button>
        </div>
      </FlexSpacerContainer>
      <FlexSpacerContainer>
        <HalfWidthContainer>
          <DetailPageElementContainer>
            <SmallTitle title={"Название видео:"} />
            <textarea
              type="text"
              value={editName} // Используем состояние editName для значения input
              onChange={handleChangeName}
              className="bg-grey-lightest border-2 p-2 rounded-lg shadow-inner w-full"
            />
          </DetailPageElementContainer>
          <DetailPageElementContainer>
            <SmallTitle title={"Описание видео:"} />
            <textarea
              type="text"
              value={editDescription}
              onChange={handleChangeDescription}
              className="bg-grey-lightest border-2 p-2 rounded-lg shadow-inner pb-12 w-full"
            />
          </DetailPageElementContainer>
          <DetailPageElementContainer>
            <SmallTitle title={"Продолжительность видео:"} />
            {mediaContent && (
              <p className="mb-2 py-1 pl-2">{mediaContent.duration}</p>
            )}
          </DetailPageElementContainer>
          <DetailPageElementContainer>
            <SmallTitle title={"Дата загрузки:"} />
            {mediaContent && (
              <p className="mb-2 py-1 pl-2">{mediaContent.upload_date}</p>
            )}
          </DetailPageElementContainer>
        </HalfWidthContainer>
        <HalfWidthContainer>
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
                  className="text-blue-500 mb-2 py-1 pl-2 hover:text-blue-700 transition duration-300"
                >
                  {mediaContent.video}
                </a>
              )}
            </>
          )}
        </HalfWidthContainer>
      </FlexSpacerContainer>
      <FlexSpacerContainer>
        <StatisticsDashboard mediaContentId={id} />
      </FlexSpacerContainer>
    </DetailPageContainer>
  );
};

export default MediaContentDetailPage;