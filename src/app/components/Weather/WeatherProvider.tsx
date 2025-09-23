"use client"; //Client component

import type { WeatherContextType, ErrorProps, WeatherData } from "../types";
import { createContext, useState, ReactNode } from "react";
type Props = { children: ReactNode };

export const WeatherContext = createContext<WeatherContextType | undefined>(
  undefined
);

/**
 * Provides context: WeatherContext
 */
export default function WeatherProvider({ children }: Props) {
  const [isLocationFound, setIsLocationFound] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorProps | null>(null);
  const [weatherData, fetchWeatherData] = useState<WeatherData | null>(null);

  return (
    <WeatherContext.Provider
      value={{
        isLocationFound,
        setIsLocationFound,
        isLoading,
        setIsLoading,
        error,
        setError,
        weatherData,
        fetchWeatherData,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
