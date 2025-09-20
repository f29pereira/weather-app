import styles from "./UnitOption.module.css";
import Image from "next/image";
import type { UnitOptionProps } from "../../../types";

/**
 * Renders a unit with a checkmark if it is selected
 *
 * Props are defined in {@link UnitOptionProps}.
 */
export default function UnitOption({ text, isSelected }: UnitOptionProps) {
  return (
    <div className={`${styles.unit} ${isSelected ? styles.unitSelected : ""}`}>
      <span>{text}</span>
      {isSelected ? (
        <Image
          className={styles.checkmark}
          src="images/icons/icon-checkmark.svg"
          width={10}
          height={10}
          alt=""
        ></Image>
      ) : null}
    </div>
  );
}
