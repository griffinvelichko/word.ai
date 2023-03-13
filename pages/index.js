import Head from "next/head";
import styles from "@/styles/Home.module.css";
import InfoPopup from "../components/InfoPopup";

export default function Home() {
  return (
    <>
      <Head>
        <title>WORD.AI</title>
      </Head>
      <header className={styles.header}>
        <h1>WORD.AI</h1>
        <InfoPopup />
      </header>
      <section className={styles.content}>
        <div className={styles.nextto}>
          <h1>
            WORD OF THE DAY:
            <div className={styles.nextto}>
              <p className={styles.letterbox}>C</p>
              <p className={styles.letterbox}>A</p>
              <p className={styles.letterbox}>T</p>
            </div>
          </h1>
        </div>
        <h1>CURRENT WORD:</h1>
        <div className={styles.nextto}>
          <input type="text" maxLength={1} />
          <input type="text" maxLength={1} />
          <input type="text" maxLength={1} />
        </div>
        <input type="button" value="Submit" />
      </section>
    </>
  );
}
