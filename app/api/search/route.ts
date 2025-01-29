import { NextResponse } from "next/server"
import { searchMovies } from "../../utils/tmdb"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  try {
    const movies = await searchMovies(query)
    return NextResponse.json(movies)
  } catch (error) {
    console.error("Error searching movies:", error)
    return NextResponse.json({ error: "An error occurred while searching for movies" }, { status: 500 })
  }
}

