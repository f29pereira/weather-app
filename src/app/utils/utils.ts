import type { DayForecastProps } from "../components/types";

/**
 * Location data
 * @property isValid     - is the location valid
 * @property latitude    - latitude value
 * @property longitude   - longitude value
 * @property description - current place and country
 * @property date        - current date
 */
type Location = {
  isValid: boolean;
  latitude: string;
  longitude: string;
  description: string;
  date: string;
};

/**
 * Weather data
 * @property unitType          - metric or imperial unit
 * @property weatherImg        - weather icon image path
 * @property temperature       - temperature value (celsius or fahrenheit)
 * @property feels_like        - feels like temperature value (celsius or fahrenheit)
 * @property humidity          - humidity percentage
 * @property wind              - wind value (km/h or mph)
 * @property precipitation     - precipitation value (mm or in)
 * @property dailyForecastList - list of daily forecast
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
  }

  return locationData;
};

/**
 * Returns weather data in metric and imperial units
 */
export const setWeatherData = async (
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
const fetchWeatherData = async (
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
  };

  const temperatureSearchUnit = unit === "metric" ? "celsius" : "fahrenheit";
  const windSearchUnit = unit === "metric" ? "kmh" : "mph";
  const precipitationSearchUnit = unit === "metric" ? "mm" : "inch";

  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=apparent_temperature,precipitation,relativehumidity_2m&daily=temperature_2m_max,temperature_2m_min,weathercode&temperature_unit=${temperatureSearchUnit}&windspeed_unit=${windSearchUnit}&precipitation_unit=${precipitationSearchUnit}&timezone=auto`
  );

  const weatherData = await weatherRes.json(); //Open-Meteo API response

  console.log(weatherData);

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
          day: getDayOfWeek(time),
          weatherImg: getWeatherImagePath(weatherData.daily.weathercode[index]),
          maxTemp: weatherData.daily.temperature_2m_max[index] + "°",
          minTemp: weatherData.daily.temperature_2m_min[index] + "°",
        };
      }
    );
  }

  return weatherObj;
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
 * Formats current date with format: "weakday, month day, year"
 */
const getDate = (): string => {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

/**
 * Retuns short day of the week
 */
const getDayOfWeek = (date: string): string => {
  return new Date(date).toLocaleDateString("en-US", { weekday: "short" });
};

/**
 * Returns current hour with format: "YYYY-MM-DDTHH:00"
 */
const getDateAndHour = (): string => {
  return new Date().toISOString().slice(0, 13) + ":00";
};

/**
 * Returns the weather image path based of the weatherCode from Open-Meteo API
 */
const getWeatherImagePath = (weatherCode: number): string => {
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
