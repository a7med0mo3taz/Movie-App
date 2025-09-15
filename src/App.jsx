
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import Layout from './components/Layout/Layout'
import MovieDetails from './components/MovieDetails/MovieDetails'
import WatchList from './components/WatchList/WatchList'
import Popular from './components/Popular/Popular'
import TVShows from './components/TVShows/TVShows'
import ShowDetails from './components/ShowDetails/ShowDetails'
import NotFound from './components/NotFound/NotFound'
import SearchResult from './components/SearchResult/SearchResult'
import { Toaster } from 'react-hot-toast'

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />, children: [
        { path: "", element: <Home /> },
        { path: "popular", element: <Popular /> },
        { path: "TVShows", element: <TVShows /> },
        { path: "movieDetails/:id", element: <MovieDetails /> },
        { path: "showDetails/:id", element: <ShowDetails /> },
        { path: "watchList", element: <WatchList /> },
        { path: "/search/:query", element: <SearchResult /> },
        { path: "*", element: <NotFound /> }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" reverseOrder={false} gutter={8} toastOptions={{duration: 3000,}} containerStyle={{top: 80,}} />
    </>
  )
}

export default App
