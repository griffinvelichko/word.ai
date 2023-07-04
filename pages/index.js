import Head from "next/head";
import styles from "@/styles/Home.module.css";
import InfoPopup from "@/components/InfoPopup";
import CreditPopup from "@/components/CreditPopup";
import MainGame from "@/components/MainGame.js";
import PreviousGames from "@/components/PreviousGames";
import { getCurrentDate } from "@/components/GetCurrentDate.js";
import React, { useState, useRef, useEffect } from "react";

export default function Home(props) {
  console.log(props);
  const currentDate = getCurrentDate();
  const words = props.words;
  const [wordObj, setWordObj] = useState(
    words.find((word) => word.id === currentDate)
  );
  const gameRef = useRef();
  const [personalBestScore, setPersonalBestScore] = useState(0);
  const [wordPath, setWordPath] = useState([wordObj.startWord]);

  function handleGameSelect(word) {
    const currHistory = new Map(JSON.parse(localStorage.getItem("history")));
    if (currHistory) {
      const todayData = currHistory.get(currentDate);
      if (todayData) {
        setPersonalBestScore(todayData.personalBestScore);
        setWordPath(todayData.wordPath);
      }
    }
    setWordObj(word);
  }

  useEffect(() => {
    if (wordPath && wordObj && personalBestScore !== null) {
      gameRef.current && gameRef.current.initGame();
    }
  }, [wordPath, wordObj, personalBestScore]);

  return (
    <>
      <Head>
        <title>LETTR.AIL</title>
        <meta name="description" content="Your meta description here" />
      </Head>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>WORPH</h1>
          <div className={styles.nextto}>
            <InfoPopup />
            <PreviousGames words={words} onSelectWord={handleGameSelect} />
            <CreditPopup />
          </div>
        </header>
        <MainGame
          wordOfTheDay={wordObj.wordOfTheDay}
          game={wordObj.game}
          highscore={wordObj.highscore}
          startWord={wordObj.startWord}
          date={wordObj.id}
          initPath={wordPath}
          initPersonalBestScore={personalBestScore}
          ref={gameRef} // pass the ref to the MainGame component
        />
      </div>
    </>
  );
}

// Fetching data from the JSON file
import fsPromises from "fs/promises";
import path from "path";
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data.json");
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);

  return {
    props: objectData,
  };
}
