import styles from "./Temperature.module.css";
import type { TemperatureProps } from "../../types";
import Image from "next/image";
import { getWeatherDescription } from "@/app/utils/weather";

/**
 * Renders temperature card with:
 * - location, current date and temperature value
 *
 * Props are defined in {@link TemperatureProps}.
 */
export default function Temperature({
  location,
  date,
  weatherIconPath,
  temperature,
}: TemperatureProps) {
  const currentWeather = getWeatherDescription(weatherIconPath);

  return (
    <div className={styles.tempCardBg} role="region" aria-label="Weather">
      <div className={styles.tempCardCont}>
        <div className={styles.tempCardTitleCont}>
          {/*Location*/}
          <span className={`text-center ${styles.location}`}>{location}</span>
          {/*Current date*/}
          <p className={`text-center ${styles.date}`}>{date}</p>
        </div>

        <div className={`flex-center ${styles.iconTempCont}`}>
          {/*Icon*/}
          {weatherIconPath === "" ? null : (
            <Image
              data-testid="weather-icon"
              className={styles.tempIcon}
              src={weatherIconPath}
              width={48}
              height={48}
              alt={`Current weather is ${currentWeather}`}
            />
          )}
          {/*Temperature*/}
          <span className={styles.temperature}>{temperature}</span>
        </div>
      </div>
    </div>
  );
}
