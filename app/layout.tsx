import "./globals.css"
import { Inter } from "next/font/google"
import { WatchlistProvider } from "./contexts/WatchlistContext"
import { TrailerProvider } from "./contexts/TrailerContext"
import { MovieInfoProvider } from "./contexts/MovieInfoContext"
import TrailerModal from "./components/TrailerModal"
import MovieInfoModal from "./components/MovieInfoModal"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Movie Magic Recommendations",
  description: "Find your next favorite movie!",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WatchlistProvider>
          <TrailerProvider>
            <MovieInfoProvider>
              {children}
              <TrailerModal />
              <MovieInfoModal />
            </MovieInfoProvider>
          </TrailerProvider>
        </WatchlistProvider>
      </body>
    </html>
  )
}

