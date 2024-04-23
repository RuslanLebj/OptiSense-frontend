import React from 'react';

const PageTitle = ({ title }) => {
    return (
      <div className="m-5">
        <h2 className="text-2xl text-gray-800 font-semibold">{title}</h2>
      </div>
    );
  };

export default PageTitle;