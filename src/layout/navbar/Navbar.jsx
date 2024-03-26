import React from 'react';
import ButtonBars3 from "./button_bars_3/ButtonBars3"
import ButtonProfile from "./button_profile/ButtonProfile"
import ButtonAdd from "./button_add/ButtonAdd"

const Navbar = () => {
  return (
    <header className="border-b md:flex md:items-center md:justify-between p-4 pb-0 shadow-lg md:pb-4">
      {/* Button for sidebar and Logo text */}
      <nav>
        <ul className="list-reset md:flex md:items-center">
          <li> 
            <ButtonBars3 />
          </li>
          <li>
            <h1 className="leading-none text-2xl text-grey-darkest ml-5"> {/* Добавляем margin слева для выравнивания */}
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
        <input className="bg-grey-lightest border-2 focus:border-orange p-2 rounded-lg shadow-inner w-full" placeholder="Search" type="text" />
        <button className="hidden">Submit</button>
      </form>
      {/* END Search field */}

      {/* Global navigation */}
      <nav>
        <ul className="list-reset md:flex md:items-center">
          <li className="md:ml-4">
          <ButtonAdd />
          </li>
          <li className="md:ml-4">
          <ButtonProfile />
          </li>
        </ul>
      </nav>
      {/* END Global navigation */}
    </header>
  );
};

export default Navbar;