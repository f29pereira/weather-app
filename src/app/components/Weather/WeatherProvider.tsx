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
  //indicates if the user input location coordinates have been found
  const [isLocationFound, setIsLocationFound] = useState<boolean | null>(null);

  //indicates if the weather data is loading
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //indicates if something went wrong during data fetching
  const [error, setError] = useState<ErrorProps | null>(null);

  //weather data
  const [weatherData, fetchWeatherData] = useState<WeatherData | null>(null);

  //indicates if current unit is metric
  const [isMetric, setIsMetric] = useState<boolean>(true);

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
        isMetric,
        setIsMetric,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
