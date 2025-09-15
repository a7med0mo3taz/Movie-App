import React, { useContext, useEffect } from 'react'
import Search from '../Search/Search'
import { TVSContext } from '../../context/TVSContext/TVSContext'
import Loading from '../Loading/Loading'
import TVSCard from '../TVSCard/TVSCard'

export default function TVShows() {
    // page title
    const usePageTitle = (title) => {
        useEffect(() => {
            document.title = title;
        }, [title]);
    };
    usePageTitle("TV Shows")
    const { loading } = useContext(TVSContext)
    if (loading) {
        return <Loading />
    }
    return (
        <>
            <Search />
            <TVSCard />
        </>
    )
}
