import type { Weather } from "@/app/utils/weather";
import {
  getDateAndHour,
  getNextDateAndHour,
  getHour,
  getDayOfWeek,
} from "@/app/utils/utils";

const currentDate = getDateAndHour();
const currentHour = getHour(currentDate);
const currentDayShort = getDayOfWeek(currentDate, "short");
const currentDayLong = getDayOfWeek(currentDate, "long");
const nextDate = getNextDateAndHour(currentDate);
const nextDayShort = getDayOfWeek(nextDate, "short");

/**
 * Mocked data: daily forecast list in metric units
 */
export const foreCastListMetric = [
  {
    day: currentDayShort,
    weatherImg: "/images/icons/icon-sunny.webp",
    maxTemp: "20°",
    minTemp: "15°",
  },
  {
    day: nextDayShort,
    weatherImg: "/images/icons/icon-partly-cloudy.webp",
    maxTemp: "20°",
    minTemp: "14°",
  },
];

/**
 * Mocked data: daily forecast list in imperial units
 */
export const foreCastListImperial = [
  {
    day: currentDayShort,
    weatherImg: "/images/icons/icon-sunny.webp",
    maxTemp: "68°",
    minTemp: "59°",
  },
  {
    day: nextDayShort,
    weatherImg: "/images/icons/icon-partly-cloudy.webp",
    maxTemp: "68°",
    minTemp: "57.2°",
  },
];

/**
 * Mocked data: hourly forecast list in metric units
 */
export const hourlyForecastListMetric = [
  {
    id: "0",
    day: currentDayLong,
    weatherImg: "/images/icons/icon-sunny.webp",
    hour: currentHour,
    temperature: "26°",
  },
  {
    id: "1",
    day: currentDayLong,
    weatherImg: "/images/icons/icon-partly-cloudy.webp",
    hour: currentHour,
    temperature: "18°",
  },
];

/**
 * Mocked data: hourly forecast list in imperial units
 */
export const hourlyForecastListImperial = [
  {
    id: "0",
    day: currentDayLong,
    weatherImg: "/images/icons/icon-sunny.webp",
    hour: currentHour,
    temperature: "78.8°",
  },
  {
    id: "1",
    day: currentDayLong,
    weatherImg: "/images/icons/icon-partly-cloudy.webp",
    hour: currentHour,
    temperature: "64.4°",
  },
];

/**
 * Mocked data: expected weather data in metric units
 */
export const metricData: Weather = {
  unitType: "metric",
  weatherImg: "/images/icons/icon-sunny.webp",
  temperature: "27.3°",
  feels_like: "20°",
  humidity: "50%",
  wind: "2.3 km/h",
  precipitation: "0 mm",
  dailyForecastList: foreCastListMetric,
  hourlyForecastList: hourlyForecastListMetric,
};

/**
 * Mocked data: API response in metric units
 */
export const metricAPIResponse = {
  unitType: "metric",
  hourly: {
    time: [currentDate, currentDate],
    apparent_temperature: [20, 20],
    relativehumidity_2m: [50, 50],
    precipitation: [0, 0],
    temperature_2m: [26, 18],
    weathercode: [0, 1],
  },
  current_weather: {
    temperature: 27.3,
    windspeed: 2.3,
    weathercode: 0,
  },
  daily: {
    time: [currentDate, nextDate],
    weathercode: [0, 1],
    temperature_2m_max: [20, 20],
    temperature_2m_min: [15, 14],
  },
};

/**
 * Mocked data: expected weather data in imperial units
 */
export const imperialData: Weather = {
  unitType: "imperial",
  weatherImg: "/images/icons/icon-sunny.webp",
  temperature: "81.14°",
  feels_like: "68°",
  humidity: "50%",
  wind: "1.42 mph",
  precipitation: "0 in",
  dailyForecastList: foreCastListImperial,
  hourlyForecastList: hourlyForecastListImperial,
};

/**
 * Mocked data: API response in imperial units
 */
export const imperialAPIResponse = {
  unitType: "imperial",
  hourly: {
    time: [currentDate, currentDate],
    apparent_temperature: [68, 68],
    relativehumidity_2m: [50, 50],
    precipitation: [0, 0],
    temperature_2m: [78.8, 64.4],
    weathercode: [0, 1],
  },
  current_weather: {
    temperature: 81.14,
    windspeed: 1.42,
    weathercode: 0,
  },
  daily: {
    time: [currentDate, nextDate],
    weathercode: [0, 1],
    temperature_2m_max: [68, 68],
    temperature_2m_min: [59, 57.2],
  },
};
