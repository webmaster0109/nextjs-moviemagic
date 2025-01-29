import Image from "next/image"
import { getDailyFeaturedMovie } from "../utils/tmdb"
import type { Movie } from "../types/movie"
import Link from "next/link"
import { Film, Info } from "lucide-react"

export default async function FeaturedMovie() {
  const movie: Movie = await getDailyFeaturedMovie()

  return (
    <div className="bg-[#cf5a00] rounded-lg shadow-lg overflow-hidden mb-8">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
        <Link href={`/movie/${movie.id}`} className="block">
          <Image
            src={movie.posterPath ? `https://image.tmdb.org/t/p/w500${movie.posterPath}` : "/placeholder.svg"}
            alt={movie.title}
            width={300}
            height={450}
            className="h-full w-full object-cover md:w-48"
          />
        </Link>
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-[#fae4b4] font-semibold">Featured Movie 🌟</div>
          <Link href={`/movie/${movie.id}`} className="block">
            <h2 className="block mt-1 text-lg leading-tight font-medium text-white">{movie.title}</h2>
          </Link>
          <p className="mt-2 text-white">
            {movie.overview.length > 200 ? `${movie.overview.substring(0, 200)}...` : movie.overview}
          </p>
          <div className="mt-4">
            <span className="inline-block bg-[#fae4b4] rounded-full px-3 py-1 text-sm font-semibold text-[#cf5a00] mr-2 mb-2">
              {movie.genre} {movie.emoji}
            </span>
            <span className="inline-block bg-[#fae4b4] rounded-full px-3 py-1 text-sm font-semibold text-[#cf5a00] mr-2 mb-2">
              Rating: {movie.voteAverage.toFixed(1)} ⭐
            </span>
          </div>
          <div className="mt-6">
            <a href={`/movie/${movie.id}`}
              className="bg-[#fae4b4] text-[#cf5a00] py-2 px-4 rounded hover:bg-[#ffb40c] transition-colors duration-300 flex items-center justify-center"
            >
              <Info className="mr-2" size={18} /> Show Info
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

