"use client"; //Client component

import styles from "./Search.module.css";
import Image from "next/image";
import { fetchLocation, setWeatherData } from "@/app/utils/utils";
import { useWeather } from "../hooks/useWeather";
import { FormEvent } from "react";

/**
 * Renders search input and button
 */
export default function Search() {
  const {
    isLocationFound,
    isLoading,
    setIsLoading,
    setIsLocationFound,
    setError,
    fetchWeatherData,
  } = useWeather();

  const search = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); //prevent page reload

    try {
      fetchWeatherData(null); //reset weather data state
      setIsLocationFound(null); //reset location found state
      setIsLoading(true); //loading data

      const formData = new FormData(event.currentTarget);
      const userInput = formData.get("searchInput");

      if (userInput && typeof userInput === "string") {
        const location = await fetchLocation(userInput);

        if (!location.isValid) {
          setIsLocationFound(false); //location not found
        } else {
          setIsLocationFound(true); //location found

          const weatherData = await setWeatherData(
            location.latitude,
            location.longitude
          );

          //set weather data
          fetchWeatherData({
            description: location.description,
            date: location.date,
            weather: weatherData,
          });

          console.log(weatherData);
        }
      }

      setIsLoading(false); //finish loading data
    } catch (error) {
      console.log(error);
      setError({
        title: "Something went wrong",
        message:
          "We couldn't connect to the server (API error). Please try again in a few moments.",
      });
    }
  };

  return (
    <section className={styles.searchSec}>
      <form onSubmit={search}>
        <div className={styles.formCont}>
          <div className={styles.searchCont}>
            {/*Search label*/}
            <label className="sr-only" htmlFor="searchInput">
              Search
            </label>

            {/*Search input*/}
            <input
              className={styles.search}
              type="search"
              name="searchInput"
              id="searchInput"
              placeholder="Search for a place..."
              required
            />

            {/*Search icon*/}
            <Image
              className={styles.searchIcon}
              src="images/icons/icon-search.svg"
              width={16}
              height={16}
              alt=""
            />
          </div>

          {/*Search button*/}
          <button className={styles.submitBtn} type="submit">
            Search
          </button>
        </div>
      </form>
    </section>
  );
}
