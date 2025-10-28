import { render } from "@testing-library/react";
import Temperature from "@/app/components/Cards/TemperatureCard/Temperature";
import { getDate } from "@/app/utils/utils";
import { metricData, imperialData } from "../../../../fixtures/weather.fixture";
import { checkTemperature } from "../../../../helpers/weatherHelpers";
import { getSixDaysOfWeek } from "@/app/utils/weather";
import type { WeatherData } from "@/app/components/types";

/**
 * Tests for the Temperature component
 */
describe("Temperature component", () => {
  const weatherData: WeatherData = {
    description: "Setúbal, Portugal",
    date: getDate(),
    days: getSixDaysOfWeek(),
    weather: [{ ...metricData }, { ...imperialData }],
  };

  /**
   * Helper function: renders Temperature component with metric or imperial data
   */
  const renderTemperature = (weatherData: WeatherData, isMetric: boolean) => {
    const { weather } = weatherData;
    const currentWeatherUnit = isMetric ? weather[0] : weather[1]; // metric or imperial data
    const temperatureValue = currentWeatherUnit.temperature;
    const weatherImagePath = currentWeatherUnit.weatherImg;

    render(
      <Temperature
        location={weatherData.description}
        date={weatherData.date}
        weatherIconPath={weatherImagePath}
        temperature={temperatureValue}
      />
    );
  };

  it("renders the weather location, date, image and temperature value in metric units", () => {
    const isMetric = true;
    renderTemperature(weatherData, isMetric);
    checkTemperature(weatherData, isMetric);
  });

  it("renders the weather location, date, image and temperature value in imperial units", () => {
    const isMetric = false;
    renderTemperature(weatherData, isMetric);
    checkTemperature(weatherData, isMetric);
  });
});
