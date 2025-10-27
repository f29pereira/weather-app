import styles from "./DayForecast.module.css";
import type { DayForecastProps } from "@/app/components/types";
import Image from "next/image";

/**
 * Renders a card with:
 * day of the week
 * image of the weather
 * max temperature
 * min temperature
 *
 * Props are defined in {@link DayForecastProps}.
 */
export default function DayForecast({
  day,
  weatherImg,
  maxTemp,
  minTemp,
}: DayForecastProps) {
  return (
    <div
      className={`flex-col-center ${styles.dayForecastCont}`}
      data-testid={`${day}-forecast`}
    >
      {/*Day of the week*/}
      <h2 className={styles.title}>{day}</h2>

      {/*Weather icon*/}
      {weatherImg === "" ? null : (
        <Image
          data-testid="forecast-weather-icon"
          className={styles.imgWeather}
          src={weatherImg}
          width={48}
          height={48}
          alt="Weather Icon"
        />
      )}

      {/*Temperatures*/}
      <div className={styles.tempsCont}>
        <span className={styles.maxTemp}>{maxTemp}</span>
        <span className={styles.minTemp}>{minTemp}</span>
      </div>
    </div>
  );
}
