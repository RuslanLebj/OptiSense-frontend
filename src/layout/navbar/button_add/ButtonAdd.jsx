import React from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline'

const ButtonAdd = () => {
    return (
        <button className="text-gray-500 hover:text-black active:bg-gray-200 py-2 px-2 rounded-full transition-colors duration-300 ease-in-out">
            <PlusCircleIcon className="h-7 w-7" />
        </button>
    );
};

export default ButtonAdd;
