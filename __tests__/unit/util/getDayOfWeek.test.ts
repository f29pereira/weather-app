import { getDayOfWeek } from "@/app/utils/utils";

/**
 * Test for function: getDayOfWeek
 */
describe("getDayOfWeek function", () => {
  const date = "2025-10-16";

  it("returns day of the week in short format", () => {
    expect(getDayOfWeek(date, "short")).toBe("Thu");
  });
  it("returns day of the week in long format", () => {
    expect(getDayOfWeek(date, "long")).toBe("Thursday");
  });
});
