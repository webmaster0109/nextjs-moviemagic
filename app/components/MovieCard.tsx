"use client"

import Image from "next/image"
import Link from "next/link"
import { useWatchlist } from "../contexts/WatchlistContext"
import { useTrailer } from "../contexts/TrailerContext"
import { useMovieInfo } from "../contexts/MovieInfoContext"
import type { Movie } from "../types/movie"
import { Film, Info } from "lucide-react"
import type React from "react"

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist()
  const { setTrailerKey } = useTrailer()
  const { setMovieInfo } = useMovieInfo()
  const isInWatchlist = watchlist.some((m) => m.id === movie.id)

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isInWatchlist) {
      removeFromWatchlist(movie.id)
    } else {
      addToWatchlist(movie)
    }
  }

  const handleTrailerClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (movie.trailerKey) {
      console.log("Setting trailer key:", movie.trailerKey)
      setTrailerKey(movie.trailerKey)
    } else {
      console.log("No trailer key available for this movie")
    }
  }

  const handleInfoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setMovieInfo(movie)
  }

  const imageUrl = movie.posterPath ? `https://image.tmdb.org/t/p/w500${movie.posterPath}` : "/placeholder.svg"

  return (
    <Link href={`/movie/${movie.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={movie.title}
          width={300}
          height={450}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">
            {movie.title} {movie.emoji}
          </h3>
          <p className="text-gray-600 mb-4">
            {typeof movie.genre === "string" ? movie.genre : getGenreName(movie.genre_ids[0])}
          </p>
          <div className="flex flex-col space-y-2">
            <button
              onClick={handleWatchlistClick}
              className={`py-2 px-4 rounded transition-colors duration-300 ${
                isInWatchlist
                  ? "bg-[#cf5a00] text-white hover:bg-[#ff7417]"
                  : "bg-[#ff7417] text-white hover:bg-[#cf5a00]"
              }`}
            >
              {isInWatchlist ? "Remove from Watchlist 🗑️" : "Add to Watchlist 📺"}
            </button>
            <button
              onClick={handleTrailerClick}
              className="bg-[#fae4b4] text-[#cf5a00] py-2 px-4 rounded hover:bg-[#ffb40c] transition-colors duration-300 flex items-center justify-center"
              disabled={!movie.trailerKey}
            >
              <Film className="mr-2" size={18} /> Watch Trailer
            </button>
            <button
              onClick={handleInfoClick}
              className="bg-[#fae4b4] text-[#cf5a00] py-2 px-4 rounded hover:bg-[#ffb40c] transition-colors duration-300 flex items-center justify-center"
            >
              <Info className="mr-2" size={18} /> Show Info
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

function getGenreName(genreId: number): string {
  //Implementation to get genre name from genreId
  return "Genre Name" // Placeholder
}

function getGenreEmoji(genreIdOrGenre: number | string): string {
  //Implementation to get genre emoji from genreIdOrGenre
  return "🎬" // Placeholder
}

function formatMovie(movie: any): Movie {
  return {
    id: movie.id,
    title: movie.title,
    emoji: getGenreEmoji(movie.genre_ids ? movie.genre_ids[0] : movie.genre),
    genre: movie.genre || getGenreName(movie.genre_ids[0]),
    posterPath: movie.poster_path,
    overview: movie.overview,
    releaseDate: movie.release_date,
    voteAverage: movie.vote_average,
  }
}

