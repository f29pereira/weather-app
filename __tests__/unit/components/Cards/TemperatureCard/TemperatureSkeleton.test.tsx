import { render, screen } from "@testing-library/react";
import TemperatureSkeleton from "@/app/components/Cards/TemperatureCard/TemperatureSkeleton";

/**
 * Tests for the TemperatureSkeleton component
 */
describe("TemperatureSkeleton component", () => {
  const iconPath = "/images/icons/icon-loading.svg";
  let image: HTMLElement;
  let description: HTMLElement;

  beforeEach(() => {
    render(<TemperatureSkeleton />);

    image = screen.getByTestId("loading-icon");
    description = screen.getByText(/loading.../i);
  });

  it("renders loading image and description elements", () => {
    // Check elements existence
    expect(image).toHaveAttribute("src", expect.stringMatching(iconPath));
    expect(description).toBeInTheDocument();
  });
});
