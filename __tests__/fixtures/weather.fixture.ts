import { getDateAndHour, getHour, getDayOfWeek } from "@/app/utils/utils";
import type { Weather } from "@/app/utils/weather";

const dateAndHour = getDateAndHour();
const hour = getHour(dateAndHour);
const dayShort = getDayOfWeek(dateAndHour, "short");
const dayLong = getDayOfWeek(dateAndHour, "long");

// Expected metric weather data
export const metricData: Weather = {
  unitType: "metric",
  weatherImg: "/images/icons/icon-sunny.webp",
  temperature: "27.3°",
  feels_like: "20°",
  humidity: "50%",
  wind: "2.3 km/h",
  precipitation: "0 mm",
  dailyForecastList: [
    {
      day: dayShort,
      weatherImg: "/images/icons/icon-sunny.webp",
      maxTemp: "26°",
      minTemp: "15°",
    },
  ],
  hourlyForecastList: [
    {
      day: dayLong,
      weatherImg: "/images/icons/icon-sunny.webp",
      hour: hour,
      temperature: "26°",
    },
  ],
};

// Metric mock API response
export const metricMockData = {
  unitType: "metric",
  hourly: {
    time: [dateAndHour],
    apparent_temperature: [20],
    relativehumidity_2m: [50],
    precipitation: [0],
    temperature_2m: [26],
    weathercode: [0],
  },
  current_weather: {
    temperature: 27.3,
    windspeed: 2.3,
    weathercode: 0,
  },
  daily: {
    time: [dateAndHour],
    weathercode: [0],
    temperature_2m_max: [26],
    temperature_2m_min: [15],
  },
};

// Expected imperial weather data
export const imperialData: Weather = {
  unitType: "imperial",
  weatherImg: "/images/icons/icon-sunny.webp",
  temperature: "81.14°",
  feels_like: "68°",
  humidity: "50%",
  wind: "1.42 mph",
  precipitation: "0 in",
  dailyForecastList: [
    {
      day: dayShort,
      weatherImg: "/images/icons/icon-sunny.webp",
      maxTemp: "78.8°",
      minTemp: "59°",
    },
  ],
  hourlyForecastList: [
    {
      day: dayLong,
      weatherImg: "/images/icons/icon-sunny.webp",
      hour: hour,
      temperature: "78.8°",
    },
  ],
};

// Imperial mock API response
export const imperialMockData = {
  unitType: "imperial",
  hourly: {
    time: [dateAndHour],
    apparent_temperature: [68],
    relativehumidity_2m: [50],
    precipitation: [0],
    temperature_2m: [78.8],
    weathercode: [0],
  },
  current_weather: {
    temperature: 81.14,
    windspeed: 1.42,
    weathercode: 0,
  },
  daily: {
    time: [dateAndHour],
    weathercode: [0],
    temperature_2m_max: [78.8],
    temperature_2m_min: [59],
  },
};
