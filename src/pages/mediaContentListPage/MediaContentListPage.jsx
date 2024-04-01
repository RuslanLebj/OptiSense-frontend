import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MediaContentListPage = () => {
    const [mediaContentList, setMediaContentList] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/mediacontent/');
          setMediaContentList(response.data);
        } catch (error) {
          console.error('Error fetching media content:', error);
        }
      };
  
      fetchData();
    }, []); // Empty array as the second argument makes useEffect only run once after the initial render
  
    return (
      <div>
        <h1>Media Content List</h1>
        <ul>
          {mediaContentList.map(mediaContent => (
            <li key={mediaContent.id}>
              {mediaContent.name} - {mediaContent.link}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default MediaContentListPage;