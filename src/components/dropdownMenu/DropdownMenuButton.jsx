import React from 'react';

const DropdownMenuButton = ({ children }) => {
    return (
        <li className='shadow-sm hover:bg-gray-200 p-2'>
            {children}
        </li>
    );
};

export default DropdownMenuButton;