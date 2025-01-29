import { Suspense } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import { getMovieDetails } from "../../utils/tmdb"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PlayCircle, Star } from "lucide-react"
import TrailerModal from "../../components/TrailerModal"

async function MovieDetails({ id }: { id: string }) {
  const movie = await getMovieDetails(Number.parseInt(id))

  if (!movie) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#fae4b4] text-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-96">
            <Image
              src={movie.backdropPath ? `https://image.tmdb.org/t/p/original${movie.backdropPath}` : "/placeholder.svg"}
              alt={movie.title}
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h1 className="text-4xl font-bold text-white text-center">{movie.title}</h1>
            </div>
          </div>
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <Image
                  src={movie.posterPath ? `https://image.tmdb.org/t/p/w500${movie.posterPath}` : "/placeholder.svg"}
                  alt={movie.title}
                  width={300}
                  height={450}
                  className="rounded-lg shadow-md"
                />
              </div>
              <div className="md:w-2/3">
                <p className="text-xl italic mb-4">{movie.tagline}</p>
                <p className="mb-4">{movie.overview}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {movie.genres.map((genre) => (
                    <Badge key={genre} variant="secondary">
                      {genre}
                    </Badge>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <strong>Release Date:</strong> {new Date(movie.releaseDate).toLocaleDateString()}
                  </div>
                  <div>
                    <strong>Runtime:</strong> {movie.runtime} minutes
                  </div>
                  <div>
                    <strong>Status:</strong> {movie.status}
                  </div>
                  <div>
                    <strong>Rating:</strong> <Star className="inline-block w-5 h-5 text-yellow-400" />{" "}
                    {movie.voteAverage.toFixed(1)}
                  </div>
                  <div>
                    <strong>Budget:</strong> ${movie.budget.toLocaleString()}
                  </div>
                  <div>
                    <strong>Revenue:</strong> ${movie.revenue.toLocaleString()}
                  </div>
                </div>
                {movie.trailerKey && (
                  <Button className="mb-4">
                    <PlayCircle className="mr-2 h-4 w-4" /> Watch Trailer
                  </Button>
                )}
                <h2 className="text-2xl font-bold mb-2">Cast</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {movie.cast.map((actor) => (
                    <div key={actor.id} className="text-center">
                      <Image
                        src={
                          actor.profilePath ? `https://image.tmdb.org/t/p/w185${actor.profilePath}` : "/placeholder.svg"
                        }
                        alt={actor.name}
                        width={100}
                        height={150}
                        className="rounded-lg mx-auto mb-2"
                      />
                      <p className="font-semibold">{actor.name}</p>
                      <p className="text-sm text-gray-600">{actor.character}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4">
                  <strong>Director:</strong> {movie.director}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function MoviePage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<MovieDetailsSkeleton />}>
      <MovieDetails id={params.id} />
    </Suspense>
  )
}

function MovieDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-[#fae4b4] text-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <Skeleton className="h-96 w-full" />
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <Skeleton className="h-[450px] w-[300px]" />
              <div className="md:w-2/3 space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-6 w-full" />
                  ))}
                </div>
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-6 w-1/4" />
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[...Array(10)].map((_, i) => (
                    <div key={i}>
                      <Skeleton className="h-[150px] w-[100px] mx-auto mb-2" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-3/4 mx-auto" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

