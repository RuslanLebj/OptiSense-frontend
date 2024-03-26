import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline'

const ButtonBars3 = () => {
    return (
        <button className="text-gray-500 hover:text-black active:bg-gray-200 py-2 px-2 rounded-full transition-colors duration-300 ease-in-out">
            <Bars3Icon className="h-7 w-7" />
        </button>
    );
};

export default ButtonBars3;
