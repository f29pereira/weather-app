import { render, screen, within } from "@testing-library/react";
import ForecastList from "@/app/components/Cards/Forecast/DailyForecast/ForecastList/ForecastList";
import { getImageName } from "@/app/utils/weather";

/**
 * Tests for the ForecastList component
 */
describe("ForecastList component", () => {
  const forecastListProp = [
    {
      day: "Mon",
      weatherImg: "/images/icons/icon-sunny.webp",
      maxTemp: "20°",
      minTemp: "15°",
    },
    {
      day: "Tue",
      weatherImg: "/images/icons/icon-partly-cloudy.webp",
      maxTemp: "20°",
      minTemp: "14°",
    },
  ];

  beforeEach(() => {
    render(<ForecastList forecastList={forecastListProp} />);
  });

  it("renders daily forecast list with: day of the week, weather icon image, max and min temperature values", () => {
    const title = screen.getByRole("heading", {
      level: 3,
      name: /Daily forecast/i,
    });

    // Check title existence
    expect(title).toBeInTheDocument();

    // Check values existence for each day forecast
    forecastListProp.forEach((forecast) => {
      const dayForecastContainer = screen.getByTestId(
        `${forecast.day}-forecast`
      );

      const dayDescription = within(dayForecastContainer).getByRole("heading", {
        level: 2,
        name: new RegExp(forecast.day, "i"),
      });

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
      expect(image).toHaveAttribute(
        "src",
        expect.stringMatching(
          new RegExp(`_next/image\\?url=.*${weatherIconName}\\.webp`)
        )
      ); // Match Next.js Image component src
      expect(maxTemperature).toBeInTheDocument();
      expect(minTemperature).toBeInTheDocument();
    });
  });
});
