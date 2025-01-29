"use client"

import { useState } from "react"
import MovieCard from "./MovieCard"
import SearchBox from "./SearchBox"
import type { Movie } from "../types/movie"

export default function MovieRecommendations() {
  const [searchResults, setSearchResults] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (query: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`)
      if (!response.ok) {
        throw new Error("Failed to fetch search results")
      }
      const data = await response.json()
      setSearchResults(data)
    } catch (err) {
      setError("An error occurred while searching for movies. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="mb-8">
      <h2 className="text-3xl font-bold mb-4">Find Your Next Favorite Movie 🍿</h2>
      <SearchBox onSearch={handleSearch} />
      {isLoading && <p className="text-center mt-4">Searching for movies... 🔍</p>}
      {error && <p className="text-center mt-4 text-red-500">{error}</p>}
      {searchResults.length > 0 && (
        <div className="mt-6">
          <h3 className="text-2xl font-semibold mb-4">Search Results</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchResults.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

