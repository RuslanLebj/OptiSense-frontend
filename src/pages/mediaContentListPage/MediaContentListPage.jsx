import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageTitle from '../../components/pageTitle/PageTitle';
import MediaContentCard from '../../components/mediaContentCard/MediaContentCard';
import { Link } from 'react-router-dom'; 

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
      <PageTitle title="Транслируемый медиаконтент" />
      <ul>
        {mediaContentList.map(mediaContent => (
          <li key={mediaContent.id}>
            {/* Оборачиваем MediaContentCard в Link */}
            <Link to={`/mediacontent/${mediaContent.id}`}>
              <MediaContentCard mediacontent={mediaContent} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MediaContentListPage;