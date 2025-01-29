"use client"

import type React from "react"
import { createContext, useState, useContext, type ReactNode } from "react"
import type { Movie } from "../types/movie"

interface MovieInfoContextType {
  movieInfo: Movie | null
  setMovieInfo: (movie: Movie | null) => void
}

const MovieInfoContext = createContext<MovieInfoContextType | undefined>(undefined)

export const MovieInfoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [movieInfo, setMovieInfo] = useState<Movie | null>(null)

  return <MovieInfoContext.Provider value={{ movieInfo, setMovieInfo }}>{children}</MovieInfoContext.Provider>
}

export const useMovieInfo = () => {
  const context = useContext(MovieInfoContext)
  if (context === undefined) {
    throw new Error("useMovieInfo must be used within a MovieInfoProvider")
  }
  return context
}

