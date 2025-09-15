import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    // page title
    const usePageTitle = (title) => {
        useEffect(() => {
            document.title = title;
        }, [title]);
    };
    usePageTitle("Not Found Page");
    return (
        <div className='bg-white py-10'>
            <div className="container mx-auto ">
                <div className="flex flex-col items-center justify-center gap-2">
                    <h1 class="text-9xl font-bold text-yellow-400  ">404</h1>
                    <p class="text-4xl font-semibold mt-4"> Page not found </p>
                    <p class="text-xl mt-4 mb-8 text-gray-500 dark:text-white smooth"> Sorry, the page you are looking for does not exist or has been moved. </p>
                    <Link to={"/"} class="btn" >
                        Back to Home Page
                    </Link>
                </div>
            </div>
        </div>
    )
}
