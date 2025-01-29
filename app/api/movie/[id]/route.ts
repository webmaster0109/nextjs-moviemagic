import { NextResponse } from "next/server"
import { getMovieDetails } from "../../../utils/tmdb"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    const movie = await getMovieDetails(Number.parseInt(id))
    return NextResponse.json(movie)
  } catch (error) {
    console.error("Error fetching movie details:", error)
    return NextResponse.json({ error: "An error occurred while fetching movie details" }, { status: 500 })
  }
}

