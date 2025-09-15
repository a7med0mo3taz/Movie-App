import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Search() {
    const [query, setQuery] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (query.trim() !== "") {
            navigate(`/search/${query}`)
        }
    }

    return (
        <div>
            <div className="container mx-auto p-10 bg-[#f2f0f0] m-5 rounded-xl shadow-xl">
                <div className="flex flex-col items-start justify-center">
                    <h2 className='text-3xl text-center lg:text-start font-semibold mb-5 '>Welcome to our movie app</h2>
                    <p className='text-sm mb-5 text-center lg:text-start'>Millions of movies, TV shows and people to discover. Explore now.</p>
                </div>
                <div className="w-full">
                    <form onSubmit={handleSubmit} className="flex items-center mx-auto">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search and explore..."
                            className="bg-yellow-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        />
                        <button
                            type="submit"
                            className="inline-flex items-center  btn ml-3 cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2" />
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
