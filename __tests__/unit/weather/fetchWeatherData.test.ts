import { fetchWeatherData } from "@/app/utils/weather";
import { getDateAndHour, getHour, getDayOfWeek } from "@/app/utils/utils";

/**
 * Test for function: fetchWeatherData
 */
describe("fetchWeatherData function", () => {
  beforeEach(() => {
    global.fetch = jest.fn(); //fetch mock function
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const validLatitude = "38.5244";
  const validLongitude = "-8.8882";
  const dateAndHour = getDateAndHour();
  const hour = getHour(dateAndHour);
  const dayShort = getDayOfWeek(dateAndHour, "short");
  const dayLong = getDayOfWeek(dateAndHour, "long");

  // Expected metric weather data
  const metricData = {
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
  const metricMockData = {
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
  const imperialData = {
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
  const imperialMockData = {
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

  /**
   * Helper function to test fetchWeatherData for a given unit type
   */
  const testFetchWeatherData = async (
    unitType: "metric" | "imperial",
    mockData: any,
    expectedData: any
  ) => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const fetchedData = await fetchWeatherData(
      validLatitude,
      validLongitude,
      unitType
    );

    expect(fetchedData.unitType).toBe(expectedData.unitType);
    expect(fetchedData.weatherImg).toBe(expectedData.weatherImg);
    expect(fetchedData.temperature).toBe(expectedData.temperature);
    expect(fetchedData.feels_like).toBe(expectedData.feels_like);
    expect(fetchedData.humidity).toBe(expectedData.humidity);
    expect(fetchedData.wind).toBe(expectedData.wind);
    expect(fetchedData.precipitation).toBe(expectedData.precipitation);
    expect(fetchedData.dailyForecastList).toEqual(
      expectedData.dailyForecastList
    );
    expect(fetchedData.hourlyForecastList).toEqual(
      expectedData.hourlyForecastList
    );
  };

  it("returns object with weather data in metric units", async () => {
    await testFetchWeatherData("metric", metricMockData, metricData);
  });

  it("returns object with weather data in imperial units", async () => {
    await testFetchWeatherData("imperial", imperialMockData, imperialData);
  });

  it("throws an error when fetching fails", async () => {
    const error = "API error";

    global.fetch = jest.fn().mockRejectedValue(new Error(error)); //fail API response

    await expect(
      fetchWeatherData(validLatitude, validLongitude, "imperial")
    ).rejects.toThrow(error);
  });
});
