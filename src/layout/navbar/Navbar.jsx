import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline'

const Navbar = () => {
  return (
    <header className="border-b md:flex md:items-center md:justify-between p-4 pb-0 shadow-lg md:pb-4">
      
      {/* Button for sidebar and Logo text */}
      <nav>
        <ul className="list-reset md:flex md:items-center">
          <li className="md:ml-4 flex items-center"> {/* Обертываем содержимое li в flex контейнер */}
            <button>
              <Bars3Icon className="h-7 w-7 text-black" />
            </button>
            <h1 className="leading-none text-2xl text-grey-darkest ml-2"> {/* Добавляем margin слева для выравнивания */}
              <a className="no-underline text-grey-darkest hover:text-black" href="#">
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
        <input className="bg-grey-lightest border-2 focus:border-orange p-2 rounded-lg shadow-inner w-full" placeholder="Search" type="text" />
        <button className="hidden">Submit</button>
      </form>
      {/* END Search field */}

      {/* Global navigation */}
      <nav>
        <ul className="list-reset md:flex md:items-center">
          <li className="md:ml-4">
            <a className="block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0" href="#">
              Products
            </a>
          </li>
          <li className="md:ml-4">
            <a className="border-t block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0" href="#">
              About
            </a>
          </li>
          <li className="md:ml-4">
            <a className="border-t block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0" href="#">
              Contact
            </a>
          </li>
        </ul>
      </nav>
      {/* END Global navigation */}
    </header>
  );
};

export default Navbar;