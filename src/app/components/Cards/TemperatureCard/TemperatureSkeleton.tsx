import styles from "./TemperatureSkeleton.module.css";
import Image from "next/image";

/**
 * Renders Temperature component skeleton with loading icon and text
 */
export default function TemperatureSkeleton() {
  return (
    <div className={`flex-col-center ${styles.tempCardBgLoading}`}>
      <div className={`flex-center ${styles.loadingIconCont}`}>
        <Image
          data-testid="loading-icon"
          className={styles.loadingIcon}
          src="images/icons/icon-loading.svg"
          width={48}
          height={48}
          alt=""
        />
      </div>
      <p className={`text-center ${styles.loadingText}`}>Loading...</p>
    </div>
  );
}
