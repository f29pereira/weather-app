import { render, screen } from "@testing-library/react";
import WeatherProvider from "@/app/components/Weather/WeatherProvider";
import Search from "@/app/components/Search/Search";

const mockWeather = {
  setIsLoading: false,
  setIsLocationFound: false,
  setError: null,
  setWeatherData: null,
};

// Mock useWeather hook
jest.mock("@/app/components/hooks/useWeather", () => ({
  useWeather: () => ({ ticket: mockWeather }),
}));

/**
 * Tests for the Search component
 */
describe("Search component", () => {
  let search: HTMLElement;
  let submitButton: HTMLElement;

  beforeEach(() => {
    render(
      <WeatherProvider>
        <Search />
      </WeatherProvider>
    );

    search = screen.getByLabelText(/search/i);

    submitButton = screen.getByRole("button", {
      name: "Search",
    });
  });

  it("renders search label and input", () => {
    // Check elements existence
    expect(search).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
