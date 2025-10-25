import userEvent from "@testing-library/user-event";
import Weather from "@/app/components/Weather/Weather";
import { render, screen } from "@testing-library/react";
import { WeatherContextType } from "@/app/components/types";
import { getDate } from "@/app/utils/utils";
import { getSixDaysOfWeek } from "@/app/utils/weather";
import { metricData, imperialData } from "../../../fixtures/weather.fixture";

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
  });

  it("renders all weather related components (Temperature, WeatherInfo, ForecastList and HourlyForecastList) with valid API data", () => {
    useWeatherMock = {
      ...useWeatherMock,
      isLocationFound: true,
      weatherData: {
        description: "Setúbal, Portugal",
        date: getDate(),
        days: getSixDaysOfWeek(),
        weather: [{ ...metricData }, { ...imperialData }],
      },
    };

    render(<Weather />);

    // Temperature component
    const location = screen.getByRole("heading", {
      level: 2,
      name: useWeatherMock.weatherData?.description,
    });

    const weatherInfo = useWeatherMock.weatherData!.weather[0];

    // WeatherInfo component
    const feelTemperatureValue = weatherInfo.feels_like;
    const feelTemperature = screen.getByText(feelTemperatureValue);

    // ForecastList component
    const dayValue = weatherInfo.dailyForecastList[0].day;
    const day = screen.getByRole("heading", {
      level: 3,
      name: new RegExp(dayValue, "i"),
    });

    //HourlyForecastList component
    const title = screen.getByRole("heading", {
      level: 3,
      name: /Hourly forecast/i,
    });
    const hourValue = weatherInfo.hourlyForecastList[0].hour;
    const hour = screen.getByText(new RegExp(hourValue, "i"));

    // Check Temperature component existence
    expect(location).toBeInTheDocument();

    // Check WeatherInfo component existence
    expect(feelTemperature).toBeInTheDocument();

    // Check ForecastList component  existence
    expect(day).toBeInTheDocument();

    // Check HourlyForecastList component existence
    expect(title).toBeInTheDocument();
    expect(hour).toBeInTheDocument();
  });
});
