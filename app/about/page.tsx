import Header from "../components/Header"
import Footer from "../components/Footer"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fae4b4] text-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">About MovieMagic 🎬✨</h1>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex flex-col md:flex-row items-center mb-8">
            <Image
              src="/placeholder.svg"
              alt="MovieMagic Team"
              width={400}
              height={300}
              className="rounded-lg shadow-md mb-4 md:mb-0 md:mr-8"
            />
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Story 📚</h2>
              <p className="mb-4">
                Welcome to MovieMagic, where cinema enthusiasts unite! 🎉 Our journey began with a simple idea: to
                create a magical place for movie lovers to discover, discuss, and delight in the world of film. 🌟
              </p>
              <p>
                Founded by a group of passionate cinephiles in 2023, MovieMagic has grown into a vibrant community that
                celebrates the art of storytelling through motion pictures. 🎥❤️
              </p>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4">Our Mission 🚀</h2>
          <p className="mb-4">At MovieMagic, we're on a mission to:</p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>🔍 Help you discover your next favorite movie</li>
            <li>🌈 Showcase diverse and innovative filmmaking</li>
            <li>🤝 Foster a community of movie enthusiasts</li>
            <li>📚 Provide insightful and entertaining film content</li>
            <li>🎨 Celebrate the art and craft of cinema</li>
          </ul>
          <h2 className="text-2xl font-bold mb-4">Meet the Team 👋</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Alice Director", role: "Founder & CEO", emoji: "👩‍💼" },
              { name: "Bob Cinematographer", role: "Lead Developer", emoji: "👨‍💻" },
              { name: "Charlie Editor", role: "Content Manager", emoji: "📝" },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="bg-[#ff7417] text-white text-5xl w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  {member.emoji}
                </div>
                <h3 className="font-bold">{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

