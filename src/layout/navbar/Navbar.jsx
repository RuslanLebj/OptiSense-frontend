import React, { useState } from 'react';
import { Bars3Icon, UserCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import IconButton from '../../components/buttons/IconButton';
import logo from '../../assets/logo.png';

const Navbar = ({ toggleSidebar, handleAddModalButtonClick }) => {

  return (
    <header className="sticky top-0 z-20 md:h-20 bg-white border-b md:flex md:items-center md:justify-between p-4 pb-0 shadow-md md:pb-4">
      {/* Button for sidebar and Logo text */}
      <nav>
        <ul className="list-reset md:flex md:items-center">
          <li>
            <IconButton onClick={toggleSidebar}>
              <Bars3Icon className="h-7 w-7" />
            </IconButton>
          </li>
          <li>
            <img src={logo} alt="logo" className="h-20 w-20 ml-3" />
          </li>
          <li>
            <h1 className="leading-none text-2xl text-gray-800 font-bold"> {/* Добавляем margin слева для выравнивания */}
              <a href="#">
                OptiSense
              </a>
            </h1>
          </li>
        </ul>
      </nav>
      {/* END Logo text or image */}

      {/* Search field */}
      <form className="mb-4 w-full md:mb-0 md:w-1/4">
        <label className="hidden" htmlFor="search-form">Search</label>
        <input className="bg-grey-lightest border-2 p-2 rounded-lg shadow-inner w-full" placeholder="Поиск" type="text" />
        <button className="hidden">Submit</button>
      </form>
      {/* END Search field */}

      {/* Global navigation */}
      <nav>
        <ul className="md:flex md:items-center">
          <li className="md:ml-4">
            <IconButton>
              <PlusCircleIcon className="h-7 w-7" />
            </IconButton>
          </li>
          <li className="md:ml-4">
            <IconButton>
              <UserCircleIcon className="h-7 w-7" />
            </IconButton>
          </li>
        </ul>
      </nav>
      {/* END Global navigation */}
    </header>
  );
};

export default Navbar;