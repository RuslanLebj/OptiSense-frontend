import React, { useState } from "react";
import { Outlet } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div>
            <Navbar toggleSidebar={toggleSidebar}/>
            <Sidebar isOpen={isSidebarOpen}/>
            <main>
                <div>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default Layout
