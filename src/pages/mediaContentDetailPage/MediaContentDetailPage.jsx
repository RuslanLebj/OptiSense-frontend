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
  const [mediaContent, setMediaContent] = useState({ name: '', description: '', duration: '', upload_date: '', preview: '', video: '' });
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/mediacontent/${id}/`);
        setMediaContent(response.data); // Устанавливаем значение mediacontent
        setFormData({
          name: response.data.name,
          description: response.data.description
        }); // Устанавливаем начальное значение формы
      } catch (err) {
        console.error('Error fetching media content details:', err);
        setError('Failed to load media content details');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Обработчик сохранения изменений
  const handleSave = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/mediacontent/${id}/`, formData);
      setMediaContent(response.data);
    } catch (err) {
      console.error('Error saving media content details:', err);
    }
  };

  // Обработчик отмены изменений
  const handleCancel = () => {
    // Отмена изменений и восстановление изначальных данных
    setFormData({
      name: mediaContent.name,
      description: mediaContent.description
    });
  };

  // Обработчик изменения значений формы
  const handleChange = (event) => {
    // Обработка изменений в полях ввода
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // if (loading) return <PageTitle title={`Загрузка...`} />;
  if (error) return <PageTitle title={`Error: ${error}`} />;

  return (
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
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-grey-lightest border-2 p-2 rounded-lg shadow-inner w-full"
            />
          </DetailPageElementContainer>
          <DetailPageElementContainer>
            <SmallTitle title={"Описание видео:"} />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="bg-grey-lightest border-2 p-2 rounded-lg shadow-inner pb-12 w-full"
            />
          </DetailPageElementContainer>
          <DetailPageElementContainer>
            <SmallTitle title={"Продолжительность видео:"} />
            <p className="mb-2 py-1 pl-2">{mediaContent.duration}</p>
          </DetailPageElementContainer>
          <DetailPageElementContainer>
            <SmallTitle title={"Дата загрузки:"} />
            <p className="mb-2 py-1 pl-2">{mediaContent.upload_date}</p>
          </DetailPageElementContainer>
        </HalfWidthContainer>
        <HalfWidthContainer>
          <img
            className="rounded shadow-lg mb-4"
            src={mediaContent.preview}
            alt={mediaContent.name}
          />
          <SmallTitle title={"Ссылка на видео:"} />
          <a
            href={mediaContent.video}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 mb-2 py-1 pl-2 hover:text-blue-700 transition duration-300"
          >
            {mediaContent.video}
          </a>
        </HalfWidthContainer>
      </FlexSpacerContainer>
      <FlexSpacerContainer>
        <StatisticsDashboard mediaContentId={id} />
      </FlexSpacerContainer>
    </DetailPageContainer>
  );
};

export default MediaContentDetailPage;