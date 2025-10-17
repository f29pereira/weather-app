import { fetchLocation } from "@/app/utils/weather";
import { getSixDaysOfWeek } from "@/app/utils/weather";
import { getDate, getDayOfWeek } from "@/app/utils/utils";

/**
 * Test for function: fetchLocation
 */
describe("fetchLocation function", () => {
  beforeEach(() => {
    global.fetch = jest.fn(); //fetch mock function
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns object with isValid=false when API returns no result", async () => {
    const invalidLocation = {
      isValid: false,
      latitude: "",
      longitude: "",
      description: "",
      date: "",
      days: [],
    };

    const mockData = { results: "" }; //API response
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const fetchedData = await fetchLocation("Lorem ipsum");

    expect(fetchedData.isValid).toBe(false);
  });

  it("returns object with isValid=true and location data when API returns result", async () => {
    const validLatitude = "38.5244";
    const validLongitude = "-8.8882";
    const validName = "Setúbal";
    const validCountry = "Portugal";

    const validLocation = {
      isValid: true,
      latitude: validLatitude,
      longitude: validLongitude,
      description: `${validName}, ${validCountry}`,
      date: getDate(),
      days: getSixDaysOfWeek(),
    };

    const mockData = {
      results: [
        {
          latitude: validLatitude,
          longitude: validLongitude,
          name: validName,
          country: validCountry,
        },
      ],
    }; //API response
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const fetchedData = await fetchLocation(validName);

    expect(fetchedData.isValid).toBe(validLocation.isValid);
    expect(fetchedData.latitude).toBe(validLocation.latitude);
    expect(fetchedData.longitude).toBe(validLocation.longitude);
    expect(fetchedData.description).toBe(validLocation.description);
    expect(fetchedData.date).toBe(validLocation.date);
    expect(fetchedData.days).toEqual(validLocation.days);
  });

  it("throws an error when fetching fails", async () => {
    const error = "API error";

    global.fetch = jest.fn().mockRejectedValue(new Error(error)); //fail API response

    await expect(fetchLocation("Setúbal")).rejects.toThrow(error);
  });
});
