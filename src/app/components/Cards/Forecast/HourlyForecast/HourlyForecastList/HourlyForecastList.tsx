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
  const { weatherData, isLoading } = useWeather();

  //current selected day
  const selectedDay = weatherData?.days.find((day) => day.isSelected);

  //hourly forecast list to render (loading - dummy data / not loading - filter selected day)
  const list = isLoading
    ? hourlyForecastList
    : hourlyForecastList.filter(
        (forecast) => forecast.day === selectedDay?.name
      );

  return (
    <section
      className={styles.forecastSec}
      role="region"
      aria-labelledby="hourlyForecastId"
    >
      <div className={styles.titlePopupCont}>
        {/*Title*/}
        <h2 id="hourlyForecastId" className={styles.title}>
          Hourly forecast
        </h2>

        {/*Day pop up*/}
        <Days />
      </div>

      {/*Hourly forecast*/}
      <div className={`flex-col-center ${styles.hourlyForeCastCont}`}>
        {list.map((forecast, index) => (
          <HourForecast
            key={index}
            id={forecast.id}
            day={forecast.day}
            weatherImg={forecast.weatherImg}
            hour={forecast.hour}
            temperature={forecast.temperature}
          />
        ))}
      </div>
    </section>
  );
}
