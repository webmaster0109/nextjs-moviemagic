"use client"

import { useWatchlist } from "../contexts/WatchlistContext"
import MovieCard from "../components/MovieCard"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Watchlist() {
  const { watchlist } = useWatchlist()

  return (
    <div className="min-h-screen bg-[#fae4b4] text-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">🎬 Your Watchlist 📋</h1>
        {watchlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {watchlist.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="text-center text-xl">Your watchlist is empty. Start adding some movies! 🍿</p>
        )}
      </main>
      <Footer />
    </div>
  )
}

