import Image from "next/image";
import styles from "./page.module.css";
import Search from "./components/Search/Search";
import Temperature from "./components/Cards/TemperatureCard/Temperature";
import ForecastList from "./components/Cards/Forecast/ForecastList/ForecastList";
import { DayForecastProps } from "./components/types";

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
    </main>
  );
}
