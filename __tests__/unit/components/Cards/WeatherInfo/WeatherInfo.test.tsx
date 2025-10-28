import { render, screen } from "@testing-library/react";
import WeatherInfo from "@/app/components/Cards/WeatherInfo/WeatherInfo";
import { checkWeatherInfo } from "../../../../helpers/weatherHelpers";
import { getDate } from "@/app/utils/utils";
import { getSixDaysOfWeek } from "@/app/utils/weather";
import { metricData, imperialData } from "../../../../fixtures/weather.fixture";
import type { WeatherData } from "@/app/components/types";

/**
 * Tests for the WeatherInfo component
 */
describe("WeatherInfo component", () => {
  const weatherData: WeatherData = {
    description: "Setúbal, Portugal",
    date: getDate(),
    days: getSixDaysOfWeek(),
    weather: [{ ...metricData }, { ...imperialData }],
  };

  /**
   * Helper function: renders WeatherInfo component with metric or imperial data
   */
  const renderWeatherInfo = (weatherData: WeatherData, isMetric: boolean) => {
    const { weather } = weatherData;
    const currentWeatherUnit = isMetric ? weather[0] : weather[1]; // metric or imperial data
    const feelTemperature = currentWeatherUnit.feels_like;
    const humidity = currentWeatherUnit.humidity;
    const wind = currentWeatherUnit.wind;
    const precipitation = currentWeatherUnit.precipitation;

    render(
      <WeatherInfo
        feelTemperature={feelTemperature}
        humidity={humidity}
        wind={wind}
        precipitation={precipitation}
      />
    );
  };

  it("renders the values for feels like temperature, humidity, wind and precipitation in metric units", () => {
    const isMetric = true;
    renderWeatherInfo(weatherData, isMetric);
    checkWeatherInfo(weatherData, isMetric);
  });

  it("renders the values for feels like temperature, humidity, wind and precipitation in imperial units", () => {
    const isMetric = false;
    renderWeatherInfo(weatherData, isMetric);
    checkWeatherInfo(weatherData, isMetric);
  });
});
