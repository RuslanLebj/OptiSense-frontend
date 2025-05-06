import React, { useState } from 'react';
import { useNavigate} from "react-router-dom";
import { Bars3Icon, UserCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import IconButton from '../../components/buttons/IconButton';
import logo from '../../assets/logo.png';

const Navbar = ({ toggleSidebar, handleAddModalButtonClick }) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login"); // Перенаправление на страницу логина
  };

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
              <UserCircleIcon className="h-7 w-7" onClick={handleLogout} />
            </IconButton>
          </li>
        </ul>
      </nav>
      {/* END Global navigation */}
    </header>
  );
};

export default Navbar;