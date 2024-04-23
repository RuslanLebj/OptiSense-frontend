import React from 'react';

const MediaContentCard = ({ mediacontent }) => {
    return (
        <div className="w-full flex justify-between items-center py-3 px-5 shadow-sm hover:bg-gray-200">
            <div className="flex items-center gap-5">
                <img src={mediacontent.preview} alt={mediacontent.name} className="h-20 w-auto shadow-md rounded" /> {/* Превью видео */}
                <div>
                    <h2 className="text-lg font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap max-w-80">
                        {mediacontent.name}
                    </h2> {/* Название */}
                    <h2 className="text-sm text-gray-500 overflow-hidden overflow-ellipsis max-w-80 line-clamp-2">
                        {mediacontent.description}
                    </h2> {/* Описание */}
                </div>
            </div>
            <div className="flex items-center gap-24">
                <p className="text-sm font-semibold">{mediacontent.upload_date}</p> {/* Дата загрузки */}
                <p className="text-sm font-semibold">{mediacontent.duration}</p> {/* Продолжительность */}
            </div>
        </div>
    );
};

export default MediaContentCard;
