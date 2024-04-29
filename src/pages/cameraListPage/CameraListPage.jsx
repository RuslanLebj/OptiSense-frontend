import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageTitle from '../../components/titles/pageTitle/PageTitle';
import CameraCard from '../../components/cards/cameraCard/CameraCard';

const CameraListPage = () => {
  const [cameraList, setCameraList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/camera/');
        setCameraList(response.data);
      } catch (error) {
        console.error('Error fetching cameras:', error);
      }
    };

    fetchData();
  }, []); // Empty array as the second argument makes useEffect only run once after the initial render

  return (
    <div>
      <PageTitle title="Камеры для отслеживания вовлеченности" />
      <ul>
        {cameraList.map(camera => (
          <li key={camera.id}>
            <CameraCard camera={camera} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CameraListPage;