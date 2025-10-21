import { render, screen } from "@testing-library/react";
import HourlyForecastList from "@/app/components/Cards/Forecast/HourlyForecast/HourlyForecastList/HourlyForecastList";
import { getDateAndHour, getHour, getDayOfWeek } from "@/app/utils/utils";
import { getSixDaysOfWeek } from "@/app/utils/weather";
import type { Day } from "@/app/utils/weather";
import type { HourForecastProps } from "@/app/components/types";
import { getLoadingHourlyForecast } from "@/app/utils/weather";

type UseWeatherType = {
  weatherData: { days: Day[] };
  isLoading: boolean;
};

let useWeatherMock: UseWeatherType;

// Mock: useWeather
jest.mock("@/app/components/hooks/useWeather", () => ({
  useWeather: () => useWeatherMock,
}));

/**
 * Tests for the HourlyForecastList component
 */
describe("HourlyForecastList component", () => {
  const dateAndHour = getDateAndHour();
  const hour = getHour(dateAndHour);
  const dayLong = getDayOfWeek(dateAndHour, "long");
  const daysList = getSixDaysOfWeek();
  const day = daysList.find((day) => day.isSelected);

  const dummyHourlyList = getLoadingHourlyForecast();

  const hourlyForecastList = [
    {
      day: dayLong,
      weatherImg: "/images/icons/icon-sunny.webp",
      hour: hour,
      temperature: "26°",
    },
  ];

  /**
   * Helper function: renders the HourlyForecastList component
   */
  const renderHourlyForecastList = (list: HourForecastProps[]) => {
    render(<HourlyForecastList hourlyForecastList={list} />);
  };

  beforeEach(() => {
    useWeatherMock = { weatherData: { days: daysList }, isLoading: false };
  });

  it("renders title and selected day when loading data", () => {
    useWeatherMock = {
      ...useWeatherMock,
      isLoading: true,
    };

    renderHourlyForecastList(dummyHourlyList);

    const title = screen.getByRole("heading", {
      level: 3,
      name: /Hourly forecast/i,
    });
    const selectedDay = screen.getByTestId("selected-day");

    // Check elements existence
    expect(title).toBeInTheDocument();
    expect(selectedDay.textContent).toBe(day?.name);
  });

  it("renders title, selected day and hourly forecast temperature", () => {
    renderHourlyForecastList(hourlyForecastList);

    const title = screen.getByRole("heading", {
      level: 3,
      name: /Hourly forecast/i,
    });
    const selectedDay = screen.getByTestId("selected-day");
    const hourValue = screen.getByText(
      new RegExp(hourlyForecastList[0].hour, "i")
    );
    const temperature = screen.getByText(
      new RegExp(hourlyForecastList[0].temperature, "i")
    );

    // Check elements existence
    expect(title).toBeInTheDocument();
    expect(selectedDay.textContent).toBe(day?.name);
    expect(hourValue).toBeInTheDocument();
    expect(temperature).toBeInTheDocument();
  });
});
