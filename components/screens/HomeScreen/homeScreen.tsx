import styles from "./homeScreen.module.css";
import Image from "next/image";
import Link from "next/link";

function HomeScreen() {
  return (
    <div className={styles.container}>
      <div className={styles.img_box}>
        <Image
          className={styles.logo}
          src="/logo-white.png"
          alt="Logo"
          width={50}
          height={35}
          priority
        />
      </div>
      <div className={styles.text_box}>
        <h1 className={styles.primary_heading}>
          <span className={styles.primary_heading__main}>Comfort</span>
          <span className={styles.primary_heading__sub}>In Your Space</span>
        </h1>
        <Link legacyBehavior href="/apartments">
          <a className={`${styles.btn} ${styles.btn__white}`}>
            Get Your Dream Home
          </a>
        </Link>
      </div>
    </div>
  );
}

export default HomeScreen;
