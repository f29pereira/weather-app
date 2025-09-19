import styles from "./DayForeCast.module.css";
import type { DayForeCastProps } from "@/app/components/types";
import Image from "next/image";

/**
 * Renders a card with:
 * day of the week
 * image of the weather
 * max temperature
 * min temperature
 *
 * Props are defined in {@link DayForeCastProps}.
 */
export default function DayForeCast({
  day,
  imgTemp,
  maxTemp,
  minTemp,
}: DayForeCastProps) {
  return (
    <div className={`flex-col-center ${styles.dayForeCastCont}`}>
      {/*Day of the week*/}
      <h3 className={styles.title}>{day}</h3>

      {/*Weather icon*/}
      <Image
        className={styles.imgWeather}
        src={imgTemp}
        width={320}
        height={320}
        alt="Weather Icon"
      />

      {/*Temperatures*/}
      <div className={styles.tempsCont}>
        <span className={styles.maxTemp}>{maxTemp}</span>
        <span className={styles.minTemp}>{minTemp}</span>
      </div>
    </div>
  );
}
