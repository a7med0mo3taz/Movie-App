import React, { useContext, useEffect } from "react";
import { IoIosHeartDislike } from "react-icons/io";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStarHalfAlt, faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { useWatchList } from "../../context/WatchlistContext/WatchlistContext";
import toast from "react-hot-toast";
import { MoviesContext } from "../../context/MoviesContext";

export default function WatchList() {
    // page title
    const usePageTitle = (title) => {
        useEffect(() => {
            document.title = title;
        }, [title]);
    };
    usePageTitle("WatchList");
    const { watchList, removeFromWatchList, isInWatchList, addToWatchList } = useWatchList();
    const { scrollToTop } = useContext(MoviesContext)

    return (
        <div>
            <h2 className="text-3xl px-20 pt-7 font-semibold text-center lg:text-start">Watch list </h2>

            {watchList.length === 0 ? (
                <div className="container mx-auto py-20">
                    <div className="flex flex-col gap-5 items-center justify-center">
                        <IoIosHeartDislike className="text-[200px] text-[#D1D1D1]" />
                        <p className="text-2xl">No Movies in watch list</p>
                        <Link to={"/"} className="btn">
                            Back to home
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="container mx-auto py-20 ">
                    <div className="grid grid-cols-12 p-3 gap-10">
                        {watchList.map((movie) => {
                            const inList = isInWatchList(movie.id);
                            const rating = movie.vote_average ? (movie.vote_average / 10) * 5 : 0;
                            return (
                                <Link to={"/movieDetails/" + movie.id}
                                onClick={()=> scrollToTop()}
                                    key={movie.id}
                                    className="grid grid-cols-12  mx-auto my-auto col-span-11  md:col-span-12 lg:col-span-6 bg-white rounded-xl shadow-md p-5 gap-5 items-start"
                                >
                                    

                                    <div className="img col-span-12 md:col-span-3 lg:col-span-3  w-full   overflow-hidden rounded-lg">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                            alt={movie.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="flex flex-col flex-grow col-span-12 md:col-span-9 lg:col-span-9 my-auto">
                                        <div className="flex items-start justify-between mb-5">
                                            <div className="flex flex-col items-start">
                                                <h2 className="text-2xl font-semibold mb-2"> {movie.title} </h2>
                                                <span className="text-xs text-[#858585] ">
                                                    {movie.release_date}
                                                </span>
                                            </div>
                                            <FontAwesomeIcon
                                                icon={faHeart}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    toast.error(`${movie.title}  removed from WatchList `);
                                                    inList
                                                        ? removeFromWatchList(movie.id)
                                                        : addToWatchList(movie);
                                                }}
                                                className={`text-3xl cursor-pointer transition ${inList
                                                    ? "text-red-500"
                                                    : "text-black "
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
                                                {movie.vote_count}
                                            </span>
                                        </div>


                                        <p className="text-gray-700 text-sm line-clamp-5 mb-3">
                                            {movie.overview}
                                        </p>


                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
