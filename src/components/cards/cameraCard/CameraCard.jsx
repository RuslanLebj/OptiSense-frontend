import React from 'react';
import { PhotoIcon } from "@heroicons/react/16/solid/index.js";

const CameraCard = ({camera}) => {
    return (
        <div className="w-full flex justify-between items-center py-3 px-5 shadow-sm hover:bg-gray-200">
            <div className="flex items-center gap-5">
                <img src={camera.preview} alt={camera.name} className="h-20 w-32 shadow-md rounded object-cover"/>
                <h2 className="text-lg font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap max-w-80">
                    {camera.name}
                </h2> {/* Название */}
            </div>
            <div className="flex items-center gap-24">
                <p className="text-sm font-semibold">{camera.outlet_detail.address}</p> {/* Адрес помещения */}
                <p
                    className={`text-sm font-semibold ${
                        camera.is_active ? "text-green-500" : "text-red-500"
                    }`}
                >
                    {camera.is_active ? "online" : "offline"}
                </p> {/* Статус камеры */}
            </div>
        </div>
    );
};

export default CameraCard;
