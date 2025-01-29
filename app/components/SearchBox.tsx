"use client"

import { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import type { Movie } from "../types/movie"
import Image from "next/image"
import { useTrailer } from "../contexts/TrailerContext"
import { useMovieInfo } from "../contexts/MovieInfoContext"

interface SearchBoxProps {
  onSearch: (query: string) => void
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { setTrailerKey } = useTrailer()
  const { setMovieInfo } = useMovieInfo()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const searchMovies = async () => {
      if (query.length > 2) {
        setIsLoading(true)
        try {
          const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`)
          if (!response.ok) {
            throw new Error("Failed to fetch search results")
          }
          const data = await response.json()
          setResults(data)
          setShowDropdown(true)
        } catch (err) {
          console.error(err)
        } finally {
          setIsLoading(false)
        }
      } else {
        setResults([])
        setShowDropdown(false)
      }
    }

    const debounce = setTimeout(() => {
      searchMovies()
    }, 300)

    return () => clearTimeout(debounce)
  }, [query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
      setShowDropdown(false)
    }
  }

  const handleMovieClick = (movie: Movie) => {
    setMovieInfo(movie)
    setShowDropdown(false)
  }

  const handleTrailerClick = (e: React.MouseEvent, trailerKey: string | undefined) => {
    e.stopPropagation()
    if (trailerKey) {
      setTrailerKey(trailerKey)
    }
  }

  return (
    <div className="relative mb-8">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            placeholder="Search for movies... 🎬"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full py-2 px-4 pr-10 rounded-full border-2 border-[#ff7417] focus:outline-none focus:border-[#cf5a00] transition-colors duration-300"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#ff7417] hover:text-[#cf5a00] transition-colors duration-300"
          >
            <Search size={24} />
          </button>
        </div>
      </form>
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto"
        >
          {isLoading ? (
            <div className="p-4 text-center">Loading...</div>
          ) : results.length > 0 ? (
            results.map((movie) => (
              <div
                key={movie.id}
                className="p-4 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleMovieClick(movie)}
              >
                <div className="flex items-center">
                  <Image
                    src={movie.posterPath ? `https://image.tmdb.org/t/p/w92${movie.posterPath}` : "/placeholder.svg"}
                    alt={movie.title}
                    width={46}
                    height={69}
                    className="rounded mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{movie.title}</h3>
                    <p className="text-sm text-gray-600">{movie.releaseDate.split("-")[0]}</p>
                  </div>
                </div>
                {movie.trailerKey && (
                  <button
                    onClick={(e) => handleTrailerClick(e, movie.trailerKey)}
                    className="mt-2 text-sm text-[#ff7417] hover:text-[#cf5a00]"
                  >
                    Watch Trailer
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="p-4 text-center">No results found</div>
          )}
        </div>
      )}
    </div>
  )
}

