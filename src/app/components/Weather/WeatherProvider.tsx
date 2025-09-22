"use client"; //Client component

import type { WeatherContextType, ErrorProps } from "../types";
import { createContext, useState, ReactNode } from "react";
type Props = { children: ReactNode };

export const WeatherContext = createContext<WeatherContextType | undefined>(
  undefined
);

/**
 * Provides context: WeatherContext
 */
export default function WeatherProvider({ children }: Props) {
  const [isSearching, setIsSearching] = useState(false);
  const [isLocationFound, setIsLocationFound] = useState<boolean | null>(null);
  const [error, setError] = useState<ErrorProps | null>(null);

  return (
    <WeatherContext.Provider
      value={{
        isSearching,
        setIsSearching,
        isLocationFound,
        setIsLocationFound,
        error,
        setError,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
