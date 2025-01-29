import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-[#ff7417] text-white py-4">
      <nav className="container mx-auto px-4 flex flex-wrap justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          🎥 MovieMagic
        </Link>
        <ul className="flex flex-wrap space-x-4 mt-4 sm:mt-0">
          <li>
            <Link href="/" className="hover:text-[#fae4b4]">
              Home 🏠
            </Link>
          </li>
          <li>
            <Link href="/genres" className="hover:text-[#fae4b4]">
              Genres 🎭
            </Link>
          </li>
          <li>
            <Link href="/trending" className="hover:text-[#fae4b4]">
              Trending 🔥
            </Link>
          </li>
          <li>
            <Link href="/watchlist" className="hover:text-[#fae4b4]">
              Watchlist 📋
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

