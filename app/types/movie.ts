export interface Movie {
  id: number
  title: string
  emoji: string
  genre: string
  posterPath?: string
  trailerKey?: string | null
  overview: string
  releaseDate: string
  voteAverage: number
}

export interface DetailedMovie extends Omit<Movie, "emoji" | "genre"> {
  genres: string[]
  backdropPath?: string
  runtime: number
  status: string
  tagline: string
  budget: number
  revenue: number
  cast: {
    id: number
    name: string
    character: string
    profilePath?: string
  }[]
  director: string
}

