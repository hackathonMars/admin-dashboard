import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LuLayoutDashboard, LuPhoneCall } from "react-icons/lu";

const Sidebar = () => {
    const location = useLocation();

    return (
        <div>
            <aside className="flex justify-center h-full py-4 border-r-2 border-gray-400 w-16 sm:w-20 md:w-48 lg:w-52 hover:w-56 transition-all duration-300 ease-in-out">
                <div className="flex flex-col text-white font-bold gap-4 text-center w-full">
                    <div className="text-white transition duration-500">
                        <Link to="/dashboard">
                            <li className={`group flex items-center gap-3 py-2 px-4 justify-center md:justify-start relative ${location.pathname === '/' ? 'bg-gradient-to-t from-[#252155] to-[#281AC8] rounded-r-full' : ''}`}>
                                <LuLayoutDashboard className='text-lg z-10' />
                                <span className="hidden md:inline-block relative z-10">Dashboard</span>
                                <span className="absolute inset-0 transition-transform transform scale-x-0 bg-gradient-to-t from-[#252155] to-[#281AC8] rounded-r-full group-hover:scale-x-100 origin-left"></span>
                            </li>
                        </Link>
                    </div>
                    <div className="text-white transition duration-500">
                        <Link to="/callings">
                            <li className={`group flex items-center gap-3 py-2 px-4 justify-center md:justify-start relative ${location.pathname === '/callings' ? 'bg-gradient-to-t from-[#252155] to-[#281AC8] rounded-r-full' : ''}`}>
                                <LuPhoneCall className='text-lg z-10' />
                                <span className="hidden md:inline-block relative z-10">Callings</span>
                                <span className="absolute inset-0 bg-gradient-to-t from-[#252155] to-[#281AC8] rounded-r-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                            </li>
                        </Link>
                    </div>
                </div>
            </aside>
        </div>
    );
}

export default Sidebar;
