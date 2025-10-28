import styles from "./HourForecast.module.css";
import type { HourForecastProps } from "@/app/components/types";
import Image from "next/image";

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
            alt="Weather Icon"
          />
        )}

        {/*Hour*/}
        <span className={styles.hour}>{hour}</span>
      </div>

      {/*Current temperature*/}
      <span className={styles.temperature}>{temperature}</span>
    </div>
  );
}
