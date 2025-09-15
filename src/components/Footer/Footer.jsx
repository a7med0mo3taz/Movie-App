import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function Footer() {
    return (
        <div className="footer bg-[#FFE353]  py-10 smooth">
            <div className="container mx-auto">
                <div className="grid grid-cols-12 gap-2 mb-10 p-5">

                    <div className="col-span-12   lg:col-span-3  mb-10 lg:mb-0 ">

                        <h2 className='text-xl text-center lg:text-start text-black mb-5'> Movie App</h2>
                        <p className='text-lg text-center lg:text-start text-black'>
                            Your one-stop destination for movies, TV shows, and celebrities information.
                        </p>
                    </div>



                    <div className=" col-span-12  lg:col-span-3 text-center lg:text-start mb-10 lg:mb-0 ">
                        <div className="flex flex-col items-center lg:items-start ">
                            <h2 className='text-xl text-black mb-5'> Important Links</h2>
                        </div>
                        <div className="">

                            <h2 className='flex items-center justify-center lg:justify-start gap-3 text-black text-xl mb-2 '>
                                <FontAwesomeIcon icon={faCircle} className='text-[5px]' /> About Us
                            </h2>

                            <h2 className='flex items-center  gap-3 justify-center lg:justify-start text-black text-xl mb-2 '>
                                <FontAwesomeIcon icon={faCircle} className='text-[5px]' /> Contact Us
                            </h2>

                            <h2 className='flex items-center  gap-3 justify-center lg:justify-start text-black text-xl mb-2 '>
                                <FontAwesomeIcon icon={faCircle} className='text-[5px]' /> Support Forums
                            </h2>

                            <h2 className='flex items-center  gap-3 justify-center lg:justify-start text-black text-xl mb-2 '>
                                <FontAwesomeIcon icon={faCircle} className='text-[5px]' /> API
                            </h2>

                        </div>

                    </div>
                    <div className=" col-span-12  lg:col-span-3 text-center lg:text-start mb-10 lg:mb-0 ">
                        <div className="flex flex-col items-center lg:items-start ">
                            <h2 className='text-xl text-black mb-5'> Get Involved</h2>
                        </div>
                        <div className="">

                            <h2 className='flex items-center  justify-center lg:justify-start gap-3 text-black text-xl mb-2 '>
                                <FontAwesomeIcon icon={faCircle} className='text-[5px]' /> Contribution Bible
                            </h2>

                            <h2 className='flex items-center  gap-3 justify-center lg:justify-start text-black text-xl mb-2 '>
                                <FontAwesomeIcon icon={faCircle} className='text-[5px]' />Add New Movie
                            </h2>

                            <h2 className='flex items-center  gap-3 justify-center lg:justify-start text-black text-xl mb-2 '>
                                <FontAwesomeIcon icon={faCircle} className='text-[5px]' /> Add New TV Show
                            </h2>
                        </div>
                    </div>

                    <div className=" col-span-12  lg:col-span-3 text-center lg:text-start mb-10 lg:mb-0 ">
                        <div className="flex flex-col items-center lg:items-start ">
                            <h2 className='text-xl text-black mb-5'> Community</h2>
                        </div>
                        <div className="">

                            <h2 className='flex items-center justify-center lg:justify-start gap-3 text-black text-xl mb-2 '>
                                <FontAwesomeIcon icon={faCircle} className='text-[5px]' /> Guidelines
                            </h2>

                            <h2 className='flex items-center  gap-3 justify-center lg:justify-start text-black text-xl mb-2 '>
                                <FontAwesomeIcon icon={faCircle} className='text-[5px]' />Discussions
                            </h2>

                            <h2 className='flex items-center  gap-3 justify-center lg:justify-start text-black text-xl mb-2 '>
                                <FontAwesomeIcon icon={faCircle} className='text-[5px]' />Leaderboard
                            </h2>
                        </div>
                    </div>



                </div>

                <div className="copyRights text-center text-[15px] md:text-lg  text-black leading-relaxed">
                    <p> Movie App. All rights reserved. © 2025</p>


                </div>



            </div>
        </div>
    )
}
