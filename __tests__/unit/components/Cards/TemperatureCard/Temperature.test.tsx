import { render, screen } from "@testing-library/react";
import Temperature from "@/app/components/Cards/TemperatureCard/Temperature";
import { getImageName } from "@/app/utils/weather";

/**
 * Tests for the Temperature component
 */
describe("Temperature component", () => {
  const locationProp = "Setúbal, Portugal";
  const dateProp = "Saturday, Oct 18, 2025";
  const weatherIconPathProp = "/images/icons/icon-sunny.webp";
  const weatherIconName = getImageName(weatherIconPathProp);
  const temperatureProp = "27.3°";

  let location: HTMLElement;
  let date: HTMLElement;
  let image: HTMLElement;
  let temperature: HTMLElement;

  beforeEach(() => {
    render(
      <Temperature
        location={locationProp}
        date={dateProp}
        weatherIconPath={weatherIconPathProp}
        temperature={temperatureProp}
      />
    );

    location = screen.getByRole("heading", {
      level: 2,
      name: new RegExp(locationProp, "i"),
    });

    date = screen.getByText(new RegExp(dateProp, "i"));
    image = screen.getByTestId("weather-icon");
    temperature = screen.getByText(new RegExp(temperatureProp, "i"));
  });

  it("renders all elements with prop values", () => {
    // Check elements existence with prop values
    expect(location).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringMatching(
        new RegExp(`_next/image\\?url=.*${weatherIconName}\\.webp`)
      )
    ); // Match Next.js Image component src
    expect(temperature).toBeInTheDocument();
  });
});
