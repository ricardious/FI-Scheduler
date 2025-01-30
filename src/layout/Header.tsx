import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Icons } from '../assets/icons';
import { Img } from 'react-image';
import GradientBackdrop from '../components/design/GradientBackdrop';
import routesConstants from '../constants/routeConstants';


interface HeaderProps {
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, setIsDarkMode }) => {



    const menuRef = useRef<HTMLUListElement | null>(null);

    const openMenu = () => {
        if (menuRef.current) {
            menuRef.current.style.transform = 'translateX(-16rem)';
        }
    };

    const closeMenu = () => {
        if (menuRef.current) {
            menuRef.current.style.transform = 'translateX(16rem)';
        }
    };

    return (

        <nav className='w-full fixed px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[8%] 2xl:px-[12%] py-3 sm:py-4 flex justify-between items-center z-50'>
            <GradientBackdrop />
            <Link to={routesConstants.HOME} className='flex items-center z-[1] group'>
                <Img
                    src={Icons.logo}
                    alt='logo'
                    className='w-10 sm:w-14 md:w-16 lg:w-18 xl:w-20 transition-all duration-300 group-hover:scale-105'
                />
                <span className="text-base sm:text-lg md:hidden lg:block lg:text-lg xl:text-lg 2xl:text-lg font-semibold ml-1">
                    FI Scheduler
                </span>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8 rounded-full px-6 lg:px-8 xl:px-12 py-2 lg:py-3 backdrop-blur-md bg-white/50 dark:bg-black/50 shadow-sm z-[1]">
                {['Inicio', 'Ver Horarios', 'Generar Horario', 'Mis Horarios', 'Acerca de'].map((item) => (
                    <li key={item} className='relative group'>
                        <a
                            href={`#${item.toLowerCase().replace(' ', '-')}`}
                            className="relative block text-sm lg:text-base xl:text-base  transition-all duration-300 hover:text-blue-600 dark:hover:text-purple-600 group whitespace-nowrap"
                        >
                            {item}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-purple-600 transition-all duration-300 group-hover:w-full" />
                        </a>
                    </li>
                ))}
            </ul>

            {/* Controls Container */}
            <div className='flex items-center gap-3 sm:gap-4 md:gap-5 z-[1]'>
                <button onClick={() => setIsDarkMode(prev => !prev)}>
                    <Img
                        src={isDarkMode ? Icons.sun : Icons.moon}
                        alt=''
                        className='w-6'
                    />
                </button>
                <Link to="#">
                    <Img
                        src={Icons.github}
                        alt='GitHub'
                        className='w-6 dark:invert dark:brightness-75' />
                </Link>


                <Link
                    to={routesConstants.ROOT}
                    className='hidden lg:flex items-center gap-3 px-10 py-2.5 border border-gray-500 rounded-full ml-4'
                >
                    Contacto
                    <Img
                        src={Icons.arrow}
                        alt='arrow icon'
                        className='w-5 dark:invert dark:brightness-75'
                    />
                </Link>


                <button className='block md:hidden ml-3' onClick={openMenu}>
                    <Img
                        src={Icons.menu}
                        alt=''
                        className='w-6 dark:invert dark:brightness-75'
                    />
                </button>
            </div>

            {/* Mobile Menu */}

            <ul
                ref={menuRef}
                className='flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-[#ac6cff] dark:bg-[#070A35] transition-transform duration-500'
            >
                <div className='absolute top-6 right-6' onClick={closeMenu}>
                    <Img
                        src={Icons.close}
                        alt=''
                        className='w-5 cursor-pointer dark:invert'
                    />
                </div>
                <li><a href="#top">Inicio</a></li>
                <li><a href="#top">Ver Horarios</a></li>
                <li><a href="#generate">Generar Horario</a></li>
                <li><a href="#history">Mis Horarios</a></li>
                <li><a href="#about">Acerca de</a></li>
            </ul>
        </nav>

    );
};


export default Header;
