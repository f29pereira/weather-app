import type { DayForecastProps, HourForecastProps } from "../components/types";
import { getDate, getDayOfWeek, getHour, getDateAndHour } from "./utils";

/**
 * Location data
 * @property isValid     - is the location valid
 * @property latitude    - latitude value
 * @property longitude   - longitude value
 * @property description - current place and country
 * @property date        - current date with "weakday, month day, year" format
 * @property days        - current day of the week and next 6 days
 */
type Location = {
  isValid: boolean;
  latitude: string;
  longitude: string;
  description: string;
  date: string;
  days: Day[];
};

/**
 * Weather data
 * @property unitType           - metric or imperial unit
 * @property weatherImg         - weather icon image path
 * @property temperature        - temperature value (celsius or fahrenheit)
 * @property feels_like         - feels like temperature value (celsius or fahrenheit)
 * @property humidity           - humidity percentage
 * @property wind               - wind value (km/h or mph)
 * @property precipitation      - precipitation value (mm or in)
 * @property dailyForecastList  - list of daily forecast
 * @property days               - week days
 * @property hourlyForecastList - list of hourly forecast
 */
export type Weather = {
  unitType: "metric" | "imperial" | "";
  weatherImg: string;
  temperature: string;
  feels_like: string;
  humidity: string;
  wind: string;
  precipitation: string;
  dailyForecastList: DayForecastProps[];
  hourlyForecastList: HourForecastProps[];
};

/**
 * Day of the Week
 * @property name       - day of the week name
 * @property isSelected - is the day of the week selected
 */
export type Day = {
  name: string;
  isSelected: boolean;
};

/**
 * Returns data for a given location using geocoding-api from Open-Meteo
 */
export const fetchLocation = async (location: string): Promise<Location> => {
  const locationData: Location = {
    isValid: false,
    latitude: "",
    longitude: "",
    description: "",
    date: "",
    days: [],
  };

  const encodedLocation = encodeURIComponent(location); //location enconding

  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodedLocation}&count=1`
  ); //fetches first match result

  const geoLocation = await geoRes.json(); //geocoding-api response

  if (geoLocation.results) {
    const result = geoLocation.results[0];

    locationData.isValid = true;
    locationData.latitude = result.latitude;
    locationData.longitude = result.longitude;
    locationData.description = result.name + ", " + result.country;
    locationData.date = getDate();
    locationData.days = getSixDaysOfWeek();
  }

  return locationData;
};

/**
 * Returns weather data in metric and imperial units
 */
export const getWeather = async (
  latitude: string,
  longitude: string
): Promise<Weather[]> => {
  const [metricWeather, imperialWeather] = await Promise.all([
    fetchWeatherData(latitude, longitude, "metric"),
    fetchWeatherData(latitude, longitude, "imperial"),
  ]);

  const weatherList: Weather[] = [
    {
      ...metricWeather,
    },
    {
      ...imperialWeather,
    },
  ];

  return weatherList;
};

/**
 * Fetches weather data from Open-Meteo API
 */
export const fetchWeatherData = async (
  latitude: string,
  longitude: string,
  unit: "metric" | "imperial"
): Promise<Weather> => {
  const weatherObj: Weather = {
    unitType: "",
    weatherImg: "",
    temperature: "",
    feels_like: "",
    humidity: "",
    wind: "",
    precipitation: "",
    dailyForecastList: [],
    hourlyForecastList: [],
  };

  const temperatureSearchUnit = unit === "metric" ? "celsius" : "fahrenheit";
  const windSearchUnit = unit === "metric" ? "kmh" : "mph";
  const precipitationSearchUnit = unit === "metric" ? "mm" : "inch";

  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,weathercode,apparent_temperature,precipitation,relativehumidity_2m&daily=temperature_2m_max,temperature_2m_min,weathercode&temperature_unit=${temperatureSearchUnit}&windspeed_unit=${windSearchUnit}&precipitation_unit=${precipitationSearchUnit}&timezone=auto&forecast_days=7`
  );

  const weatherData = await weatherRes.json(); //Open-Meteo API response

  if (weatherData) {
    weatherObj.unitType = unit;

    //get current hour index
    const hourIndex = weatherData.hourly.time.indexOf(getDateAndHour());

    //weather image
    const weatherCode = weatherData.current_weather.weathercode;
    weatherObj.weatherImg = getWeatherImagePath(weatherCode);

    //temperature
    weatherObj.temperature = weatherData.current_weather.temperature + "°";

    //feels like temperature (current hour)
    weatherObj.feels_like =
      weatherData.hourly.apparent_temperature[hourIndex] + "°";

    //humidity (current hour)
    weatherObj.humidity =
      weatherData.hourly.relativehumidity_2m[hourIndex] + "%";

    //wind
    const windUnit = unit === "metric" ? " km/h" : " mph";
    weatherObj.wind = weatherData.current_weather.windspeed + windUnit;

    //precipitation (current hour)
    const precipitationUnit = unit === "metric" ? " mm" : " in";
    weatherObj.precipitation =
      weatherData.hourly.precipitation[hourIndex] + precipitationUnit;

    //daily forecast
    weatherObj.dailyForecastList = weatherData.daily.time.map(
      (time: string, index: number) => {
        return {
          day: getDayOfWeek(time, "short"),
          weatherImg: getWeatherImagePath(weatherData.daily.weathercode[index]),
          maxTemp: weatherData.daily.temperature_2m_max[index] + "°",
          minTemp: weatherData.daily.temperature_2m_min[index] + "°",
        };
      }
    );

    //hourly forecast
    weatherObj.hourlyForecastList = weatherData.hourly.time.map(
      (time: string, index: number) => {
        return {
          id: index.toString(),
          day: getDayOfWeek(time, "long"),
          weatherImg: getWeatherImagePath(
            weatherData.hourly.weathercode[index]
          ),
          hour: getHour(time),
          temperature: weatherData.hourly.temperature_2m[index] + "°",
        };
      }
    );
  }

  return weatherObj;
};

/**
 * Returns the current week day plus the next 6 days
 */
export const getSixDaysOfWeek = (): Day[] => {
  const days: Day[] = [];

  const currentDay = new Date();

  days.push({
    name: getDayOfWeek(currentDay.toISOString(), "long"),
    isSelected: true, //current day is selected as default
  });

  for (let i = 1; i <= 6; i++) {
    const nextDay = new Date(currentDay);

    nextDay.setDate(currentDay.getDate() + i); //update next day date

    days.push({
      name: getDayOfWeek(nextDay.toISOString(), "long"),
      isSelected: false,
    });
  }

  return days;
};

/**
 * Returns daily forecast list for loading state
 */
export const getLoadingDailyForecast = (): DayForecastProps[] => {
  const dummyDaily: DayForecastProps = {
    day: "",
    weatherImg: "",
    maxTemp: "",
    minTemp: "",
  };

  const forecastList: DayForecastProps[] = [];

  for (let index = 1; index <= 7; index++) {
    forecastList.push(dummyDaily);
  }

  return forecastList;
};

/**
 * Returns hourly forecast list for loading state
 */
export const getLoadingHourlyForecast = (): HourForecastProps[] => {
  const dummyHourly: HourForecastProps = {
    id: "",
    day: "",
    weatherImg: "",
    hour: "",
    temperature: "",
  };

  const hourlyList: HourForecastProps[] = [];

  for (let index = 1; index <= 8; index++) {
    hourlyList.push(dummyHourly);
  }

  return hourlyList;
};

/**
 * Returns the weather image path based of the weatherCode from Open-Meteo API
 */
export const getWeatherImagePath = (weatherCode: number): string => {
  switch (weatherCode) {
    //clear sky
    case 0:
      return "images/icons/icon-sunny.webp";

    //partly cloudy
    case 1:
    case 2:
      return "images/icons/icon-partly-cloudy.webp";

    //overcast
    case 3:
      return "images/icons/icon-overcast.webp";

    //fog
    case 45:
    case 46:
      return "images/icons/icon-fog.webp";

    //drizzle
    case 51:
    case 53:
    case 55:
      return "images/icons/icon-drizzle.webp";

    //Rain
    case 61:
    case 63:
    case 65:
    case 80:
    case 81:
    case 82:
      return "images/icons/icon-rain.webp";

    //snow fall
    case 71:
    case 73:
    case 75:
      return "images/icons/icon-snow.webp";

    //thunderstorm
    case 95:
    case 96:
    case 99:
      return "images/icons/icon-storm.webp";

    default:
      return "";
  }
};

/**
 * Returns the weather image name from the given path
 */
export const getImageName = (path: string): string => {
  const regex = /icon-[\w-]+/i;
  const match = path.match(regex);

  return match ? match[0] : "";
};

/**
 * Returns the weather description from the given image path
 */
export const getWeatherDescription = (path: string): string => {
  const regex = /icon-(.*)\.[^.]+$/;
  const match = path.match(regex);

  return match ? match[1].replace(/-/g, " ") : "";
};
