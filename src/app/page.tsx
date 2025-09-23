import styles from "./page.module.css";
import WeatherProvider from "./components/Weather/WeatherProvider";
import Weather from "./components/Weather/Weather";

export default function Home() {
  return (
    <main className={styles.mainCont}>
      <WeatherProvider>
        <Weather />
      </WeatherProvider>
    </main>
  );
}
