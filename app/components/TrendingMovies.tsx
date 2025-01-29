import Link from "next/link"
import MovieCard from "./MovieCard"
import type { Movie } from "../types/movie"

interface TrendingMoviesProps {
  movies: Movie[]
}

export default function TrendingMovies({ movies }: TrendingMoviesProps) {
  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">🔥 Trending Movies</h2>
        <Link
          href="/trending"
          className="bg-[#ff7417] text-white py-2 px-4 rounded hover:bg-[#cf5a00] transition-colors duration-300"
        >
          See More
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}

