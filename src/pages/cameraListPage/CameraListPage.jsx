import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageTitle from '../../components/titles/pageTitle/PageTitle';
import CameraCard from '../../components/cards/cameraCard/CameraCard.jsx';
import FlexSpacerContainer from '../../components/containers/flexSpacerContainer/FlexSpacerContainer';
import { Link } from 'react-router-dom';
import {Autocomplete, TextField} from "@mui/material";

const baseUrl = import.meta.env.VITE_BASE_URL;

const CameraListPage = () => {
  const [camerasList, setCamerasList] = useState([]);
  const [outlets, setOutlets] = useState([]);
  const [selectedOutletId, setSelectedOutletId] = useState(null);

  useEffect(() => {
    // Фетчинг камер
    const fetchCameras = async () => {
      try {
        const url = selectedOutletId
            ? `${baseUrl}/cameras/?outlet=${selectedOutletId}`
            : `${baseUrl}/cameras/`;
        const response = await axios.get(url);
        setCamerasList(response.data);
      } catch (error) {
        console.error('Error fetching cameras:', error);
      }
    };

    fetchCameras();
  }, [selectedOutletId]); // Триггер когда selectedOutletId изменён

  useEffect(() => {
    // Фетчинг аутлетов
    const fetchOutlets = async () => {
      try {
        const response = await axios.get(`${baseUrl}/outlets`);
        setOutlets(response.data);
      } catch (error) {
        console.error('Error fetching outlets:', error);
      }
    };

    fetchOutlets();
  }, []);

  const handleOutletChange = (event, value) => {
    setSelectedOutletId(value ? value.id : null);
  };

  return (
      <div>
        <FlexSpacerContainer>
          <PageTitle title="Камеры"/>
          <Autocomplete
              options={outlets}
              getOptionLabel={(option) => option.address}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Адрес" />}
              onChange={handleOutletChange}
              isOptionEqualToValue={(option, value) => option.id === value?.id}
          />
        </FlexSpacerContainer>
        <ul>
          {camerasList.map(camera => (
              <li key={camera.id}>
                <Link to={`/cameras/${camera.id}`}>
                  <CameraCard camera={camera} />
                </Link>
              </li>
          ))}
        </ul>
      </div>
  );
};

export default CameraListPage;