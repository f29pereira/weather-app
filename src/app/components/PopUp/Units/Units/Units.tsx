"use client"; //Client component

import { useState } from "react";
import styles from "./Units.module.css";
import Image from "next/image";
import UnitOption from "../UnitOption/UnitOption";

/**
 * Renders Unit (Metric/Imperial) toggle pop up
 */
export default function Units() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [unitToggle, setUnitToggle] = useState("metric");

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
    setUnitToggle((prev) => (prev === "metric" ? "imperial" : "metric"));
  };

  return (
    <div className={styles.unitCont}>
      {/*Units Toggle*/}
      <div className={`flex-center ${styles.gap}`} onClick={togglePopUp}>
        <Image
          src="/images/icons/icon-units.svg"
          width={16}
          height={16}
          alt=""
        />
        <span className={styles.description}>Units</span>
        <Image
          src="/images/icons/icon-dropdown.svg"
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
              {unitToggle === "metric"
                ? "Switch to Metric"
                : "Switch to Imperial"}
            </h2>
          </div>

          {/*Temperature*/}
          <h3 className={styles.unitTitle}>Temperature</h3>

          <UnitOption
            text="Celsius (°C)"
            isSelected={unitToggle === "imperial"}
          />
          <UnitOption
            text="Fahrenheit (°F)"
            isSelected={unitToggle === "metric"}
          />

          <hr className={styles.divider} />

          {/*Wind Speed*/}
          <h3 className={styles.unitTitle}>Wind Speed</h3>

          <UnitOption text="km/h" isSelected={unitToggle === "imperial"} />
          <UnitOption text="mph" isSelected={unitToggle === "metric"} />

          <hr className={styles.divider} />

          {/*Precipitation*/}
          <h3 className={styles.unitTitle}>Precipitation</h3>

          <UnitOption
            text="Milimeters (mm)"
            isSelected={unitToggle === "imperial"}
          />
          <UnitOption text="Inches (in)" isSelected={unitToggle === "metric"} />
        </div>
      ) : null}
    </div>
  );
}
