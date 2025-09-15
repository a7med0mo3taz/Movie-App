import React, { useContext, useEffect } from 'react'
import { TVSDetailsContext } from '../../context/TVSContext/TVSDetailsContext'
import Loading from '../Loading/Loading';
import { useLocation } from 'react-router-dom';
import { faAnglesLeft, faHeart, faLink, faStar as fasStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useWatchList } from '../../context/WatchlistContext/WatchlistContext';
import toast from 'react-hot-toast';

export default function ShowDetails() {
    const { showDetails, showNavigate } = useContext(TVSDetailsContext)
    const { addToWatchList, removeFromWatchList, isInWatchList } = useWatchList();

    const showLocation = useLocation();

    const from = showLocation.state?.from || "/";
    const prevPage = showLocation.state?.page || 1;
    if (!showDetails) {
        return <Loading />
    }
    const rating = showDetails.vote_average ? (showDetails.vote_average / 10) * 5 : 0;
    const inList = isInWatchList(showDetails.id);
// page title
    const usePageTitle = (title) => {
        useEffect(() => {
            document.title = title;
        }, [title]);
    };
    usePageTitle(showDetails.name);
    return (
        <div className="container mx-auto my-10 p-5">

            {/* Back Button */}
            <div className="BackBtn mb-5">
                <button onClick={() => showNavigate(from, { state: { page: prevPage } })}
                    className="px-4 py-2 cursor-pointer bg-[#FFE353] hover:bg-yellow-400 smooth rounded"
                >
                    <FontAwesomeIcon icon={faAnglesLeft} /> Back
                </button>
            </div>

            <div className="grid grid-cols-12 gap-4 lg:gap-8 mb-10">

                {/* Show Img */}
                <div className="showImg col-span-12 lg:col-span-4">
                    <img src={`https://image.tmdb.org/t/p/w500${showDetails.poster_path}`}
                        alt={showDetails.name}
                        loading='lazy'
                        className='w-full rounded-xl object-cover ' />
                </div>

                <div className="col-span-12 lg:col-span-8 my-auto">
                    {/* Show Title & Date*/}
                    <div className="flex items-start justify-between mb-5">
                        <div className="flex flex-col items-start">
                            <h2 className='text-2xl lg:text-5xl font-semibold mb-5'> {showDetails.name} </h2>
                            <span className='text-xs text-[#858585] '>
                                {showDetails.first_air_date}
                            </span>
                        </div>
                        <FontAwesomeIcon
                            icon={faHeart}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (inList) {
                                    removeFromWatchList(showDetails.id);
                                    toast.error(`${showDetails.name}  removed from WatchList`);
                                } else {
                                    addToWatchList(showDetails);
                                    toast.success(`${showDetails.name}  added to WatchList`);
                                }
                                inList ? removeFromWatchList(showDetails.id) : addToWatchList(showDetails);
                            }}
                            className={`text-4xl my-auto lg:my-0 cursor-pointer transition ${inList ? "text-red-500" : "text-black hover:text-red-500"
                                }`}
                        />
                    </div>

                    {/* Voting & Ratings */}
                    <div className="Voting flex items-center space-x-3 mb-5">
                        <div className="flex">
                            {[...Array(5)].map((_, index) => {
                                const starValue = index + 1;
                                if (rating >= starValue) {
                                    return (
                                        <FontAwesomeIcon
                                            key={index}
                                            icon={fasStar}
                                            className="text-[#FFE353] text-xl"
                                        />
                                    );
                                } else if (rating >= starValue - 0.5) {
                                    return (
                                        <FontAwesomeIcon
                                            key={index}
                                            icon={faStarHalfAlt}
                                            className="text-[#FFE353] text-xl"
                                        />
                                    );
                                } else {
                                    return (
                                        <FontAwesomeIcon
                                            key={index}
                                            icon={farStar}
                                            className="text-[#FFE353] text-xl"
                                        />
                                    );
                                }
                            })}
                        </div>
                        <span>
                            {showDetails.vote_count}
                        </span>
                    </div>

                    {/* Show Overview */}
                    <p className='text-xl lg:text-2xl mb-5'> {showDetails.overview} </p>

                    {/* Show Genres */}
                    <div className="flex flex-wrap gap-3 mb-5">
                        {showDetails.genres.map((genre) => (
                            <span
                                key={genre.id}
                                className="bg-[#FFE353] text-black px-4 py-1 rounded-full text-sm font-medium shadow hover:bg-yellow-400 smooth"
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    {/* Seasons & Episodes & Languages */}
                    <div className="flex items-center gap-0 md:gap-10 mb-5">
                        <p className='font-bold text-center'> Seasons :  <span> {showDetails.number_of_seasons} </span>  </p>
                        <p className='font-bold text-center'> Episodes :  <span> {showDetails.number_of_episodes} </span> Episodes</p>
                        <p className='font-bold text-center'> Languages :  <span> {showDetails.spoken_languages.map(lang => lang.english_name).join(", ")} </span></p>
                    </div>

                    {/* Production Companies */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6 my-8">
                        {showDetails.production_companies.map((company) => (
                            <div
                                key={company.id}
                                className="flex flex-col items-center bg-yellow-50 rounded-lg p-2 lg:p-3 shadow"
                            >
                                {company.logo_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                                        alt={company.name}
                                        className="h-16 object-contain mb-2"
                                    />
                                ) : (
                                    <div className="h-16 w-full flex items-center justify-center text-gray-400 text-sm">
                                        No Logo
                                    </div>
                                )}
                                <p className="text-sm font-medium text-center">{company.name}</p>
                                <span className="text-xs text-black">{company.origin_country}</span>
                            </div>
                        ))}
                    </div>

                    <a href={showDetails.homepage} target='_blank' className='btn'>
                        Website <FontAwesomeIcon icon={faLink} className='' />
                    </a>
                </div>
            </div>
        </div>
    )
}
