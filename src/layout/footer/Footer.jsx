import React from 'react';


const Footer = () => {
  return (
    <footer
      className="bg-white text-center lg:text-left pt-10">
      <div className="container p-6 text-neutral-800 ">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="mb-6 md:mb-0">
            <h5 className="mb-2 font-medium uppercase">Footer text</h5>

            <p className="mb-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
              atque ea quis molestias. Fugiat pariatur maxime quis culpa
              corporis vitae repudiandae aliquam voluptatem veniam, est atque
              cumque eum delectus sint!
            </p>
          </div>

          <div className="mb-6 md:mb-0">
            <h5 className="mb-2 font-medium uppercase">Footer text</h5>

            <p className="mb-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
              atque ea quis molestias. Fugiat pariatur maxime quis culpa
              corporis vitae repudiandae aliquam voluptatem veniam, est atque
              cumque eum delectus sint!
            </p>
          </div>
        </div>
      </div>

      {/* <!--Copyright section--> */}
      <div
        className="bg-neutral-100 p-4 text-center text-neutral-700">
        © 2023 Copyright: 
        <a className="text-neutral-800"> AdSenseVision</a>
      </div>
    </footer>
  );
}

export default Footer;