import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline'

const ButtonProfile = () => {
    return (
        <button className="text-gray-500 hover:text-black active:bg-gray-200 py-2 px-2 rounded-full transition-colors duration-300 ease-in-out">
            <UserCircleIcon className="h-7 w-7" />
        </button>
    );
};

export default ButtonProfile;
