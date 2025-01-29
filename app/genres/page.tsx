import Header from "../components/Header"
import Footer from "../components/Footer"
import { getGenres } from "../utils/tmdb"
import Link from "next/link"

export default async function GenresPage() {
  const genres = await getGenres()

  return (
    <div className="min-h-screen bg-[#fae4b4] text-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Movie Genres 🎭</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {genres.map((genre) => (
            <Link
              key={genre.id}
              href={`/genres/${genre.id}`}
              className="bg-[#ff7417] text-white py-4 px-6 rounded-lg text-center hover:bg-[#cf5a00] transition-colors duration-300"
            >
              {genre.name}
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

