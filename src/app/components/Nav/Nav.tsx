import styles from "./Nav.module.css";
import Image from "next/image";
import Units from "../UnitsPopUp/Units/Units";

/**
 * Renders nav with Weather Now logo and Units component
 */
export default function Nav() {
  return (
    <nav className={styles.nav}>
      {/*Logo*/}
      <Image
        className={styles.logoImg}
        src="/images/logo.svg"
        width={197}
        height={40}
        alt="Weather Now Logo"
      />
      {/*Units Dropdown*/}
      <Units />
    </nav>
  );
}
