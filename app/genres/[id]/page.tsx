import { Suspense } from "react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import MovieCard from "../../components/MovieCard"
import { getMoviesByGenre, getGenres } from "../../utils/tmdb"
import { notFound } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"

async function GenreMovies({ id }: { id: string }) {
  const genres = await getGenres()
  const genre = genres.find((g) => g.id === Number.parseInt(id))

  if (!genre) {
    notFound()
  }

  const movies = await getMoviesByGenre(Number.parseInt(id))

  return (
    <div className="min-h-screen bg-[#fae4b4] text-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">{genre.name} Movies 🎬</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function GenreMoviesPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<GenreMoviesSkeleton />}>
      <GenreMovies id={params.id} />
    </Suspense>
  )
}

function GenreMoviesSkeleton() {
  return (
    <div className="min-h-screen bg-[#fae4b4] text-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Skeleton className="h-12 w-64 mx-auto mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Skeleton className="h-64 w-full" />
              <div className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <Skeleton className="h-10 w-full mb-2" />
                <Skeleton className="h-10 w-full mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

