import { Children, createContext, useContext, useEffect, useState } from "react";
import { TVSContext } from "./TVSContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const TVSDetailsContext = createContext()

export default function TVSDetailsContextProvider({ children }) {

    const [showDetails, setShowDetails] = useState(null)
    const showPath = useParams()
    const showLocation = useLocation();
    const showNavigate = useNavigate();
    const showPage = showLocation.state?.page || 1;

    async function getShowDetails() {
        const res = await axios.get(
            `https://api.themoviedb.org/3/tv/${showPath.id}?api_key=ee313a7d3777b93a70b458d00e050807`
        )
        setShowDetails(res.data)
    }

    useEffect(() => {
        getShowDetails()
    }, [showPath.id])

    return <TVSDetailsContext.Provider
        value={{
            showDetails,
            showNavigate, 
            showPage,
            showLocation
        }}
    >
        {children}
    </TVSDetailsContext.Provider>
}