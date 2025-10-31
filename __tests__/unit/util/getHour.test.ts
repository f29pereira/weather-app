import { getHour } from "@/app/utils/utils";

/**
 * Test for function: getHour
 */
describe("getHour function", () => {
  it("returns 12 AM", () => {
    expect(getHour("2025-10-16T00:00")).toBe("12 AM");
  });

  it("returns 12 PM", () => {
    expect(getHour("2025-10-16T12:00")).toBe("12 PM");
  });
});
