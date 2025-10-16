import { getWeatherImagePath } from "@/app/utils/weather";

/**
 * Test for function: getWeatherImagePath
 */
describe("getWeatherImagePath function", () => {
  const iconSunny = "/images/icons/icon-sunny.webp";
  const iconPartlyCloudy = "/images/icons/icon-partly-cloudy.webp";
  const iconOvercast = "/images/icons/icon-overcast.webp";
  const iconFog = "/images/icons/icon-fog.webp";
  const iconDrizzle = "/images/icons/icon-drizzle.webp";
  const iconRain = "/images/icons/icon-rain.webp";
  const iconSnow = "/images/icons/icon-snow.webp";
  const iconStorm = "/images/icons/icon-storm.webp";

  it("returns icon-sunny.webp image path", () => {
    expect(getWeatherImagePath(0)).toBe(iconSunny);
  });

  it("returns icon-partly-cloudy.webp image path", () => {
    expect(getWeatherImagePath(1)).toBe(iconPartlyCloudy);
    expect(getWeatherImagePath(2)).toBe(iconPartlyCloudy);
  });

  it("returns icon-overcast.webp image path", () => {
    expect(getWeatherImagePath(3)).toBe(iconOvercast);
  });

  it("returns icon-fog.webp image path", () => {
    expect(getWeatherImagePath(45)).toBe(iconFog);
    expect(getWeatherImagePath(46)).toBe(iconFog);
  });

  it("returns icon-drizzle.webp image path", () => {
    expect(getWeatherImagePath(51)).toBe(iconDrizzle);
    expect(getWeatherImagePath(53)).toBe(iconDrizzle);
    expect(getWeatherImagePath(55)).toBe(iconDrizzle);
  });

  it("returns icon-rain.webp image path", () => {
    expect(getWeatherImagePath(61)).toBe(iconRain);
    expect(getWeatherImagePath(63)).toBe(iconRain);
    expect(getWeatherImagePath(65)).toBe(iconRain);
    expect(getWeatherImagePath(80)).toBe(iconRain);
    expect(getWeatherImagePath(81)).toBe(iconRain);
    expect(getWeatherImagePath(82)).toBe(iconRain);
  });

  it("returns icon-snow.webp image path", () => {
    expect(getWeatherImagePath(71)).toBe(iconSnow);
    expect(getWeatherImagePath(73)).toBe(iconSnow);
    expect(getWeatherImagePath(75)).toBe(iconSnow);
  });

  it("returns icon-storm.webp image path", () => {
    expect(getWeatherImagePath(95)).toBe(iconStorm);
    expect(getWeatherImagePath(96)).toBe(iconStorm);
    expect(getWeatherImagePath(99)).toBe(iconStorm);
  });
});
