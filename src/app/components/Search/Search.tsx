"use client"; //Client component

import styles from "./Search.module.css";
import Form from "next/form";
import Image from "next/image";

/**
 * Renders search input and button
 */
export default function Search() {
  const search = () => {
    //TO DO - use API https://open-meteo.com/
  };

  return (
    <section className={styles.searchSec}>
      <Form action={search}>
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
            />

            {/*Search icon*/}
            <Image
              className={styles.searchIcon}
              src="/images/icons/icon-search.svg"
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
      </Form>
    </section>
  );
}
