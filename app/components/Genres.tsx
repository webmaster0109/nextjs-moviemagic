import Link from "next/link"

interface GenresProps {
  genres: { id: number; name: string }[]
}

export default function Genres({ genres }: GenresProps) {
  return (
    <section className="mb-8">
      <h2 className="text-3xl font-bold mb-4">Genres</h2>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <Link
            key={genre.id}
            href={`/genre/${genre.id}`}
            className="bg-[#ff7417] text-white py-2 px-4 rounded-full hover:bg-[#cf5a00] transition-colors duration-300"
          >
            {genre.name}
          </Link>
        ))}
      </div>
    </section>
  )
}

