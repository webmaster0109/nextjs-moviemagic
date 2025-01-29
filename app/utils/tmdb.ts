import type { Movie, DetailedMovie } from "../types/movie"

const TMDB_API_KEY = process.env.TMDB_API_KEY
const TMDB_API_BASE_URL = "https://api.themoviedb.org/3"

export async function getTrendingMovies(limit = 6): Promise<Movie[]> {
  const response = await fetch(`${TMDB_API_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`)
  const data = await response.json()

  return data.results.slice(0, limit).map(formatMovie)
}

export async function getGenres(): Promise<{ id: number; name: string }[]> {
  const response = await fetch(`${TMDB_API_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`)
  const data = await response.json()
  return data.genres
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const response = await fetch(
    `${TMDB_API_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`,
  )
  const data = await response.json()

  return data.results.map(formatMovie)
}

async function getMovieTrailer(movieId: number): Promise<string | null> {
  const response = await fetch(`${TMDB_API_BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`)
  const data = await response.json()
  const trailer = data.results.find((video: any) => video.type === "Trailer" && video.site === "YouTube")
  return trailer ? trailer.key : null
}

function formatMovie(movie: any): Movie {
  return {
    id: movie.id,
    title: movie.title,
    emoji: getGenreEmoji(movie.genre_ids[0]),
    genre: getGenreName(movie.genre_ids[0]),
    posterPath: movie.poster_path,
    overview: movie.overview,
    releaseDate: movie.release_date,
    voteAverage: movie.vote_average,
  }
}

function getGenreEmoji(genreId: number): string {
  const genreEmojis: { [key: number]: string } = {
    28: "💥", // Action
    35: "😂", // Comedy
    18: "🎭", // Drama
    27: "👻", // Horror
    10749: "❤️", // Romance
    878: "🚀", // Science Fiction
  }
  return genreEmojis[genreId] || "🎬"
}

function getGenreName(genreId: number): string {
  const genreNames: { [key: number]: string } = {
    28: "Action",
    35: "Comedy",
    18: "Drama",
    27: "Horror",
    10749: "Romance",
    878: "Science Fiction",
  }
  return genreNames[genreId] || "Other"
}

export async function getMovieDetails(movieId: number): Promise<DetailedMovie> {
  const [movieResponse, creditsResponse, videosResponse] = await Promise.all([
    fetch(`${TMDB_API_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`),
    fetch(`${TMDB_API_BASE_URL}/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`),
    fetch(`${TMDB_API_BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`),
  ])

  const movieData = await movieResponse.json()
  const creditsData = await creditsResponse.json()
  const videosData = await videosResponse.json()

  const trailer = videosData.results.find((video: any) => video.type === "Trailer" && video.site === "YouTube")

  return {
    id: movieData.id,
    title: movieData.title,
    overview: movieData.overview,
    releaseDate: movieData.release_date,
    genres: movieData.genres.map((genre: any) => genre.name),
    posterPath: movieData.poster_path,
    backdropPath: movieData.backdrop_path,
    voteAverage: movieData.vote_average,
    runtime: movieData.runtime,
    status: movieData.status,
    tagline: movieData.tagline,
    budget: movieData.budget,
    revenue: movieData.revenue,
    cast: creditsData.cast.slice(0, 10).map((actor: any) => ({
      id: actor.id,
      name: actor.name,
      character: actor.character,
      profilePath: actor.profile_path,
    })),
    director: creditsData.crew.find((crewMember: any) => crewMember.job === "Director")?.name,
    trailerKey: trailer ? trailer.key : null,
  }
}

export async function getDailyFeaturedMovie(): Promise<Movie> {
  const today = new Date()
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
  const response = await fetch(
    `${TMDB_API_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&sort_by=popularity.desc&page=1`,
  )
  const data = await response.json()
  const randomIndex = seed % data.results.length
  return formatMovie(data.results[randomIndex])
}

export async function getMoviesByGenre(genreId: number, page = 1): Promise<Movie[]> {
  const response = await fetch(
    `${TMDB_API_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&page=${page}`,
  )
  const data = await response.json()
  return data.results.map(formatMovie)
}

