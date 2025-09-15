import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import MoviesContextProvider from '../../context/MoviesContext'
import MoviesDetailsContextProvider from '../../context/MoviesDetailsContext'
import TVSContextProvider from '../../context/TVSContext/TVSContext'
import TVSDetailsContextProvider from '../../context/TVSContext/TVSDetailsContext'
import Settings from '../Settings/Settings'
import { WatchListProvider } from '../../context/WatchlistContext/WatchlistContext'

export default function Layout() {
    return (
        <div>
            <MoviesContextProvider>
                <TVSContextProvider>
                    <MoviesDetailsContextProvider>
                        <TVSDetailsContextProvider>
                            <WatchListProvider>
                                <Navbar />

                                <Outlet />

                                <Footer />

                                <Settings />
                            </WatchListProvider>
                        </TVSDetailsContextProvider>
                    </MoviesDetailsContextProvider>
                </TVSContextProvider>
            </MoviesContextProvider>
        </div>
    )
}
