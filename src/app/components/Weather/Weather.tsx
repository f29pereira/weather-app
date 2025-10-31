"use client"; //Client component

import styles from "./Weather.module.css";
import Search from "../Search/Search";
import Temperature from "../Cards/TemperatureCard/Temperature";
import TemperatureSkeleton from "../Cards/TemperatureCard/TemperatureSkeleton";
import WeatherInfo from "../Cards/WeatherInfo/WeatherInfo";
import ForecastList from "../Cards/Forecast/DailyForecast/ForecastList/ForecastList";
import HourlyForecastList from "../Cards/Forecast/HourlyForecast/HourlyForecastList/HourlyForecastList";
import { useWeather } from "../hooks/useWeather";
import Error from "../Error/Error";
import {
  getLoadingDailyForecast,
  getLoadingHourlyForecast,
} from "@/app/utils/weather";

/**
 * Renders weather related components
 */
export default function Weather() {
  const dummyDailyList = getLoadingDailyForecast();

  const dummyHourlyList = getLoadingHourlyForecast();

  const { isLocationFound, isLoading, error, weatherData, isMetric } =
    useWeather();

  const dataIndex = isMetric ? 0 : 1; //weatherData.weather index (0 - metric / 1 - imperial)

  return (
    <section>
      {!error ? (
        <>
          <header>
            <h1 className={`text-center ${styles.title}`}>
              How&apos;s the sky looking today?
            </h1>
          </header>

          {/*Search component*/}
          <Search />
        </>
      ) : null}

      {/*Error message*/}
      <div aria-live="assertive" aria-atomic="true">
        {error ? <Error title={error.title} message={error?.message} /> : null}
      </div>

      {/*Location not found message*/}
      <div aria-live="assertive" aria-atomic="true">
        {isLocationFound === false ? (
          <p className={`text-center ${styles.notFoundText}`}>
            No search result found!
          </p>
        ) : null}
      </div>

      {/*Weather data*/}
      {isLocationFound === true && !error ? (
        <div className={styles.weatherDataCont}>
          <div className={styles.tempsDailyCont}>
            {/*Temperature component*/}
            {isLoading ? (
              <TemperatureSkeleton />
            ) : (
              <Temperature
                location={weatherData?.description ?? ""}
                date={weatherData?.date ?? ""}
                weatherIconPath={
                  weatherData?.weather?.[dataIndex]?.weatherImg ?? ""
                }
                temperature={
                  weatherData?.weather?.[dataIndex]?.temperature ?? ""
                }
              />
            )}

            {/*WeatherInfo component*/}
            {isLoading ? (
              <WeatherInfo
                feelTemperature="-"
                humidity="-"
                wind="-"
                precipitation="-"
              />
            ) : (
              <WeatherInfo
                feelTemperature={
                  weatherData?.weather?.[dataIndex]?.feels_like ?? ""
                }
                humidity={weatherData?.weather?.[dataIndex]?.humidity ?? ""}
                wind={weatherData?.weather?.[dataIndex]?.wind ?? ""}
                precipitation={
                  weatherData?.weather?.[dataIndex]?.precipitation ?? ""
                }
              />
            )}

            {/*ForecastList component*/}
            {isLoading ? (
              <ForecastList forecastList={dummyDailyList} />
            ) : (
              <ForecastList
                forecastList={
                  weatherData?.weather?.[dataIndex]?.dailyForecastList ??
                  dummyDailyList
                }
              />
            )}
          </div>

          {/*HourlyForecastList*/}
          <div className={styles.hourlyCont}>
            {isLoading ? (
              <HourlyForecastList hourlyForecastList={dummyHourlyList} />
            ) : (
              <HourlyForecastList
                hourlyForecastList={
                  weatherData?.weather?.[dataIndex]?.hourlyForecastList ??
                  dummyHourlyList
                }
              />
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}
