import React from 'react';

const AcceptButton = ({ onClick, icon: Icon, label}) => {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center w-36 h-24 rounded-md border-2 border-gray-300 text-gray-600 font-semibold p-2 hover:bg-gray-200 hover:text-gray-700 space-y-1"
        >
            <Icon className="h-6 w-6" />
            <span className="text-center leading-tight">{label}</span>
        </button>
    );
};

export default AcceptButton;
