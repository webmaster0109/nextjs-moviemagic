"use client"

import type React from "react"
import { createContext, useState, useContext, type ReactNode } from "react"
import type { Movie } from "../types/movie"

interface WatchlistContextType {
  watchlist: Movie[]
  addToWatchlist: (movie: Movie) => void
  removeFromWatchlist: (movieId: number) => void
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined)

export const WatchlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [watchlist, setWatchlist] = useState<Movie[]>([])

  const addToWatchlist = (movie: Movie) => {
    setWatchlist((prevWatchlist) => {
      if (!prevWatchlist.some((m) => m.id === movie.id)) {
        return [...prevWatchlist, movie]
      }
      return prevWatchlist
    })
  }

  const removeFromWatchlist = (movieId: number) => {
    setWatchlist((prevWatchlist) => prevWatchlist.filter((movie) => movie.id !== movieId))
  }

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  )
}

export const useWatchlist = () => {
  const context = useContext(WatchlistContext)
  if (context === undefined) {
    throw new Error("useWatchlist must be used within a WatchlistProvider")
  }
  return context
}

