import styles from "./WeatherInfo.module.css";
import type { WeatherInfoProps } from "../../types";

/**
 * Renders temperature info grid with:
 * feels like temp, humidity, wind and precipitaion values
 *
 * Props are defined in {@link WeatherInfoProps}.
 */
export default function WeatherInfo({
  feelTemperature,
  humidity,
  wind,
  precipitation,
}: WeatherInfoProps) {
  return (
    <div
      className={styles.infoGrid}
      data-testid="weatherInfo"
      role="region"
      aria-label="Weather information"
    >
      {/*Feels Like*/}
      <div className={styles.infoCard}>
        <span className={styles.infoTitle}>Feels Like</span>
        <span className={styles.infoValue}>{feelTemperature}</span>
      </div>
      {/*Humidity*/}
      <div className={styles.infoCard}>
        <span className={styles.infoTitle}>Humidity</span>
        <span className={styles.infoValue}>{humidity}</span>
      </div>
      {/*Wind*/}
      <div className={styles.infoCard}>
        <span className={styles.infoTitle}>Wind</span>
        <span className={styles.infoValue}>{wind}</span>
      </div>
      {/*Precipitation*/}
      <div className={styles.infoCard}>
        <span className={styles.infoTitle}>Precipitation</span>
        <span className={styles.infoValue}>{precipitation}</span>
      </div>
    </div>
  );
}
