import styles from "./HourlyForecastList.module.css";
import type { HourlyForecastListProps } from "@/app/components/types";
import HourForecast from "../HourForecast/HourForecast";
import Days from "@/app/components/PopUp/Days/Days";

/**
 * Renders list of HourForecast components
 *
 * Props are defined in {@link HourlyForecastListProps}.
 */
export default function HourlyForecastList({
  hourlyForecastList,
}: HourlyForecastListProps) {
  return (
    <section className={styles.forecastSec}>
      <div className={styles.titlePopupCont}>
        {/*Title*/}
        <h3 className={styles.title}>Hourly forecast</h3>

        {/*Day pop up*/}
        <Days />
      </div>

      {/*Hourly forecast*/}
      <div className={`flex-col-center ${styles.hourlyForeCastCont}`}>
        {hourlyForecastList.map((forecast, index) => (
          <HourForecast
            key={index}
            imgTemp={forecast.imgTemp}
            hour={forecast.hour}
            temperature={forecast.temperature}
          />
        ))}
      </div>
    </section>
  );
}
