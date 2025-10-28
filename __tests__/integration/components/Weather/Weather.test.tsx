import userEvent from "@testing-library/user-event";
import Weather from "@/app/components/Weather/Weather";
import { render, screen } from "@testing-library/react";
import { WeatherContextType } from "@/app/components/types";
import { getDate } from "@/app/utils/utils";
import { getSixDaysOfWeek } from "@/app/utils/weather";
import { metricData, imperialData } from "../../../fixtures/weather.fixture";
import type { WeatherData } from "@/app/components/types";
import {
  checkTemperature,
  checkWeatherInfo,
  checkForecastList,
  checkHourlyForecastList,
} from "../../../helpers/weatherHelpers";

let useWeatherMock: WeatherContextType;

// Mock: useWeather
jest.mock("@/app/components/hooks/useWeather", () => ({
  useWeather: () => useWeatherMock,
}));

beforeEach(() => {
  useWeatherMock = {
    isLocationFound: null,
    setIsLocationFound: jest.fn(),
    isLoading: false,
    setIsLoading: jest.fn(),
    error: null,
    setError: jest.fn(),
    weatherData: null,
    setWeatherData: jest.fn(),
    isMetric: true,
    setIsMetric: jest.fn(),
  };

  global.fetch = jest.fn(); //fetch mock function
});

afterEach(() => {
  jest.clearAllMocks();
});

/**
 * Integration testing: Weather component
 */
describe("Weather component", () => {
  const day = getSixDaysOfWeek().find((day) => day.isSelected);

  /**
   * Helper function: mocks useWeather with valid API data and the current unit type
   */
  const setWeatherData = (unitType: "metric" | "imperial") => {
    useWeatherMock = {
      ...useWeatherMock,
      isLocationFound: true,
      weatherData: {
        description: "Setúbal, Portugal",
        date: getDate(),
        days: getSixDaysOfWeek(),
        weather: [{ ...metricData }, { ...imperialData }],
      },
      isMetric: unitType === "imperial",
    };
  };

  /**
   * Helper function: returns the foreCastList and hourlyForecastList for the current unit type
   */
  const getLists = (weatherData: WeatherData) => {
    const { weather } = weatherData;
    const currentWeatherUnit = useWeatherMock.isMetric
      ? weather[0]
      : weather[1]; // metric or imperial data

    const dailyForecastList = currentWeatherUnit.dailyForecastList;
    const hourlyForecastList = currentWeatherUnit.hourlyForecastList;

    return { dailyForecastList, hourlyForecastList };
  };

  it("renders message when the location is not found", async () => {
    useWeatherMock = { ...useWeatherMock, isLocationFound: false };

    render(<Weather />);

    const search = screen.getByLabelText(/search/i);
    const submitButton = screen.getByRole("button", {
      name: "Search",
    });

    await userEvent.type(search, "S"); // User: inputs invalid location
    expect(search).toHaveValue("S"); // Check search input value
    await userEvent.click(submitButton); // User: clicks the submit button

    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({}), // Invalid location
    });

    const notFoundMsg = screen.getByText(/No search result found!/i);

    // Check no result message existence
    expect(notFoundMsg).toBeInTheDocument();
  });

  it("renders the Error component when the API fetch fails", () => {
    const errorTitle = "Something went wrong";
    const errorMessage =
      "We couldn't connect to the server (API error). Please try again in a few moments.";

    useWeatherMock = {
      ...useWeatherMock,
      isLocationFound: true,
      error: {
        title: errorTitle,
        message: errorMessage,
      },
    };

    const error = "API error";
    global.fetch = jest.fn().mockRejectedValue(new Error(error)); //fail API response

    render(<Weather />);

    const title = screen.getByRole("heading", {
      level: 1,
      name: new RegExp(errorTitle, "i"),
    });
    const message = screen.getByText(errorMessage);
    const button = screen.getByRole("button", {
      name: "Retry",
    });

    // Check elements existence
    expect(title).toBeInTheDocument();
    expect(message).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("renders all weather related components (Temperature, WeatherInfo, ForecastList and HourlyForecastList) with valid API data in metric units", () => {
    setWeatherData("metric");

    const data = useWeatherMock.weatherData!;
    const { dailyForecastList, hourlyForecastList } = getLists(data);

    render(<Weather />);

    checkTemperature(data, useWeatherMock.isMetric);
    checkWeatherInfo(data, useWeatherMock.isMetric);
    checkForecastList(dailyForecastList);
    checkHourlyForecastList(hourlyForecastList, day);
  });

  it("renders all weather related components (Temperature, WeatherInfo, ForecastList and HourlyForecastList) with valid API data in imperial units", () => {
    setWeatherData("imperial");

    const data = useWeatherMock.weatherData!;
    const { dailyForecastList, hourlyForecastList } = getLists(data);

    render(<Weather />);

    checkTemperature(data, useWeatherMock.isMetric);
    checkWeatherInfo(data, useWeatherMock.isMetric);
    checkForecastList(dailyForecastList);
    checkHourlyForecastList(hourlyForecastList, day);
  });
});
