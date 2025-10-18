import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const RootLayout =()=>{
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState('overview');

    const navigate = (page) => {
        setCurrentPage(page);
        localStorage.setItem('currentPage', page);
    };

    return(
        <div className="min-h-screen bg-slate-50">
            <Sidebar
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                currentPage={currentPage}
                navigate={navigate}
             />
            <div className="lg:pl-64">
                <Header 
                    setIsMenuOpen={setIsMenuOpen}
                />
                <main className="pt-16 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default RootLayout;