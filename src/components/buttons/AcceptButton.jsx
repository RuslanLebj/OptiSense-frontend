import React from 'react';

const AcceptButton = ({ onClick, children }) => {
    return (
        <button
            onClick={onClick}
            className="rounded-md text-green-600 font-semibold p-2 hover:bg-gray-200 hover:text-green-700">
            {children}
        </button>
    );
};

export default AcceptButton;