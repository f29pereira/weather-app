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

/**
 * Renders weather related components
 */
export default function Weather() {
  const forecastList: DayForecastProps[] = [
    {
      day: "Tue",
      imgTemp: "images/icons/icon-rain.webp",
      maxTemp: "28°",
      minTemp: "14°",
    },
    {
      day: "Wed",
      imgTemp: "images/icons/icon-drizzle.webp",
      maxTemp: "21°",
      minTemp: "15°",
    },
    {
      day: "Thu",
      imgTemp: "images/icons/icon-sunny.webp",
      maxTemp: "24°",
      minTemp: "14°",
    },
    {
      day: "Frid",
      imgTemp: "images/icons/icon-partly-cloudy.webp",
      maxTemp: "25°",
      minTemp: "13°",
    },
    {
      day: "Sat",
      imgTemp: "images/icons/icon-storm.webp",
      maxTemp: "21°",
      minTemp: "15°",
    },
    {
      day: "Sun",
      imgTemp: "images/icons/icon-snow.webp",
      maxTemp: "25°",
      minTemp: "16°",
    },
    {
      day: "Mon",
      imgTemp: "images/icons/icon-fog.webp",
      maxTemp: "24°",
      minTemp: "15°",
    },
  ];

  const hourlyList: HourForecastProps[] = [
    {
      imgTemp: "images/icons/icon-sunny.webp",
      hour: "3 PM",
      temperature: "20°",
    },
    {
      imgTemp: "images/icons/icon-sunny.webp",
      hour: "4 PM",
      temperature: "20°",
    },
    {
      imgTemp: "images/icons/icon-sunny.webp",
      hour: "5 PM",
      temperature: "20°",
    },
    {
      imgTemp: "images/icons/icon-sunny.webp",
      hour: "6 PM",
      temperature: "20°",
    },
    {
      imgTemp: "images/icons/icon-sunny.webp",
      hour: "7 PM",
      temperature: "19°",
    },
    {
      imgTemp: "images/icons/icon-sunny.webp",
      hour: "8 PM",
      temperature: "18°",
    },
    {
      imgTemp: "images/icons/icon-sunny.webp",
      hour: "9 PM",
      temperature: "17°",
    },
    {
      imgTemp: "images/icons/icon-sunny.webp",
      hour: "10 PM",
      temperature: "17°",
    },
    {
      imgTemp: "images/icons/icon-sunny.webp",
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

            <ForecastList forecastList={forecastList} />
          </div>

          <div className={styles.hourlyCont}>
            <HourlyForecastList hourlyForecastList={hourlyList} />
          </div>
        </div>
      ) : null}
    </section>
  );
}
