"use client";

import { useContext } from "react";
import { WeatherContext } from "../Weather/WeatherProvider";

/**
 * Custom Hook: allows access to WeatherContext
 */
export function useWeather() {
  const context = useContext(WeatherContext);

  if (!context) {
    throw new Error("useWeather must be used inside a WeatherProvider");
  }

  return context;
}
