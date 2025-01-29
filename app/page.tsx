import Header from "./components/Header"
import FeaturedMovie from "./components/FeaturedMovie"
import MovieRecommendations from "./components/MovieRecommendations"
import Footer from "./components/Footer"

export default async function Home() {
  return (
    <div className="min-h-screen bg-[#fae4b4] text-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">🍿 Movie Magic Recommendations 🎬</h1>
        <FeaturedMovie />
        <MovieRecommendations />
      </main>
      <Footer />
    </div>
  )
}

