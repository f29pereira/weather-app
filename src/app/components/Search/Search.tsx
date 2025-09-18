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
    <section>
      <Form action={search}>
        <div className={styles.searchCont}>
          <input
            className={styles.search}
            type="search"
            name=""
            id=""
            placeholder="Search for a place..."
          />

          <Image
            className={styles.searchIcon}
            src="/images/icons/icon-search.svg"
            width={16}
            height={16}
            alt=""
          />
        </div>

        <button className={styles.submitBtn} type="submit">
          Search
        </button>
      </Form>
    </section>
  );
}
