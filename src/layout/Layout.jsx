import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import Footer from "./footer/Footer";



const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <div>
                <Navbar toggleSidebar={toggleSidebar} />
                <div className="flex">
                    <Sidebar isOpen={isSidebarOpen} />
                    <main className="flex-1">
                        <Outlet />
                    </main>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Layout;