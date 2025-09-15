import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MoviesContext } from "./MoviesContext";

export const MoviesDetailsContext = createContext()

export default function MoviesDetailsContextProvider({ children }) {
    const {currentPage} = useContext(MoviesContext)
    const [movieDetails, setMovieDetails] = useState(null)
    const [Recommendations, setRecommendations] = useState([])
    const moviePath = useParams()
    const location = useLocation();
    const navigate = useNavigate();

    const page = location.state?.page || 1;

    async function getMovieDetails() {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${moviePath.id}?api_key=ee313a7d3777b93a70b458d00e050807`)
        setMovieDetails(res.data)
    }
    useEffect(() => {
        getMovieDetails()
    }, [moviePath.id]);


    async function getRecommendations() {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${moviePath.id}/recommendations?api_key=ee313a7d3777b93a70b458d00e050807&page=${currentPage}`)
        setRecommendations(res.data.results || []); 
        
    }
    useEffect(() => {
        getRecommendations()
    } , [moviePath.id , currentPage])
    return <MoviesDetailsContext.Provider
        value={{ movieDetails, navigate, page ,Recommendations }}
    >
        {children}
    </MoviesDetailsContext.Provider>
} 