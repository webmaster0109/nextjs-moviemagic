"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import { useTrailer } from "../contexts/TrailerContext"

export default function TrailerModal() {
  const { trailerKey, setTrailerKey } = useTrailer()

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setTrailerKey(null)
      }
    }

    if (trailerKey) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [trailerKey, setTrailerKey])

  if (!trailerKey) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
        <button
          onClick={() => setTrailerKey(null)}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 focus:outline-none"
          aria-label="Close trailer"
        >
          <X size={24} />
        </button>
        <div className="w-full h-full">
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-full rounded-lg"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

