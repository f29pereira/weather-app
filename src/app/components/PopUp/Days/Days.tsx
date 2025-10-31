"use client"; //Client component

import { useState } from "react";
import styles from "./Days.module.css";
import Image from "next/image";
import { useWeather } from "../../hooks/useWeather";

/**
 * Renders days of the week toggle pop up
 */
export default function Days() {
  const { weatherData, setWeatherData } = useWeather();

  const [showPopUp, setShowPopUp] = useState(false);

  /**
   * Toggles week days Pop-up visibility
   */
  const togglePopUp = () => {
    setShowPopUp((prev) => !prev);
  };

  /*
   * Updates the selected week day
   */
  const updateSelectedDay = (selectedDay: string) => {
    if (!weatherData) {
      return;
    }

    const updatedDays = weatherData.days.map((day) => ({
      ...day,
      isSelected: day.name === selectedDay,
    }));

    //update days state
    setWeatherData((prevData) =>
      prevData
        ? {
            ...prevData,
            days: updatedDays,
          }
        : prevData
    );

    //close pop-up
    togglePopUp();
  };

  return (
    <div className={styles.daysCont}>
      <div
        data-testid="selected-day"
        className={`flex-center ${styles.dayImgCont}`}
        onClick={togglePopUp}
      >
        {/*Current selected day*/}
        {weatherData?.days?.map((day, index) =>
          day.isSelected ? (
            <span key={index} className={styles.selectedDay}>
              {day.name}
            </span>
          ) : null
        ) ?? null}
        {/*Dropdown icon*/}
        <Image
          src="images/icons/icon-dropdown.svg"
          width={16}
          height={16}
          alt=""
        />
      </div>

      {/*Days Pop up*/}
      {showPopUp ? (
        <div className={styles.popUpCont}>
          <div className={styles.daysCont}>
            {weatherData?.days?.map((day, index) => (
              <span
                key={index}
                className={styles.day}
                onClick={() => {
                  updateSelectedDay(day.name);
                }}
              >
                {day.name}
              </span>
            )) ?? null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
