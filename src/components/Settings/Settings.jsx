import React, { useEffect, useState } from 'react'
import "./Settings.css"
import { IoSunny } from "react-icons/io5";
import { faArrowUp, faGear, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function Settings({ darkMode, toggleDarkMode }) {



    // showed icons
    const [isVisible, setIsVisible] = useState(false)

    // scroll to top 
    useEffect(() => {
        const showedIcons = () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener('scroll', showedIcons);
        return () => window.removeEventListener('scroll', showedIcons);
    }, []);
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    if (!isVisible) return null;

    return (
        <div
            className="fixed flex  justify-start items-center gap-3 z-50 bottom-10 start-2
                        lg:bottom-5 lg:start-6">

            {/* Scroll to Top */}
            <button
                onClick={scrollToTop}
                className={` rounded-xl cursor-pointer  bg-yellow-500  `}
                aria-label="Scroll to Top"
            >
                <FontAwesomeIcon icon={faArrowUp} size='lg' className='text-white px-1.5 py-1.5 md:px-2.5 md:py-2.5  lg:px-3 lg:py-3 mt-1  transition' />
            </button>




        </div>
    )
}
