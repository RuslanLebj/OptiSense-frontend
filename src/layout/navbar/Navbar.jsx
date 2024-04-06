import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { PlusCircleIcon } from '@heroicons/react/24/outline'

const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="sticky top-0 z-20 md:h-20 bg-white border-b md:flex md:items-center md:justify-between p-4 pb-0 shadow-md md:pb-4">
      {/* Button for sidebar and Logo text */}
      <nav>
        <ul className="list-reset md:flex md:items-center">
          <li>
            <button onClick={toggleSidebar}
              className="text-gray-500 hover:text-black py-2 px-2 rounded-full transition-colors duration-300 ease-in-out">
              <Bars3Icon className="h-7 w-7" />
            </button>
          </li>
          <li>
            <h1 className="leading-none text-2xl text-gray-800 font-bold ml-5"> {/* Добавляем margin слева для выравнивания */}
              <a href="#">
                AdSenseVision
              </a>
            </h1>
          </li>
        </ul>
      </nav>
      {/* END Logo text or image */}

      {/* Search field */}
      <form className="mb-4 w-full md:mb-0 md:w-1/4">
        <label className="hidden" htmlFor="search-form">Search</label>
        <input className="bg-grey-lightest border-2 focus:border-orange p-2 rounded-lg shadow-inner w-full" placeholder="Поиск" type="text" />
        <button className="hidden">Submit</button>
      </form>
      {/* END Search field */}

      {/* Global navigation */}
      <nav>
        <ul className="md:flex md:items-center">
          <li className="md:ml-4">
            <button className="text-gray-500 hover:text-black py-2 px-2 rounded-full transition-colors duration-300 ease-in-out">
              <PlusCircleIcon className="h-7 w-7" />
            </button>
          </li>
          <li className="md:ml-4">
            <button className="text-gray-500 hover:text-black py-2 px-2 rounded-full transition-colors duration-300 ease-in-out">
              <UserCircleIcon className="h-7 w-7" />
            </button>
          </li>
        </ul>
      </nav>
      {/* END Global navigation */}
    </header>
  );
};

export default Navbar;