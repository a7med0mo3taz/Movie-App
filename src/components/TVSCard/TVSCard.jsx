import React, { useContext } from 'react'
import { MoviesContext } from '../../context/MoviesContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faHeart } from '@fortawesome/free-solid-svg-icons';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { TVSContext } from '../../context/TVSContext/TVSContext';
import ShowsPagination from '../ShowsPagination/ShowsPagination';
import { useWatchList } from '../../context/WatchlistContext/WatchlistContext';
import toast from 'react-hot-toast';
export default function TVSCard() {
    const { addToWatchList, removeFromWatchList, isInWatchList } = useWatchList();
    const { scrollToTop } = useContext(MoviesContext)
    const { Shows, currentShowsPage } = useContext(TVSContext)

    const getColor = (value) => {
        if (value >= 70) return "#21d07a";
        if (value >= 40) return "#d2d531";
        return "red";
    };
    const trailColor = (value) => {
        if (value >= 70) return "#1c3e29";
        if (value >= 40) return "#403c10";
        return "#571435";
    };
    return (
        <div className="container mx-auto my-10 p-5">
            <h1 className='text-3xl font-semibold my-10 text-start'>TV Shows</h1>
            <div className="grid grid-cols-12 gap-6 mb-5 ">
                {Shows.map((show) => {
                    const rating = parseFloat((show.vote_average * 10).toFixed(1));
                    const inList = isInWatchList(show.id);
                    return (
                        <Link to={"/showDetails/" + show.id}
                            onClick={() => scrollToTop()}
                            state={{ from: "/tvshows", page: currentShowsPage }}
                            className='col-span-12
                                    sm:col-span-6
                                    md:col-span-4
                                    lg:col-span-3
                                    xl:col-span-2'>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                key={show.id}
                                className="relative  ">
                                <div
                                    className="bg-[#F3F1F1] rounded-xl overflow-hidden shadow-md hover:shadow-xl 
                                                smooth transform hover:-translate-y-2 cursor-pointer flex flex-col "
                                >
                                    <div className="relative w-full overflow-hidden">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                                            alt={show.name}
                                            loading="lazy"
                                            className="object-cover w-full h-fit rounded-lg mb-5 object-center hover:scale-110 smooth"
                                        />

                                        <div className="absolute top-3 right-3 w-8 h-8 bg-white/60 backdrop-blur-md
                                                rounded-full flex items-center justify-center hover:scale-110 transition">
                                            <FontAwesomeIcon icon={faEllipsis} className="text-gray-700" />
                                        </div>

                                        <div className="absolute bottom-0 left-3 w-12 h-12 bg-black rounded-full  p-1 ">
                                            <CircularProgressbar value={rating} text={`${rating}%`}
                                                styles={buildStyles({
                                                    textSize: "28px",
                                                    textColor: "#fff",
                                                    pathColor: getColor(rating),
                                                    trailColor: trailColor(rating),
                                                })}
                                            />
                                        </div>
                                    </div>

                                    <div className="p-4 flex flex-col flex-grow mb-5">
                                        <h2 title={show.name} className="text-lg font-semibold mb-2 line-clamp-1 hover:text-yellow-400 transition">
                                            {show.name}
                                        </h2>
                                        <div className="flex items-center justify-between mt-auto">
                                            <p className="text-gray-600 text-sm">{show.first_air_date}</p>
                                            <FontAwesomeIcon
                                                icon={faHeart}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    if (inList) {
                                                        removeFromWatchList(show.id);
                                                        toast.error(`${show.name}  removed from WatchList`);
                                                    } else {
                                                        addToWatchList(show);
                                                        toast.success(`${show.name}  added to WatchList`);
                                                    }
                                                    inList ? removeFromWatchList(show.id) : addToWatchList(show);
                                                }}
                                                className={`text-2xl cursor-pointer transition ${inList ? "text-red-500" : "text-black "
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    )
                })}
            </div>
            <ShowsPagination />
        </div>
    )
}
