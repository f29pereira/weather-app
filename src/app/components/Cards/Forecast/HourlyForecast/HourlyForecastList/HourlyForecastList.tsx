import styles from "./HourlyForecastList.module.css";
import type { HourlyForecastListProps } from "@/app/components/types";
import HourForecast from "../HourForecast/HourForecast";
import Days from "@/app/components/PopUp/Days/Days";
import { useWeather } from "@/app/components/hooks/useWeather";

/**
 * Renders list of HourForecast components
 *
 * Props are defined in {@link HourlyForecastListProps}.
 */
export default function HourlyForecastList({
  hourlyForecastList,
}: HourlyForecastListProps) {
  const { weatherData } = useWeather();

  //current selected day
  const selectedDay = weatherData?.days.find((day) => day.isSelected);

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
        {weatherData
          ? hourlyForecastList
              .filter((forecast) => forecast.day === selectedDay?.name)
              .map((forecast, index) => (
                <HourForecast
                  key={index}
                  day={forecast.day}
                  weatherImg={forecast.weatherImg}
                  hour={forecast.hour}
                  temperature={forecast.temperature}
                />
              ))
          : null}
      </div>
    </section>
  );
}
