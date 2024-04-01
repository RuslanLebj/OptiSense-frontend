import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      <h1>Camera List</h1>
      <ul>
        {cameraList.map(camera => (
          <li key={camera.id}>
            {camera.name} - {camera.address} - {camera.connection_login} - {camera.connection_password}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CameraListPage;