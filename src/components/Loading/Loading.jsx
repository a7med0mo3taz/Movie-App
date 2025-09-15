import React from 'react'
import Animation from './Loader'
import Loader from './Loader'
export default function Loading() {
    return (
        <>
            <div className="loading flex justify-center items-center bg-[#FFE353] text-white fixed top-0 bottom-0 right-0 left-0 z-40">
                <Loader/>
            </div>
        </>
    )
}
