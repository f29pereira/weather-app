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
  weatherImg,
  hour,
  temperature,
}: HourForecastProps) {
  return (
    <div className={styles.hourForecastCont}>
      <div className="flex-center">
        {/*Weather icon*/}
        {weatherImg === "" ? null : (
          <Image
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
