import { render, screen } from "@testing-library/react";
import WeatherInfo from "@/app/components/Cards/WeatherInfo/WeatherInfo";

/**
 * Tests for the WeatherInfo component
 */
describe("Temperature component", () => {
  const feelTemperatureProp = "20°";
  const humidityProp = "50%";
  const windProp = "2.3 km/h";
  const precipitationProp = "0 mm";

  let feelTemperature: HTMLElement;
  let humidity: HTMLElement;
  let wind: HTMLElement;
  let precipitation: HTMLElement;

  beforeEach(() => {
    render(
      <WeatherInfo
        feelTemperature={feelTemperatureProp}
        humidity={humidityProp}
        wind={windProp}
        precipitation={precipitationProp}
      />
    );

    feelTemperature = screen.getByText(new RegExp(feelTemperatureProp, "i"));
    humidity = screen.getByText(new RegExp(humidityProp, "i"));
    wind = screen.getByText(new RegExp(windProp, "i"));
    precipitation = screen.getByText(new RegExp(precipitationProp, "i"));
  });

  it("renders all elements with prop values", () => {
    // Check elements existence with prop values
    expect(feelTemperature).toBeInTheDocument();
    expect(humidity).toBeInTheDocument();
    expect(wind).toBeInTheDocument();
    expect(precipitation).toBeInTheDocument();
  });
});
