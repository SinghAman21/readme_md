import React from 'react';
import { HomeIcon, Cog6ToothIcon, UserIcon, ChartBarIcon, InboxIcon } from '@heroicons/react/24/outline';

const Menu = ({ isMenuOpen }) => {
    return (
        <div
            className={`hidden md:block absolute top-1/2 -translate-y-1/2 z-50 transition-all duration-500 ease-in-out
      ${isMenuOpen ? 'left-4' : '-left-64'}
      `}
        >
            <div
                className="flex flex-col justify-between items-center p-3 gap-3 bg-gray-100/30 backdrop-blur-xl 
                dark:bg-black/20 rounded-full w-16 overflow-hidden border-1"
            >
                <MenuItem icon={<HomeIcon className="h-6 w-6" />} label="Home" />
                <MenuItem icon={<ChartBarIcon className="h-6 w-6" />} label="Stats" />
                <MenuItem icon={<Cog6ToothIcon className="h-6 w-6" />} label="Settings" />
            </div>
        </div>
    );
};

// Individual Menu Item Component
const MenuItem = ({ icon, label }) => (
    <div
        className="flex flex-col items-center justify-center gap-1 cursor-pointer group
    transition-all duration-300"
    >
        <div
            className="flex items-center justify-center p-3 rounded-full bg-light/20 backdrop-blur-2xl dark:bg-dark
      text-gray-700 dark:text-gray-300 group-hover:bg-white dark:group-hover:bg-dark group-hover:text-white"
        >
            {icon}
        </div>

    </div>
);

export default Menu;
