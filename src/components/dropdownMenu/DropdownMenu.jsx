import React from 'react';

const DropdownMenu = ({ children, isOpen }) => {
    return (
        isOpen && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-gray-100 rounded-md shadow-xl z-50">
                <ul>
                    {children}
                </ul>
            </div>
        )
    );
};

export default DropdownMenu;