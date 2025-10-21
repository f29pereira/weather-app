import { render, screen } from "@testing-library/react";
import ForecastList from "@/app/components/Cards/Forecast/DailyForecast/ForecastList/ForecastList";
import { getDateAndHour, getDayOfWeek } from "@/app/utils/utils";

/**
 * Tests for the ForecastList component
 */
describe("ForecastList component", () => {
  const dateAndHour = getDateAndHour();
  const dayShort = getDayOfWeek(dateAndHour, "short");
  const imageAltText = "Weather Icon";

  const forecastListProp = [
    {
      day: dayShort,
      weatherImg: "/images/icons/icon-sunny.webp",
      maxTemp: "26°",
      minTemp: "15°",
    },
  ];

  let day: HTMLElement;
  let image: HTMLElement;
  let maxTemperature: HTMLElement;
  let minTemperature: HTMLElement;

  beforeEach(() => {
    render(<ForecastList forecastList={forecastListProp} />);

    day = screen.getByRole("heading", {
      level: 3,
      name: new RegExp(dayShort, "i"),
    });
    image = screen.getByAltText(imageAltText);
    maxTemperature = screen.getByText(
      new RegExp(forecastListProp[0].maxTemp, "i")
    );
    minTemperature = screen.getByText(
      new RegExp(forecastListProp[0].minTemp, "i")
    );
  });

  it("renders all elements with prop values", () => {
    // Check elements existence with prop values
    expect(day).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(maxTemperature).toBeInTheDocument();
    expect(minTemperature).toBeInTheDocument();
  });
});
