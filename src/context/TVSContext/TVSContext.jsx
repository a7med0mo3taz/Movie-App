import axios from 'axios';
import React, { Children, createContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

export const TVSContext = createContext()

export default function TVSContextProvider({ children }) {
    const [Shows, setShows] = useState([]);
    const location = useLocation();
    const [currentShowsPage, setCurrentShowsPage] = useState(location.state?.page || 1);
    const [totalShowsPages, setTotalShowsPages] = useState(0);
    const [loading, setLoading] = useState(true);

    async function getShows() {
        setLoading(true);
        const res = await axios.get(
            `https://api.themoviedb.org/3/tv/popular?api_key=ee313a7d3777b93a70b458d00e050807&page=${currentShowsPage}`
        )
        setShows(res.data.results);
        console.log(res.data);
        setTotalShowsPages(Math.min(res.data.total_pages, 500));
        setLoading(false);
    }
    useEffect(() =>{
        getShows()
    } , [currentShowsPage])
    return <TVSContext.Provider
        value={{
            loading,
            Shows,
            setCurrentShowsPage,
            currentShowsPage,
            getShows,
            setShows,
            totalShowsPages,
        }}
    >
        {children}
    </TVSContext.Provider>
}