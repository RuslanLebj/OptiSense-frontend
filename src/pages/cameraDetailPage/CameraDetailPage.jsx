import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import PageTitle from '../../components/titles/pageTitle/PageTitle';
import SmallTitle from '../../components/titles/smallTitle/SmallTitle';
import DetailPageContainer from '../../components/containers/detailPageContainer/DetailPageContainer';
import FlexSpacerContainer from '../../components/containers/flexSpacerContainer/FlexSpacerContainer';
import DetailPageElementContainer from '../../components/containers/detailPageElementContainer/DetailPageElementContainer';
import SaveButton from '../../components/buttons/SaveButton.jsx';
import CancelButton from '../../components/buttons/CancelButton';
import ButtonsContainer from '../../components/containers/buttonsContainer/ButtonsContainer';
import RoiBox from "../../components/roiBox/RoiBox.jsx";

const baseUrl = import.meta.env.VITE_BASE_URL;

const CameraDetailPage = () => {
  const { id } = useParams(); // Извлечение ID из URL
  const [cameraDetails, setCameraDetails] = useState([]);
  const [formData, setFormData] = useState([]);
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
          roi_polygons_points: response.data.roi_polygons_points
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
      roi_polygons_points: cameraDetails.roi_polygons_points
    });
  };

  // Обработчик изменения значений формы
  const handleChange = (event) => {
    // Обработка изменений в полях ввода
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // if (loading) return <PageTitle title={`Загрузка...`} />;
  if (error) return <PageTitle title={`Error: ${error}`}/>;

  return (
    <>
      <DetailPageContainer>
        <FlexSpacerContainer>
          <PageTitle title={`Камера ${cameraDetails.name} на ${cameraDetails.outlet_detail}`} />
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
              <SmallTitle title={"Логин для камеры:"} />
              {cameraDetails.connection_login}
            </DetailPageElementContainer>
            <DetailPageElementContainer>
              <SmallTitle title={"Пароль для камеры:"} />
              {cameraDetails.connection_password}
            </DetailPageElementContainer>
            <DetailPageElementContainer>
              <SmallTitle title={"Ссылка на видеотрансляцию:"} />
              <a
                  href={cameraDetails.url_address}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 mb-2 py-1 hover:text-blue-700 transition duration-300"
              >
                {cameraDetails.url_address}
              </a>
            </DetailPageElementContainer>
          </div>
          <div className="lg:w-3/4">
            <RoiBox imageSrc={cameraDetails.preview} initialPolygons={cameraDetails.roi_polygons_points} onPolygonsChange={(updatedPolygons) => setFormData((prev) => ({
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