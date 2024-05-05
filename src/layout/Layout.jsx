import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import Footer from "./footer/Footer";
import { useModal } from '../contexts/ModalContext';
import ModalsContainer from "../components/modals/modalsContainer/ModalsContainer";

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { toggleModal } = useModal();
    const location = useLocation();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


    const handleAddModalButtonClick = () => {
        // Проверяем текущий путь в адресной строке пользователя.
        // Функция location.pathname.includes проверяет, содержит ли текущий URL определённую подстроку.


        // Если текущий URL содержит <путь>, тогда...
        if (location.pathname.includes('/mediacontent')) {
            // Вызываем функцию toggleModal которая изменяет состояние видимости соотвествующего модального окна
            toggleModal('mediaContent');
        } else if (location.pathname.includes('/camera')) {
            toggleModal('camera');
        } else if (location.pathname.includes('/screen')) {
            toggleModal('screen');
        }
    };

    return (
        <>
            <div>
                <Navbar toggleSidebar={toggleSidebar} handleAddModalButtonClick={handleAddModalButtonClick} />
                <div className="flex">
                    <Sidebar isOpen={isSidebarOpen} />
                    <main className="flex-1">
                        <Outlet />
                    </main>
                </div>
                <Footer />
            </div>
            <ModalsContainer />
        </>
    )
}

export default Layout;