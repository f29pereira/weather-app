import styles from "./HourForecast.module.css";
import type { HourForecastProps } from "@/app/components/types";
import Image from "next/image";
import { getWeatherDescription } from "@/app/utils/weather";

/**
 * Renders a hour forecast with:
 * icon image of the weather
 * hour
 * current temperature
 *
 * Props are defined in {@link HourForecastProps}.
 */
export default function HourForecast({
  id,
  weatherImg,
  hour,
  temperature,
}: HourForecastProps) {
  const weather = getWeatherDescription(weatherImg);

  return (
    <div className={styles.hourForecastCont} data-testid={`${id}-forecast`}>
      <div className="flex-center">
        {/*Weather icon*/}
        {weatherImg === "" ? null : (
          <Image
            data-testid="forecast-weather-icon"
            className={styles.imgWeather}
            src={weatherImg}
            width={320}
            height={320}
            alt={`Current weather is ${weather}`}
          />
        )}

        {/*Hour*/}
        <span className={styles.hour}>{hour}</span>
      </div>

      {/*Current temperature*/}
      <div>
        <span className="sr-only">Temperature</span>
        <span className={styles.temperature}>{temperature}</span>
      </div>
    </div>
  );
}
