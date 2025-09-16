
import { faBars, faChevronDown, faHeart, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { MoviesContext } from '../../context/MoviesContext'
import { useWatchList } from '../../context/WatchlistContext/WatchlistContext'

export default function Navbar() {
    const { scrollToTop } = useContext(MoviesContext)
    const { watchList } = useWatchList();
    // sideNav
    const [openNav, setOpenNav] = useState(false)
    // handleDropdown
    const [openDropdown, setOpenDropdown] = useState(false)
    const handleDropdown = (name) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    // fixed Navbar
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);


        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <div>
            <nav className={`bg-[#FFE353] border-gray-200 
                ${isScrolled ? "fixed top-0 left-0 right-0 z-50  border-b border-white  " : "relative  "} `}>
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 px-3">
                    <Link to={""} onClick={() => scrollToTop()} className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center lg:text-2xl font-semibold whitespace-nowrap ">Movie App</span>
                    </Link>
                    <div className="links flex items-center justify-center gap-1.5 lg:hidden" >
                        
                        <div className="">
                            <Link to="/watchlist" className="relative flex items-center">
                                <FontAwesomeIcon icon={faHeart} className='text-xl text-red-500 ' />
                                <p>WatchList</p>
                                {watchList.length > 0 && (
                                    <span
                                        className="absolute -top-2.5 -right-2 bg-red-500 text-white text-xs font-bold
                                        rounded-full w-5 h-5 flex items-center justify-center"
                                    >
                                        {watchList.length}
                                    </span>
                                )}
                            </Link>
                        </div>
                        {/* Open main menu */}
                        <button type="button" onClick={() => setOpenNav(prev => !prev)} className="inline-flex cursor-pointer items-center    justify-center 
                        ">
                            <span className="sr-only">Open main menu</span>
                            <FontAwesomeIcon icon={faBars} className='text-2xl sm:text-3xl smooth' />
                        </button>
                    </div>

                    {/* overlay */}
                    {openNav && (
                        <div
                            onClick={() => setOpenNav(false)}
                            className=" lg:hidden fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm z-49 smooth"
                        />
                    )}
                    <div className={`fixed top-0  right-0 w-50 h-screen flex flex-col z-50 transform smooth  bg-[#FFE353]  lg:bg-transparent 
                        sm:w-80
                        lg:static lg:translate-x-0 lg:opacity-100 lg:pointer-events-auto  lg:flex lg:items-center lg:left-auto lg:right-0 lg:w-auto lg:h-auto
                        ${openNav ? "translate-x-0 opacity-100 pointer-events-auto" : "translate-x-full  opacity-0 pointer-events-none"}`}>
                        <div className={`lg:hidden text-3xl  absolute top-5 -left-15 `}><FontAwesomeIcon icon={faXmark} className='cursor-pointer text-white' onClick={() => { setOpenNav(prev => !prev) }} />
                        </div>
                        <ul className="flex flex-col text-lg font-medium  mt-2 gap-2.5 smooth max-h-screen overflow-y-auto
                            lg:flex-row lg:items-center lg:mt-0">
                            <li>
                                <button onClick={() => handleDropdown("Movies")}
                                    className={`flex items-center justify-between w-full py-2 px-3 cursor-pointer`}>
                                    Movies
                                    <FontAwesomeIcon icon={faChevronDown} className={` ml-1 ${openDropdown === "Movies" ? 'rotate-180' : ''} smooth`} /></button>
                                {/* Dropdown menu */}
                                <div className={` font-normal z-10 bg-white   w-full overflow-hidden smooth
                                                lg:bg-white dark:lg:bg-white  lg:rounded-lg lg:w-56 lg:shadow-sm lg:top-10 lg:absolute
                                                    ${openDropdown === "Movies" ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-3"}`}>
                                    <ul className={` py-2 text-sm  w-full  z-10 text-black lg:text-gray-700 `}>
                                        <li>
                                            <NavLink onClick={() => { setOpenNav(prev => !prev); scrollToTop(); handleDropdown("Movies") }} to={""}
                                                className="block px-2 py-2  hover:bg-[#FFE353] smooth ">
                                                Now Playing
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={() => { setOpenNav(prev => !prev); scrollToTop(); handleDropdown("Movies") }} to={"/popular"}
                                                className="block px-2 py-2  hover:bg-[#FFE353] smooth ">
                                                Popular Movies
                                            </NavLink>
                                        </li>

                                    </ul>

                                </div>
                            </li>
                            <li>
                                <NavLink to={"/TVShows"} onClick={() => { setOpenNav(prev => !prev); scrollToTop(); }} className={`flex items-center justify-between w-full py-2 px-3`}>TV Shows</NavLink>
                            </li>


                        </ul>
                    </div>

                    <div className="  hidden lg:flex lg:items-center">
                        <div >
                            <Link to={"/watchList"} className="relative flex items-center">
                                <FontAwesomeIcon icon={faHeart} className='text-3xl text-red-500 ' />
                                <p>WatchList</p>
                                {watchList.length > 0 && (
                                    <span
                                        className="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-bold
                                        rounded-full w-5 h-5 flex items-center justify-center"
                                    >
                                        {watchList.length}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>

                </div>
            </nav>


        </div>
    )
}
