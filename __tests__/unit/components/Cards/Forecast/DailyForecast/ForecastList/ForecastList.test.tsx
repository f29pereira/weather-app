import { render } from "@testing-library/react";
import ForecastList from "@/app/components/Cards/Forecast/DailyForecast/ForecastList/ForecastList";
import {
  foreCastListMetric,
  foreCastListImperial,
} from "../../../../../../fixtures/weather.fixture";
import { checkForecastList } from "../../../../../../helpers/weatherHelpers";
import type { DayForecastProps } from "@/app/components/types";

/**
 * Tests for the ForecastList component
 */
describe("ForecastList component", () => {
  /**
   * Helper function: renders the ForecastList component
   */
  const renderForecastList = (list: DayForecastProps[]) => {
    render(<ForecastList forecastList={list} />);
  };

  it("renders title and the daily forecast list with: day of the week, weather icon image, max and min temperature values in metric units", () => {
    renderForecastList(foreCastListMetric);

    checkForecastList(foreCastListMetric);
  });

  it("renders title and the daily forecast list with: day of the week, weather icon image, max and min temperature values in imperial units", () => {
    renderForecastList(foreCastListImperial);

    checkForecastList(foreCastListImperial);
  });
});
