import styles from "./ForecastList.module.css";
import type { ForecastListProps } from "@/app/components/types";
import DayForecast from "../DayForecast/DayForecast";

/**
 * Renders grid of DayForeCast components
 *
 * Props are defined in {@link ForecastListProps}.
 */
export default function ForecastList({ forecastList }: ForecastListProps) {
  return (
    <section className={styles.forecastSec}>
      <h3 className={styles.title}>Daily forecast</h3>

      <div className={styles.forecastGrid}>
        {forecastList.map((forecast, index) => (
          <DayForecast
            key={index}
            day={forecast.day}
            imgTemp={forecast.imgTemp}
            maxTemp={forecast.maxTemp}
            minTemp={forecast.minTemp}
          />
        ))}
      </div>
    </section>
  );
}
