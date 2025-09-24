"use client"; //Client component

import styles from "./Weather.module.css";
import Search from "../Search/Search";
import Temperature from "../Cards/TemperatureCard/Temperature";
import TemperatureSkeleton from "../Cards/TemperatureCard/TemperatureSkeleton";
import WeatherInfo from "../Cards/WeatherInfo/WeatherInfo";
import ForecastList from "../Cards/Forecast/DailyForecast/ForecastList/ForecastList";
import HourlyForecastList from "../Cards/Forecast/HourlyForecast/HourlyForecastList/HourlyForecastList";
import { DayForecastProps, HourForecastProps } from "../types";
import { useWeather } from "../hooks/useWeather";
import Error from "../Error/Error";
import { getLoadingDailyForecast } from "@/app/utils/utils";

/**
 * Renders weather related components
 */
export default function Weather() {
  const dummyForecastList: DayForecastProps[] = getLoadingDailyForecast();

  const hourlyList: HourForecastProps[] = [
    {
      weatherImg: "images/icons/icon-sunny.webp",
      hour: "3 PM",
      temperature: "20°",
    },
    {
      weatherImg: "images/icons/icon-sunny.webp",
      hour: "4 PM",
      temperature: "20°",
    },
    {
      weatherImg: "images/icons/icon-sunny.webp",
      hour: "5 PM",
      temperature: "20°",
    },
    {
      weatherImg: "images/icons/icon-sunny.webp",
      hour: "6 PM",
      temperature: "20°",
    },
    {
      weatherImg: "images/icons/icon-sunny.webp",
      hour: "7 PM",
      temperature: "19°",
    },
    {
      weatherImg: "images/icons/icon-sunny.webp",
      hour: "8 PM",
      temperature: "18°",
    },
    {
      weatherImg: "images/icons/icon-sunny.webp",
      hour: "9 PM",
      temperature: "17°",
    },
    {
      weatherImg: "images/icons/icon-sunny.webp",
      hour: "10 PM",
      temperature: "17°",
    },
    {
      weatherImg: "images/icons/icon-sunny.webp",
      hour: "11 PM",
      temperature: "17°",
    },
  ];

  const { isLocationFound, isLoading, error, weatherData, isMetric } =
    useWeather();

  const dataIndex = isMetric ? 0 : 1; //weatherData.weather index (0 - metric / 1 - imperial)

  if (error) {
    return <Error title={error?.title} message={error?.message} />;
  }

  return (
    <section>
      <header>
        <h1 className={`text-center ${styles.title}`}>
          How&apos;s the sky looking today?
        </h1>
      </header>

      <Search />

      {isLocationFound === false ? (
        <div className={styles.notFoundCont}>
          <p className={`text-center ${styles.notFoundText}`}>
            No search result found!
          </p>
        </div>
      ) : null}

      {isLocationFound === true ? (
        <div className={styles.weatherDataCont}>
          <div className={styles.tempsDailyCont}>
            {isLoading ? (
              <TemperatureSkeleton />
            ) : (
              <Temperature
                location={weatherData ? weatherData.description : ""}
                date={weatherData ? weatherData.date : ""}
                weatherIconPath={
                  weatherData ? weatherData.weather[dataIndex].weatherImg : ""
                }
                temperature={
                  weatherData ? weatherData.weather[dataIndex].temperature : ""
                }
              />
            )}

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
                  weatherData ? weatherData.weather[dataIndex].feels_like : ""
                }
                humidity={
                  weatherData ? weatherData.weather[dataIndex].humidity : ""
                }
                wind={weatherData ? weatherData.weather[dataIndex].wind : ""}
                precipitation={
                  weatherData
                    ? weatherData.weather[dataIndex].precipitation
                    : ""
                }
              />
            )}

            {isLoading ? (
              <ForecastList forecastList={dummyForecastList} />
            ) : (
              <ForecastList
                forecastList={
                  weatherData
                    ? weatherData.weather[dataIndex].dailyForecastList
                    : dummyForecastList
                }
              />
            )}
          </div>

          <div className={styles.hourlyCont}>
            <HourlyForecastList hourlyForecastList={hourlyList} />
          </div>
        </div>
      ) : null}
    </section>
  );
}
