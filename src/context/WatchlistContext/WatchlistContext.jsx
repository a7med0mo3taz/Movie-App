import React, { createContext, useContext, useState, useEffect } from "react";

const WatchListContext = createContext();

export function WatchListProvider({ children }) {

  const [watchList, setWatchList] = useState(() => {
    const saved = localStorage.getItem("watchList");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);

  const addToWatchList = (movie) => {
    setWatchList((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  };

  const removeFromWatchList = (id) => {
    setWatchList((prev) => prev.filter((m) => m.id !== id));
  };

  const isInWatchList = (id) => {
    return watchList.some((m) => m.id === id);
  };

  return (
    <WatchListContext.Provider
      value={{
        watchList,
        addToWatchList,
        removeFromWatchList,
        isInWatchList,
      }}
    >
      {children}
    </WatchListContext.Provider>
  );
}

export const useWatchList = () => useContext(WatchListContext);
