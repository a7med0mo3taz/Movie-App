import { faAnglesLeft, faHeart, faLink, faStar as fasStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from '../Loading/Loading';
import { useContext, useEffect } from 'react';
import { MoviesDetailsContext } from '../../context/MoviesDetailsContext';
import Movies from '../Movies/NowPlaying';
import Recommendations from '../Recommendations/Recommendations';
import { useLocation } from 'react-router-dom';
import { useWatchList } from '../../context/WatchlistContext/WatchlistContext';
import toast from 'react-hot-toast';
export default function MovieDetails() {


    const { movieDetails, navigate, page } = useContext(MoviesDetailsContext)
    const { addToWatchList, removeFromWatchList, isInWatchList } = useWatchList();


    const location = useLocation();

    const from = location.state?.from || "/";
    const prevPage = location.state?.page || 1;
    if (!movieDetails) {
        return <Loading />
    }
    const rating = movieDetails.vote_average ? (movieDetails.vote_average / 10) * 5 : 0;
    const inList = isInWatchList(movieDetails.id);
    // page title
    const usePageTitle = (title) => {
        useEffect(() => {
            document.title = title;
        }, [title]);
    };
    usePageTitle(movieDetails.title);
    return (
        <div className="container mx-auto my-10 p-5">

            {/* Back Button */}
            <div className="BackBtn mb-5">
                <button onClick={() => navigate(from, { state: { page: prevPage } })}
                    className="px-4 py-2 cursor-pointer bg-[#FFE353] hover:bg-yellow-400 smooth rounded"
                >
                    <FontAwesomeIcon icon={faAnglesLeft} /> Back
                </button>

            </div>

            <div className="grid grid-cols-12 gap-4 lg:gap-8 mb-10">

                {/* Movie Img */}
                <div className="movieImg col-span-12 lg:col-span-4">
                    <img src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                        alt={movieDetails.title}
                        loading='lazy'
                        className='w-full rounded-xl object-cover ' />
                </div>

                <div className="col-span-12 lg:col-span-8 my-auto ">

                    {/* Movie Title & Date */}
                    <div className="flex items-start justify-between mb-5">
                        <div className="flex flex-col items-start">
                            <h2 className='text-2xl lg:text-5xl font-semibold mb-5'> {movieDetails.title} </h2>
                            <span className='text-xs text-[#858585] '>
                                {movieDetails.release_date}
                            </span>
                        </div>
                        <FontAwesomeIcon
                            icon={faHeart}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (inList) {
                                    removeFromWatchList(movieDetails.id);
                                    toast.error(`${movieDetails.title} removed from Watchlist `);
                                } else {
                                    addToWatchList(movieDetails);
                                    toast.success(`${movieDetails.title} added to Watchlist `);
                                }
                                inList ? removeFromWatchList(movieDetails.id) : addToWatchList(movieDetails);
                            }}
                            className={`text-4xl my-auto lg:my-0  cursor-pointer transition ${inList ? "text-red-500" : "text-black hover:text-red-500"
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
                            {movieDetails.vote_count}
                        </span>
                    </div>


                    {/* Movie Overview */}
                    <p className='text-xl lg:text-2xl mb-5'> {movieDetails.overview} </p>

                    {/* Movie Genres */}
                    <div className="flex flex-wrap gap-3 mb-5">
                        {movieDetails.genres.map((genre) => (
                            <span
                                key={genre.id}
                                className="bg-[#FFE353] text-black px-4 py-1 rounded-full text-sm font-medium shadow hover:bg-yellow-400 smooth"
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    {/* Duration & Languages */}
                    <div className="flex items-center gap-3 md:gap-10 mb-5">
                        <p className='font-bold text-sm md:text-[16px] '> Duration :  <span> {movieDetails.runtime} </span> Min </p>
                        <p className='font-bold text-sm md:text-[16px]'> Languages :  <span> {movieDetails.spoken_languages.map(lang => lang.english_name).join(", ")} </span></p>
                    </div>

                    {/* Production Companies */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6 my-8">
                        {movieDetails.production_companies.map((company) => (
                            <div
                                key={company.id}
                                className="flex flex-col items-center bg-yellow-50 rounded-lg p-2 lg:p-3 shadow"
                            >
                                {company.logo_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                                        alt={company.name}
                                        className="h-6  lg:h-16 object-contain mb-2"
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

                    <a href={movieDetails.homepage} target='_blank' className='btn'>
                        Website <FontAwesomeIcon icon={faLink} className='' />
                    </a>


                </div>
            </div>

            <div className="border-t">
                <h1 className='text-3xl lg:text-5xl font-semibold my-10'>Recommendations</h1>
                <Recommendations />
            </div>
        </div>
    )
}
