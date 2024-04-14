import React from 'react';

const Card = ({ name, duration, preview }) => {
    return (
        <div className="flex justify-center shadow-sm hover:bg-gray-200">
            <div className="max-w-screen-lg w-full flex justify-between items-center p-3">
                <div className="flex items-center space-x-4">
                    <img src={preview} alt={name} className="h-20 w-auto" /> {/* Превью видео */}
                    <h2 className="text-lg font-semibold">{name}</h2> {/* Название */}
                </div>
                <p className="text-sm font-semibold">{duration}</p> {/* Продолжительность */}
            </div>
        </div>
    );
};

export default Card;
