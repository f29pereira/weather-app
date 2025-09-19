import styles from "./ForeCastList.module.css";
import type { ForeCastListProps } from "@/app/components/types";
import DayForeCast from "../DayForeCast/DayForeCast";

/**
 * Renders grid of DayForeCast components
 *
 * Props are defined in {@link ForeCastListProps}.
 */
export default function ForeCastList({ foreCastList }: ForeCastListProps) {
  return (
    <section className={styles.foreCastSec}>
      <h3 className={styles.title}>Daily forecast</h3>

      <div className={styles.foreCastGrid}>
        {foreCastList.map((foreCast, index) => (
          <DayForeCast
            key={index}
            day={foreCast.day}
            imgTemp={foreCast.imgTemp}
            maxTemp={foreCast.maxTemp}
            minTemp={foreCast.minTemp}
          />
        ))}
      </div>
    </section>
  );
}
