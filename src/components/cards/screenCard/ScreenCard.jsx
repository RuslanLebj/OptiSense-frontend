import React from 'react';

const ScreenCard = ({ screen }) => {

    return (
        <div className="group w-full flex justify-between items-center py-3 px-5 shadow-sm hover:bg-gray-200">
            <div className="flex items-center lg:w-1/2">
                <h2 className="text-lg font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[320px]">
                    {screen.name}
                </h2>
            </div>
            <div className="flex justify-between gap-5 lg:w-1/2">
                <p className="text-sm font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[320px]">
                    {screen.start_time} - {screen.end_time}
                </p>
            </div>
        </div>
    );
};

export default ScreenCard;