"use client"

import { useMovieInfo } from "../contexts/MovieInfoContext"
import { X } from "lucide-react"
import Image from "next/image"

export default function MovieInfoModal() {
  const { movieInfo, setMovieInfo } = useMovieInfo()

  if (!movieInfo) return null

  const imageUrl = movieInfo.posterPath ? `https://image.tmdb.org/t/p/w500${movieInfo.posterPath}` : "/placeholder.svg"

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setMovieInfo(null)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close movie info"
        >
          <X size={24} />
        </button>
        <div className="p-6">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 mb-4 md:mb-0">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={movieInfo.title}
                width={300}
                height={450}
                className="rounded-lg"
              />
            </div>
            <div className="md:w-2/3 md:pl-6">
              <h2 className="text-2xl font-bold mb-2">
                {movieInfo.title} {movieInfo.emoji}
              </h2>
              <p className="text-gray-600 mb-4">{movieInfo.genre}</p>
              <p className="mb-4">{movieInfo.overview}</p>
              <p className="mb-2">
                <strong>Release Date:</strong> {movieInfo.releaseDate}
              </p>
              <p>
                <strong>Rating:</strong> {movieInfo.voteAverage.toFixed(1)} / 10
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

