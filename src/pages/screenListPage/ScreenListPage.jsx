import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageTitle from '../../components/pageTitle/PageTitle';

const ScreenListPage = () => {
  const [screenList, setScreenList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/screen/');
        setScreenList(response.data);
      } catch (error) {
        console.error('Error fetching screens:', error);
      }
    };

    fetchData();
  }, []); // Empty array as the second argument makes useEffect only run once after the initial render

  return (
    <div>
      <PageTitle title="Экраны для трансляций" />
      <ul>
        {screenList.map(screen => (
          <li key={screen.id}>
           {screen.name} - {screen.start_time} - {screen.end_time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScreenListPage;