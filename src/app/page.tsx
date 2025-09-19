import Image from "next/image";
import styles from "./page.module.css";
import Search from "./components/Search/Search";
import Temperature from "./components/Cards/TemperatureCard/Temperature";

export default function Home() {
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
    </main>
  );
}
