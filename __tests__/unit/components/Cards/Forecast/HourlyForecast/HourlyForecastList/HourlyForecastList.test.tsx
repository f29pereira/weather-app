import { render, screen } from "@testing-library/react";
import HourlyForecastList from "@/app/components/Cards/Forecast/HourlyForecast/HourlyForecastList/HourlyForecastList";
import { getLoadingHourlyForecast } from "@/app/utils/weather";
import {
  hourlyForecastListMetric,
  hourlyForecastListImperial,
} from "../../../../../../fixtures/weather.fixture";
import { getSixDaysOfWeek } from "@/app/utils/weather";
import { checkHourlyForecastList } from "../../../../../../helpers/weatherHelpers";
import type { Day } from "@/app/utils/weather";
import type { HourForecastProps } from "@/app/components/types";

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
  const daysList = getSixDaysOfWeek();
  const day = daysList.find((day) => day.isSelected);

  /**
   * Helper function: renders the HourlyForecastList component
   */
  const renderHourlyForecastList = (list: HourForecastProps[]) => {
    render(<HourlyForecastList hourlyForecastList={list} />);
  };

  beforeEach(() => {
    useWeatherMock = { weatherData: { days: daysList }, isLoading: false };
  });

  it("renders title, selected day and dummy hourly forecast list when loading data", () => {
    useWeatherMock = {
      ...useWeatherMock,
      isLoading: true,
    };

    const dummyHourlyList = getLoadingHourlyForecast();

    renderHourlyForecastList(dummyHourlyList);
  });

  it("renders title, selected day and hourly forecast list in metric units", () => {
    renderHourlyForecastList(hourlyForecastListMetric);

    checkHourlyForecastList(hourlyForecastListMetric, day);
  });

  it("renders title, selected day and hourly forecast list in imperial units", () => {
    renderHourlyForecastList(hourlyForecastListImperial);

    checkHourlyForecastList(hourlyForecastListImperial, day);
  });
});
