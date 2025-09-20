import styles from "./Temperature.module.css";
import type { TemperatureProps } from "../../types";
import Image from "next/image";

/**
 * Renders temperature information with:
 * - main card with location, current date and temperature value
 * - grid with feels like temp, humidity, wind and precipitaion values
 *
 * Props are defined in {@link TemperatureProps}.
 */
export default function Temperature({
  location,
  date,
  temperature,
  feelTemperature,
  humidity,
  wind,
  precipitation,
}: TemperatureProps) {
  return (
    <div>
      {/*Main temperature card*/}
      <div className={styles.tempCardBg}>
        <div className={styles.tempCardCont}>
          <div className={styles.tempCardTitleCont}>
            {/*Location*/}
            <h2 className={styles.location}>{location}</h2>
            {/*Current date*/}
            <p className={styles.date}>{date}</p>
          </div>

          <div className={`flex-center ${styles.iconTempCont}`}>
            {/*Icon*/}
            <Image
              className={styles.tempIcon}
              src="/images/icons/icon-sunny.webp"
              width={48}
              height={48}
              alt=""
            />
            {/*Temperature*/}
            <span className={styles.temperature}>{temperature}</span>
          </div>
        </div>
      </div>

      {/*Info Grid*/}
      <div className={styles.infoGrid}>
        {/*Feels Like*/}
        <div className={styles.infoCard}>
          <h3 className={styles.infoTitle}>Feels Like</h3>
          <span className={styles.infoValue}>{feelTemperature}</span>
        </div>
        {/*Humidity*/}
        <div className={styles.infoCard}>
          <h3 className={styles.infoTitle}>Humidity</h3>
          <span className={styles.infoValue}>{humidity}</span>
        </div>
        {/*Wind*/}
        <div className={styles.infoCard}>
          <h3 className={styles.infoTitle}>Wind</h3>
          <span className={styles.infoValue}>{wind}</span>
        </div>
        {/*Precipitation*/}
        <div className={styles.infoCard}>
          <h3 className={styles.infoTitle}>Precipitation</h3>
          <span className={styles.infoValue}>{precipitation}</span>
        </div>
      </div>
    </div>
  );
}
