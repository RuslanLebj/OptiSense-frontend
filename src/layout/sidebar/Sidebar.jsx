import React from "react";
import { Link } from "react-router-dom";
import { VideoCameraIcon, ComputerDesktopIcon, ChartBarSquareIcon} from '@heroicons/react/24/outline';

const Sidebar = ({ isOpen }) => {
    const menus = [
        { name: "Камеры", link: "/cameras", icon: VideoCameraIcon },
        { name: "Показатели", link: "/dashboard", icon: ChartBarSquareIcon },
    ];
    return (
        <aside className="sticky top-20 h-screen z-10 flex">
            <div
                className={`bg-white ${isOpen ? "w-60" : "w-20"
                    } duration-500 text-black px-4 shadow`}
            >
                <div className="mt-4 flex flex-col gap-4 relative">
                    {/* Отображение элементов меню. Он используется метод map для перебора массива menus */}
                    {menus?.map((menu, i) => (
                        <Link
                            to={menu?.link}
                            key={i}
                            className={` ${menu?.margin && "mt-5"
                                } group flex items-center text-md gap-7 font-medium p-2 hover:bg-gray-200 rounded-md`}
                        >
                            {/* Иконка меню */}
                            <div>
                                {React.createElement(menu?.icon, {
                                    className: 'text-black h-7 w-7',
                                })}
                            </div>
                            {/* Надпись в сайдбаре */}
                            <h2
                                className={`whitespace-pre duration-500 ${!isOpen && "opacity-0 overflow-hidden"
                                    }`}
                            >
                                {menu?.name}
                            </h2>
                            {/* Всплывающая надпись */}
                            <h2
                                className={`${isOpen && "hidden"
                            } absolute left-14 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:w-fit bg-opacity-90`}
                            >
                                {menu?.name}
                            </h2>
                        </Link>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;