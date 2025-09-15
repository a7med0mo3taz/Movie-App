import React, { useContext, useEffect } from 'react'
import Search from '../Search/Search'
import { MoviesContext } from '../../context/MoviesContext'
import Loading from '../Loading/Loading'
import PopularMovies from '../PopularMovies/PopularMovies'

export default function Popular() {
    // page title
    const usePageTitle = (title) => {
        useEffect(() => {
            document.title = title;
        }, [title]);
    };
    usePageTitle("Popular Movies")
    const { loading } = useContext(MoviesContext)
    if (loading) {
        return <Loading />
    }
    return (
        <div>
            <Search />
            <PopularMovies />
        </div>
    )
}
