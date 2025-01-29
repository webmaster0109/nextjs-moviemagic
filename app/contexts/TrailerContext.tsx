"use client"

import type React from "react"
import { createContext, useState, useContext, type ReactNode, useCallback } from "react"

interface TrailerContextType {
  trailerKey: string | null
  setTrailerKey: (key: string | null) => void
}

const TrailerContext = createContext<TrailerContextType | undefined>(undefined)

export const TrailerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [trailerKey, setTrailerKeyState] = useState<string | null>(null)

  const setTrailerKey = useCallback((key: string | null) => {
    console.log("Setting trailer key:", key)
    setTrailerKeyState(key)
  }, [])

  return <TrailerContext.Provider value={{ trailerKey, setTrailerKey }}>{children}</TrailerContext.Provider>
}

export const useTrailer = () => {
  const context = useContext(TrailerContext)
  if (context === undefined) {
    throw new Error("useTrailer must be used within a TrailerProvider")
  }
  return context
}

