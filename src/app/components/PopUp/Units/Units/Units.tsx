"use client"; //Client component

import { useState } from "react";
import styles from "./Units.module.css";
import Image from "next/image";
import UnitOption from "../UnitOption/UnitOption";
import { useWeather } from "@/app/components/hooks/useWeather";

/**
 * Renders Unit (Metric/Imperial) toggle pop up
 */
export default function Units() {
  const { isMetric, setIsMetric } = useWeather();

  const [showPopUp, setShowPopUp] = useState(false);

  /**
   * Toggles Units Pop-up visibility
   */
  const togglePopUp = () => {
    setShowPopUp((prev) => !prev);
  };

  /**
   * Toggles Units (Metric/Imperial)
   */
  const toggleMetric = () => {
    setIsMetric((prev) => !prev);
  };

  const currentUnits = isMetric ? "metric" : "imperial";

  return (
    <div
      className={styles.unitCont}
      role="region"
      aria-label={`Units pop up, current unit type: ${currentUnits}`}
    >
      {/*Units Toggle*/}
      <div className={`flex-center ${styles.gap}`} onClick={togglePopUp}>
        <Image
          src="images/icons/icon-units.svg"
          width={16}
          height={16}
          alt=""
        />
        <span className={styles.description}>Units</span>
        <Image
          src="images/icons/icon-dropdown.svg"
          width={16}
          height={16}
          alt=""
        />
      </div>

      {/*Units pop-up*/}
      {showPopUp ? (
        <div className={styles.selectUnitsCont}>
          <div className={styles.unitsToggle} onClick={toggleMetric}>
            <h2 className={styles.title}>
              {isMetric ? "Switch to Imperial" : "Switch to Metric"}
            </h2>
          </div>

          {/*Temperature*/}
          <h3 className={styles.unitTitle}>Temperature</h3>

          <UnitOption text="Celsius (°C)" isSelected={isMetric} />
          <UnitOption text="Fahrenheit (°F)" isSelected={!isMetric} />

          <hr className={styles.divider} />

          {/*Wind Speed*/}
          <h3 className={styles.unitTitle}>Wind Speed</h3>

          <UnitOption text="km/h" isSelected={isMetric} />
          <UnitOption text="mph" isSelected={!isMetric} />

          <hr className={styles.divider} />

          {/*Precipitation*/}
          <h3 className={styles.unitTitle}>Precipitation</h3>

          <UnitOption text="Milimeters (mm)" isSelected={isMetric} />
          <UnitOption text="Inches (in)" isSelected={!isMetric} />
        </div>
      ) : null}
    </div>
  );
}
