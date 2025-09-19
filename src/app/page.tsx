import Image from "next/image";
import styles from "./page.module.css";
import Search from "./components/Search/Search";
import Temperature from "./components/Cards/TemperatureCard/Temperature";
import ForecastList from "./components/Cards/Forecast/DailyForecast/ForecastList/ForecastList";
import { DayForecastProps, HourForecastProps } from "./components/types";
import HourlyForecastList from "./components/Cards/Forecast/HourlyForecast/HourlyForecastList/HourlyForecastList";

export default function Home() {
  const forecastList: DayForecastProps[] = [
    {
      day: "Tue",
      imgTemp: "/images/icons/icon-rain.webp",
      maxTemp: "28°",
      minTemp: "14°",
    },
    {
      day: "Wed",
      imgTemp: "/images/icons/icon-drizzle.webp",
      maxTemp: "21°",
      minTemp: "15°",
    },
    {
      day: "Thu",
      imgTemp: "/images/icons/icon-sunny.webp",
      maxTemp: "24°",
      minTemp: "14°",
    },
    {
      day: "Frid",
      imgTemp: "/images/icons/icon-partly-cloudy.webp",
      maxTemp: "25°",
      minTemp: "13°",
    },
    {
      day: "Sat",
      imgTemp: "/images/icons/icon-storm.webp",
      maxTemp: "21°",
      minTemp: "15°",
    },
    {
      day: "Sun",
      imgTemp: "/images/icons/icon-snow.webp",
      maxTemp: "25°",
      minTemp: "16°",
    },
    {
      day: "Mon",
      imgTemp: "/images/icons/icon-fog.webp",
      maxTemp: "24°",
      minTemp: "15°",
    },
  ];

  const hourlyList: HourForecastProps[] = [
    {
      imgTemp: "/images/icons/icon-sunny.webp",
      hour: "3 PM",
      temperature: "20°",
    },
    {
      imgTemp: "/images/icons/icon-sunny.webp",
      hour: "4 PM",
      temperature: "20°",
    },
    {
      imgTemp: "/images/icons/icon-sunny.webp",
      hour: "5 PM",
      temperature: "20°",
    },
    {
      imgTemp: "/images/icons/icon-sunny.webp",
      hour: "6 PM",
      temperature: "20°",
    },
    {
      imgTemp: "/images/icons/icon-sunny.webp",
      hour: "7 PM",
      temperature: "19°",
    },
    {
      imgTemp: "/images/icons/icon-sunny.webp",
      hour: "8 PM",
      temperature: "18°",
    },
    {
      imgTemp: "/images/icons/icon-sunny.webp",
      hour: "9 PM",
      temperature: "17°",
    },
    {
      imgTemp: "/images/icons/icon-sunny.webp",
      hour: "10 PM",
      temperature: "17°",
    },
  ];

  return (
    <main className={styles.mainCont}>
      <header>
        <h1 className={styles.title}>How's the sky looking today?</h1>
      </header>

      <Search />

      <Temperature
        location="Berlin, Germany"
        date="Tuesday, Aug 5, 2025"
        temperature="28°"
        feelTemperature="18°"
        humidity="46%"
        wind="14 km/h"
        precipitation="0 mm"
      />

      <ForecastList forecastList={forecastList} />

      <HourlyForecastList hourlyForecastList={hourlyList} />
    </main>
  );
}
