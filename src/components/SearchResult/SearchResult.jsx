import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faHeart } from "@fortawesome/free-solid-svg-icons";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { MoviesContext } from "../../context/MoviesContext";
import { useWatchList } from "../../context/WatchlistContext/WatchlistContext";
import toast from "react-hot-toast";


export default function SearchResults() {
    
    const { scrollToTop } = useContext(MoviesContext)
    const { addToWatchList, removeFromWatchList, isInWatchList } = useWatchList();
    const { query } = useParams();
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await axios.get(
                    `https://api.themoviedb.org/3/search/movie?api_key=ee313a7d3777b93a70b458d00e050807&query=${query}&page=${page}`
                );
                setResults(res.data.results);
            } catch (err) {
                console.error("Error fetching search results:", err);
            }
        };
        fetchResults();
    }, [query, page]);


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

// page title
    const usePageTitle = (title) => {
        useEffect(() => {
            document.title = title;
        }, [title]);
    };
    usePageTitle(` ${query} Results `);
    return (
        <div className="container mx-auto p-5">
            <h2 className="text-2xl font-bold mb-5">Search Results for "{query}"</h2>
            {results.length > 0 ? (
                <div className="grid grid-cols-12 gap-5">
                    {results.map((movie) => {
                        const rating = parseFloat((movie.vote_average * 10).toFixed(1));
                        const inList = isInWatchList(movie.id);
                        return (
                            <Link
                                key={movie.id}
                                to={"/movieDetails/" + movie.id}
                                onClick={() => scrollToTop()}
                                className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2"
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="relative"
                                >
                                    <div className="bg-[#F3F1F1] rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-2 cursor-pointer flex flex-col smooth">
                                        <div className="relative w-full overflow-hidden">
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                alt={movie.title}
                                                loading="lazy"
                                                className="object-cover w-full h-fit rounded-lg mb-5 object-center hover:scale-110 transition smooth"
                                            />

                                            <div className="absolute top-3 right-3 w-8 h-8 bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center hover:scale-110 transition smooth">
                                                <FontAwesomeIcon icon={faEllipsis} className="text-gray-700" />
                                            </div>

                                            <div className="absolute bottom-0 left-3 w-12 h-12 bg-black rounded-full p-1">
                                                <CircularProgressbar
                                                    value={rating}
                                                    text={`${rating}%`}
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
                                            <h2 title={movie.title} className="text-lg font-semibold mb-2 line-clamp-1 hover:text-yellow-400 transition smooth">
                                                {movie.title}
                                            </h2>
                                            <div className="flex items-center justify-between mt-auto">
                                                <p className="text-gray-600 text-sm">{movie.release_date}</p>
                                                <FontAwesomeIcon
                                                    icon={faHeart}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        if (inList) {
                                                            removeFromWatchList(movie.id);
                                                            toast.error(`${movie.title}  removed from WatchList `);
                                                        } else {
                                                            addToWatchList(movie);
                                                            toast.success(`${movie.title}  added to WatchList`);
                                                        }
                                                        inList ? removeFromWatchList(movie.id) : addToWatchList(movie);
                                                    }}
                                                    className={`text-2xl cursor-pointer transition ${inList ? "text-red-500" : "text-black "
                                                        }`}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <p>No results found.</p>
            )}

            {/* pagination */}
            <div className="flex justify-center gap-3 mt-5">
                <button
                    onClick={() => { setPage((prev) => Math.max(prev - 1, 1)); scrollToTop() }}
                    disabled={page === 1}
                    className="px-4 py-2 bg-yellow-400 rounded cursor-pointer disabled:opacity-50"
                >
                    Prev
                </button>
                <span className="px-4 py-2">Page {page}</span>
                <button
                    onClick={() => { setPage((prev) => prev + 1); scrollToTop() }}
                    className="px-4 py-2 bg-yellow-400 rounded cursor-pointer"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
