"use client"; //Client component

import { useState } from "react";
import styles from "./Days.module.css";
import Image from "next/image";

/**
 * Renders days of the week toggle pop up
 */
export default function Days() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [daysList, setDaysList] = useState([
    {
      dayName: "Monday",
      isSelected: true,
    },
    {
      dayName: "Tuesday",
      isSelected: false,
    },
    {
      dayName: "Wednesday",
      isSelected: false,
    },
    {
      dayName: "Thursday",
      isSelected: false,
    },
    {
      dayName: "Friday",
      isSelected: false,
    },
    {
      dayName: "Saturday",
      isSelected: false,
    },
    {
      dayName: "Sunday",
      isSelected: false,
    },
  ]);

  /**
   * Toggles week days Pop-up visibility
   */
  const togglePopUp = () => {
    setShowPopUp((prev) => !prev);
  };

  /*
   * Updates the selected week day
   */
  const updateSelectedDay = (dayName: string) => {
    //update selected day
    setDaysList((prevDays) =>
      prevDays.map((day) =>
        day.dayName === dayName
          ? { ...day, isSelected: true }
          : { ...day, isSelected: false }
      )
    );
    //close pop up
    togglePopUp();
  };

  return (
    <div className={styles.daysCont}>
      {/*Current selected day*/}
      <div className={`flex-center ${styles.dayImgCont}`} onClick={togglePopUp}>
        {daysList.map((day, index) =>
          day.isSelected ? (
            <span key={index} className={styles.selectedDay}>
              {day.dayName}
            </span>
          ) : null
        )}
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
            {daysList.map((day, index) => (
              <span
                key={index}
                className={styles.day}
                onClick={() => {
                  updateSelectedDay(day.dayName);
                }}
              >
                {day.dayName}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
