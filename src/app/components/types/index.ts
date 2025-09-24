import type { Weather } from "@/app/utils/utils";

/**
 * Props for the UnitOption component
 * @property text        - unit description
 * @property isSelected  - is the unit selected
 */
export type UnitOptionProps = {
  text: string;
  isSelected: boolean;
};

/**
 * Props for the Temperature component
 * @property location        - location
 * @property date            - current date
 * @property weatherIconPath - weather icon image path
 * @property temperature     - temperature value
 */
export type TemperatureProps = {
  location: string;
  date: string;
  weatherIconPath: string;
  temperature: string;
};

/**
 * Props for the WeatherInfo component
 * @property feelTemperature - feels like temperature value
 * @property humidity        - humidity value
 * @property precipitation    - precipitation value
 */
export type WeatherInfoProps = {
  feelTemperature: string;
  humidity: string;
  wind: string;
  precipitation: string;
};

/**
 * Props for the DayForeCast component
 * @property day        - day of the week description
 * @property weatherImg - weather icon image path
 * @property maxTemp    - maximum daily temperature
 * @property minTemp    - minimum daily temperature
 */
export type DayForecastProps = {
  day: string;
  weatherImg: string;
  maxTemp: string;
  minTemp: string;
};

/**
 * Props for the ForeCastList component
 * @property forecastList  - list of DayForeCast components
 */
export type ForecastListProps = {
  forecastList: DayForecastProps[];
};

/**
 * Props for the HourForecast component
 */

/**
 * Props for the HourForecast component
 * @property weatherImg  - weather icon image path
 * @property hour        - hour value
 * @property temperature - temperature value
 */
export type HourForecastProps = {
  weatherImg: string;
  hour: string;
  temperature: string;
};

/**
 * Props for the HourlyForecastList component
 */

/**
 * Props for the HourlyForecastList component
 * @property hourlyForecastList  - list of HourForecast components
 */
export type HourlyForecastListProps = {
  hourlyForecastList: HourForecastProps[];
};

/**
 * Props for the Error component
 * @property title   - error title
 * @property message - error message
 */
export type ErrorProps = {
  title: string;
  message: string;
};

/**
 * WeatherContext
 * @property isLocationFound    - indicates if the user input location coordinates have been found
 * @property setIsLocationFound - isLocationFound setter function
 *
 * @property isLoading          - indicates if the weather data is loading
 * @property setIsLoading       - isLoading setter function
 *
 * @property error              - indicates if something went wrong during data fetching
 * @property setError           - error setter function
 *
 * @property weatherData        - fetched weather data
 * @property fetchWeatherData   - weatherData setter function
 *
 * @property isMetric           - indicates if current unit is metric
 * @property setIsMetric        - isMetric setter function
 */
export type WeatherContextType = {
  isLocationFound: boolean | null;
  setIsLocationFound: React.Dispatch<React.SetStateAction<boolean | null>>;

  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;

  error: ErrorProps | null;
  setError: React.Dispatch<React.SetStateAction<ErrorProps | null>>;

  weatherData: WeatherData | null;
  fetchWeatherData: React.Dispatch<React.SetStateAction<WeatherData | null>>;

  isMetric: boolean;
  setIsMetric: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * Weather data
 * @property description - location description
 * @property date        - current date
 * @property weather     - weather data
 */
export type WeatherData = {
  description: string;
  date: string;
  weather: Weather[];
};
