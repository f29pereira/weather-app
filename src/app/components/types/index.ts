import type { Weather } from "@/app/utils/utils";

/**
 * Props for the UnitOption component
 */
export type UnitOptionProps = {
  //Unit description
  text: string;

  //Is Unit selected
  isSelected: boolean;
};

/**
 * Props for the Temperature component
 */
export type TemperatureProps = {
  //location
  location: string;

  //date
  date: string;

  //weather icon path
  weatherIconPath: string;

  //temperature value
  temperature: string;
};

/**
 * Props for the Info component
 */
export type WeatherInfoProps = {
  //feels like temperature value
  feelTemperature: string;

  //humidity
  humidity: string;

  //wind
  wind: string;

  //precipitation
  precipitation: string;
};

/**
 * Props for the DayForeCast component
 */
export type DayForecastProps = {
  //day of the week
  day: string;

  //weather icon path
  imgTemp: string;

  //max temperature
  maxTemp: string;

  //min temperature
  minTemp: string;
};

/**
 * Props for the ForeCastList component
 */
export type ForecastListProps = {
  //list of DayForeCast components
  forecastList: DayForecastProps[];
};

/**
 * Props for the HourForecast component
 */
export type HourForecastProps = {
  //weather icon path
  imgTemp: string;

  //hour
  hour: string;

  //temperature
  temperature: string;
};

/**
 * Props for the HourlyForecastList component
 */
export type HourlyForecastListProps = {
  //list of HourForecast components
  hourlyForecastList: HourForecastProps[];
};

/**
 * Props for the Error component
 */
export type ErrorProps = {
  //error title
  title: string;

  //error message
  message: string;
};

/**
 * WeatherContext
 */
export type WeatherContextType = {
  //indicates if the user input location coordinates have been found
  isLocationFound: boolean | null;
  setIsLocationFound: React.Dispatch<React.SetStateAction<boolean | null>>;

  //indicates if the weather data is loading
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;

  //indicates if something went wrong during data fetching
  error: ErrorProps | null;
  setError: React.Dispatch<React.SetStateAction<ErrorProps | null>>;

  //weather data
  weatherData: WeatherData | null;
  fetchWeatherData: React.Dispatch<React.SetStateAction<WeatherData | null>>;
};

/**
 * Weather data
 */
export type WeatherData = {
  description: string;
  date: string;

  weather: Weather[];

  //TO DO - daily forecast
  //TO DO - hourly forecast
};
