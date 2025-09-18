import Image from "next/image";
import styles from "./page.module.css";
import Search from "./components/Search/Search";

export default function Home() {
  return (
    <main className={styles.mainCont}>
      <header>
        <h1 className={styles.title}>How's the sky looking today?</h1>
      </header>

      <Search />
    </main>
  );
}
