import React from 'react';

const IconButton = ({ onClick, children }) => {
    return (
        <button
            onClick={onClick}
            className="text-gray-500 hover:text-black py-2 px-2 rounded-full transition-colors duration-300 ease-in-out">
            {children}
        </button>
    );
};

export default IconButton;