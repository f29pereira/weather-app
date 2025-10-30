import styles from "./DayForecast.module.css";
import type { DayForecastProps } from "@/app/components/types";
import Image from "next/image";
import { getWeatherDescription } from "@/app/utils/weather";

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
  const weather = getWeatherDescription(weatherImg);

  return (
    <div
      className={`flex-col-center ${styles.dayForecastCont}`}
      data-testid={`${day}-forecast`}
    >
      {/*Day of the week*/}
      <p className={styles.title}>{day}</p>

      {/*Weather icon*/}
      {weatherImg === "" ? null : (
        <Image
          data-testid="forecast-weather-icon"
          className={styles.imgWeather}
          src={weatherImg}
          width={48}
          height={48}
          alt={`Weather is ${weather}`}
        />
      )}

      {/*Temperatures*/}
      <div className={styles.tempsCont}>
        <div>
          <span className="sr-only">Max Temperature</span>
          <span className={styles.maxTemp}>{maxTemp}</span>
        </div>
        <div>
          <span className="sr-only">Min Temperature</span>
          <span className={styles.minTemp}>{minTemp}</span>
        </div>
      </div>
    </div>
  );
}
