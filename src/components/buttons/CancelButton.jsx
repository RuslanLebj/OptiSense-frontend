import React from 'react';

const CancelButton = ({ onClick, children }) => {
    return (
        <button
            onClick={onClick}
            className="rounded-md text-red-600 font-semibold p-2 hover:bg-gray-200 hover:text-red-700">
            {children}
        </button>
    );
};

export default CancelButton;