import styles from "./Error.module.css";
import type { ErrorProps } from "../types";
import Image from "next/image";
import { useWeather } from "../hooks/useWeather";

/**
 * Renders error with:
 * - title
 * - message
 * - retry button
 *
 * Props are defined in {@link ErrorProps}.
 */
export default function Error({ title, message }: ErrorProps) {
  const { setError } = useWeather();

  /**
   * Resets the current error
   */
  const onRetry = () => {
    setError(null);
  };

  return (
    <section className={`flex-col-center ${styles.errorSec}`}>
      {/*Error Icon*/}
      <Image
        className={styles.errorIcon}
        src="/images/icons/icon-error.svg"
        width={18}
        height={18}
        alt=""
      />

      {/*Title*/}
      <h1 className={`text-center ${styles.title}`}>{title}</h1>

      {/*Description*/}
      <p className={`text-center ${styles.message}`}>{message}</p>

      {/*Retry button*/}
      <button className={styles.retryBtn} onClick={onRetry}>
        <div className={`flex-center ${styles.gap}`}>
          {/*Retry Icon*/}
          <Image
            className={styles.tempIcon}
            src="/images/icons/icon-retry.svg"
            width={48}
            height={48}
            alt=""
          />
          <span>Retry</span>
        </div>
      </button>
    </section>
  );
}
