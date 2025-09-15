import React, { useEffect } from 'react'
import Search from '../Search/Search'
import NowPlaying from '../Movies/NowPlaying'

export default function Home() {
    // page title
    const usePageTitle = (title) => {
        useEffect(() => {
            document.title = title;
        }, [title]);
    };
    usePageTitle("Movie App")
    return (
        <div>
            <Search />
            <NowPlaying />
        </div>
    )
}
