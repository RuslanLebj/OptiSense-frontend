import React from 'react';

const SmallTitle = ({ title }) => {
    return (
      <div className="bg-white">
        <h2 className="text-sm  text-gray-500 font-semibold">{title}</h2>
      </div>
    );
  };

export default SmallTitle;