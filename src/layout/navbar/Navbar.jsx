import React from 'react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 bg-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="font-semibold text-xl">Logo</span>
          </div>
          <div className="md:flex">
            <a
              href="#"
              className="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Link 1
            </a>
            <a
              href="#"
              className="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Link 2
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;