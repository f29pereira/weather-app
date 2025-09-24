import styles from "./page.module.css";
import Weather from "./components/Weather/Weather";

export default function Home() {
  return (
    <main className={styles.mainCont}>
      <Weather />
    </main>
  );
}
