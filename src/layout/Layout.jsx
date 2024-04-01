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
            <div className="flex">
                <Sidebar isOpen={isSidebarOpen}/>
                <main className="flex-1">
                    <div>
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Layout;