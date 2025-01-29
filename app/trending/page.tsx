import Header from "../components/Header"
import Footer from "../components/Footer"
import MovieCard from "../components/MovieCard"
import { getTrendingMovies } from "../utils/tmdb"

export default async function TrendingPage() {
  const trendingMovies = await getTrendingMovies(20) // Fetch 20 trending movies

  return (
    <div className="min-h-screen bg-[#fae4b4] text-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Trending Movies 🔥</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trendingMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

