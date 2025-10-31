import { screen, within } from "@testing-library/react";
import type {
  DayForecastProps,
  HourForecastProps,
} from "@/app/components/types";
import type { WeatherData } from "@/app/components/types";
import type { Day } from "@/app/utils/weather";
import { getImageName } from "@/app/utils/weather";

/**
 * Helper function: checks Temperature component elements/values existence
 */
export const checkTemperature = (
  weatherData: WeatherData,
  isMetricUnit: boolean = true
) => {
  const { description, date, weather } = weatherData;
  const currentWeatherUnit = isMetricUnit ? weather[0] : weather[1]; // metric or imperial data

  // Main container
  const temperatureContainer = screen.getByRole("region", { name: "Weather" });

  // Values
  const location = within(temperatureContainer).getByText(description);
  const dateValue = within(temperatureContainer).getByText(
    new RegExp(date, "i")
  );

  const weatherIconName = getImageName(currentWeatherUnit.weatherImg);
  const image = within(temperatureContainer).getByTestId("weather-icon");

  const temperature = within(temperatureContainer).getByText(
    new RegExp(currentWeatherUnit.temperature, "i")
  );

  // Check values existence
  expect(location).toBeInTheDocument();
  expect(dateValue).toBeInTheDocument();
  expect(image).toHaveAttribute(
    "src",
    expect.stringMatching(
      new RegExp(`_next/image\\?url=.*${weatherIconName}\\.webp`)
    )
  ); // Match Next.js Image component src
  expect(temperature).toBeInTheDocument();
};

/**
 * Helper function: checks WeatherInfo component elements/values existence
 */
export const checkWeatherInfo = (
  weatherData: WeatherData,
  isMetricUnit: boolean = true
) => {
  const { weather } = weatherData;
  const currentWeatherUnit = isMetricUnit ? weather[0] : weather[1]; // metric or imperial data

  // Main container
  const weatherInfoContainer = screen.getByRole("region", {
    name: "Weather information",
  });

  // Values
  const feelTemperature = within(weatherInfoContainer).getByText(
    new RegExp(currentWeatherUnit.feels_like, "i")
  );
  const humidity = within(weatherInfoContainer).getByText(
    new RegExp(currentWeatherUnit.humidity, "i")
  );
  const wind = within(weatherInfoContainer).getByText(
    new RegExp(currentWeatherUnit.wind, "i")
  );
  const precipitation = within(weatherInfoContainer).getByText(
    new RegExp(currentWeatherUnit.precipitation, "i")
  );

  // Check values existence
  expect(feelTemperature).toBeInTheDocument();
  expect(humidity).toBeInTheDocument();
  expect(wind).toBeInTheDocument();
  expect(precipitation).toBeInTheDocument();
};

/**
 * Helper function: checks ForecastList component elements/values existence
 */
export const checkForecastList = (forecastList: DayForecastProps[]) => {
  const title = screen.getByRole("heading", {
    level: 2,
    name: /Daily forecast/i,
  });

  // Check title existence
  expect(title).toBeInTheDocument();

  // Check daily forecast values existence
  forecastList.forEach((forecast) => {
    const dayForecastContainer = screen.getByTestId(`${forecast.day}-forecast`);

    const dayDescription = within(dayForecastContainer).getByText(forecast.day);

    const weatherIconName = getImageName(forecast.weatherImg);
    const image = within(dayForecastContainer).getByTestId(
      "forecast-weather-icon"
    );

    const maxTemperature = within(dayForecastContainer).getByText(
      new RegExp(forecast.maxTemp, "i")
    );
    const minTemperature = within(dayForecastContainer).getByText(
      new RegExp(forecast.minTemp, "i")
    );

    expect(dayDescription).toBeInTheDocument();
    checkImage(image, weatherIconName);
    expect(maxTemperature).toBeInTheDocument();
    expect(minTemperature).toBeInTheDocument();
  });
};

/**
 * Helper function: checks HourlyForecastList elements/values existence
 */
export const checkHourlyForecastList = (
  hourlyForecastList: HourForecastProps[],
  selectedDay: Day | undefined
) => {
  const title = screen.getByRole("heading", {
    level: 2,
    name: /Hourly forecast/i,
  });

  // Check title existence
  expect(title).toBeInTheDocument();

  const selectedDayContainer = screen.getByTestId("selected-day"); // selected day from Days component
  // Check selected day existence
  expect(selectedDayContainer.textContent).toBe(selectedDay?.name);

  // Check hourly forecast values existence
  hourlyForecastList.forEach((forecast) => {
    const hourForecastContainer = screen.getByTestId(`${forecast.id}-forecast`);
    const selectedDayContainer = screen.getByTestId("selected-day"); // selected day from Days component

    const weatherIconName = getImageName(forecast.weatherImg);
    const image = within(hourForecastContainer).getByTestId(
      "forecast-weather-icon"
    );

    const hourValue = within(hourForecastContainer).getByText(
      new RegExp(forecast.hour, "i")
    );
    const temperature = within(hourForecastContainer).getByText(
      new RegExp(forecast.temperature, "i")
    );

    checkImage(image, weatherIconName);
    expect(selectedDayContainer.textContent).toBe(selectedDay?.name);
    expect(hourValue).toBeInTheDocument();
    expect(temperature).toBeInTheDocument();
  });
};

/**
 * Helper function: checks image existence
 */
const checkImage = (image: HTMLElement, imageName: string) => {
  expect(image).toHaveAttribute(
    "src",
    expect.stringMatching(new RegExp(`_next/image\\?url=.*${imageName}\\.webp`))
  ); // Match Next.js Image component src
};
