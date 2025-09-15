import React, { useContext, } from 'react'
import "react-circular-progressbar/dist/styles.css";
import Loading from '../Loading/Loading';
import { MoviesContext } from '../../context/MoviesContext';
import NowPlayingMovieCard from '../NowPlayingMovieCard/NowPlayingMovieCard';

export default function NowPlaying() {
    const {loading} = useContext(MoviesContext)
    if (loading) {
        return <Loading />
    }
    return (
        <NowPlayingMovieCard/>
    )
}
