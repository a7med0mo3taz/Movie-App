import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const MoviesContext = createContext();

export default function MoviesContextProvider({ children }) {
    // now
    const [Movies, setMovies] = useState([]);
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(location.state?.page || 1);
    const [totalNowPlayingPages, setTotalNowPlayingPages] = useState(0);

    // popular
    const [popularMovies, setPopularMovies] = useState([]);
    const popularLocation = useLocation();
    const [currentPopularPage, setCurrentPopularPage] = useState(popularLocation.state?.page || 1)
    const [totalPopularPages, setTotalPopularPages] = useState(0);

    const [loading, setLoading] = useState(true);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };


    async function getMovies() {
        setLoading(true);
        const res = await axios.get(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=ee313a7d3777b93a70b458d00e050807&page=${currentPage}`
        );
        setMovies(res.data.results);
        setTotalNowPlayingPages(Math.min(res.data.total_pages, 500));
        setLoading(false);
    }
    useEffect(() => {
        getMovies();
    }, [currentPage]);

    async function getPopularMovies() {
        setLoading(true);
        const res = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=ee313a7d3777b93a70b458d00e050807&page=${currentPopularPage}`
        );
        setPopularMovies(res.data.results);
        setTotalPopularPages(Math.min(res.data.total_pages, 500));
        setLoading(false);
    }
    useEffect(() => {
        getPopularMovies();
    }, [currentPopularPage]);



    return (
        <MoviesContext.Provider
            value={{
                Movies,
                loading,
                setMovies,
                currentPage,
                setCurrentPage,
                totalNowPlayingPages,
                getMovies,
                scrollToTop,
                popularMovies,
                getPopularMovies,
                setPopularMovies,
                setCurrentPopularPage,
                currentPopularPage,
                totalPopularPages,
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
}
