import React from 'react';

const CameraCard = ({ camera }) => {
    // Создаем строку из звездочек, равную длине пароля
    const stars = '*'.repeat(camera.connection_password.length);

    return (
        <div className="group w-full flex justify-between items-center py-3 px-5 shadow-sm hover:bg-gray-200">
            <div className="flex items-center lg:w-1/2">
                <h2 className="text-lg font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[320px]">
                    {camera.name}
                </h2>
            </div>
            <div className="flex justify-between gap-5 lg:w-1/2">
                <p className="text-sm font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[320px]">
                    {camera.address}
                </p>
                <p className="text-sm font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[320px]">
                    {camera.connection_login}
                </p>
                <p className="text-sm font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[320px] relative">
                    <span className="absolute inset-0 group-hover:invisible">{stars}</span>
                    <span className="invisible group-hover:visible">{camera.connection_password}</span>
                </p>
            </div>
        </div>
    );
};

export default CameraCard;
