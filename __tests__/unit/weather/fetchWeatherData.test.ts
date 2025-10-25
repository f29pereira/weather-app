import { fetchWeatherData } from "@/app/utils/weather";
import {
  metricData,
  metricMockData,
  imperialData,
  imperialMockData,
} from "../../fixtures/weather.fixture";

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
