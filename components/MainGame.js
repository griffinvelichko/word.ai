import styles from "../styles/Home.module.css";
import useIsWordValid from "../utils/dictionary";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import Modal from "react-modal";
// import { getCurrentDate } from "./GetCurrentDate";

function InputField({ isDisabled, value, onChange, className, onClick }) {
  return (
    <input
      type="text"
      className={className}
      disabled={isDisabled}
      minLength={1}
      maxLength={1}
      value={value}
      onChange={onChange}
      onClick={onClick}
    />
  );
}

const MainGame = forwardRef(
  (
    {
      startWord,
      wordOfTheDay,
      game,
      highscore,
      date,
      initPath,
      initPersonalBestScore,
    },
    ref
  ) => {
    const fullyEnabled = new Array(startWord.length).fill(false);
    const [currentWord, setCurrentWord] = useState(startWord);
    const [prevWord, setPrevWord] = useState(startWord);
    const isValid = useIsWordValid(currentWord.join("").toLowerCase());
    const [score, setScore] = useState(0);
    const [personalBestScore, setPersonalBestScore] = useState(0);
    const [isComplete, setComplete] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isErrored, setIsErrored] = useState(false);
    const [isDisabled, setIsDisabled] = useState(fullyEnabled);
    const [mapGameHistory, setMapGameHistory] = useState(new Map());

    const [wordPath, setWordPath] = useState(initPath);

    useEffect(() => {
      // Perform localStorage action
      const currHistory = new Map(JSON.parse(localStorage.getItem("history")));
      if (currHistory) {
        setMapGameHistory(currHistory);
        const todayData = currHistory.get(date);
        if (todayData && todayData.personalBestScore > 0) {
          setPersonalBestScore(todayData.personalBestScore);
          setWordPath(todayData.wordPath);
        }
      }
    }, [date]);

    const handleSubmit = async () => {
      event.preventDefault();
      if (currentWord.toString() !== prevWord.toString() && isValid) {
        setIsSuccessful(true);
        setScore(score + 1);
        setPrevWord(currentWord);
        setWordPath([...wordPath, currentWord]);
        setIsDisabled(fullyEnabled);

        setTimeout(() => setIsSuccessful(false), 250);
        if (currentWord.toString() === wordOfTheDay.toString()) {
          setComplete(true);
          if (personalBestScore === 0 || score < personalBestScore) {
            setPersonalBestScore(score + 1);
            const completed = score + 1 === highscore;
            const todayData = {
              personalBestScore: score + 1,
              completed: completed,
              wordPath: [...wordPath, currentWord],
            };
            mapGameHistory.set(date, todayData);
            localStorage.clear();
            localStorage.setItem(
              "history",
              JSON.stringify(Array.from(mapGameHistory.entries()))
            );
          }
        }
      } else {
        setIsErrored(true);
        setCurrentWord(prevWord);
        setTimeout(() => setIsErrored(false), 250);
      }
    };

    const handleBack = async () => {
      if (currentWord.toString() !== prevWord.toString()) {
        setCurrentWord(prevWord);
      } else {
        if (score !== 0) {
          console.log("WordPath:");
          console.log(wordPath);
          setCurrentWord(wordPath[wordPath.length - 2]);
          setWordPath(wordPath.slice(0, -1));
          setPrevWord(wordPath[wordPath.length - 2]);
          setScore(score - 1);
        }
      }
    };

    const handleInputChange = (event, index) => {
      const newWord = [...currentWord];
      const newValue = event.target.value.toUpperCase();
      newWord[index] = newValue;
      setCurrentWord(newWord);
    };

    const initGame = () => {
      const todayData = mapGameHistory.get(date);
      if (todayData && todayData.completed) {
        const updatedPath = todayData.wordPath;
        setWordPath(updatedPath);
        setCurrentWord(updatedPath[updatedPath.length - 1]);
        setPrevWord(updatedPath[updatedPath.length - 2]);
        setScore(updatedPath.length - 1);
      } else {
        setWordPath([startWord]);
        setCurrentWord(startWord);
        setPrevWord(startWord);
        setScore(0);
      }
    };

    const finishGame = () => {
      setComplete(false);
      if (score !== highscore) {
        setWordPath([startWord]);
        setCurrentWord(startWord);
        setPrevWord(startWord);
        setScore(0);
      }
    };

    useImperativeHandle(ref, () => ({
      initGame: () => {
        initGame();
      },
    }));

    useEffect(() => {
      if (currentWord.toString() !== prevWord.toString()) {
        setIsDisabled(() => {
          return prevWord.map((letter, index) => {
            return letter !== currentWord[index] ? false : true;
          });
        });
      } else {
        setIsDisabled(fullyEnabled);
      }
    }, [currentWord, prevWord]);

    return (
      <>
        <div>
          <Modal
            isOpen={isComplete}
            onRequestClose={() => finishGame()}
            className={styles.modal}
            ariaHideApp={false}
          >
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h1>Congrats!</h1>
              </div>
              <div className={styles.modalBody}>
                <h2>
                  You got Game: {game}
                  <br />
                  on Move: {score}!
                </h2>
                <p></p>
                {highscore !== score && (
                  <p>
                    Try Again to beat the highscore {highscore} set by the AI
                    algorithm!
                  </p>
                )}
                {highscore === score && (
                  <p>
                    Congrats you bested our AI algorithm! Try Again tomorrow to
                    show it who's boss!
                  </p>
                )}
              </div>
              <div className={styles.modalFooter}>
                <button type="close" onClick={() => finishGame()}>
                  Back
                </button>
              </div>
            </div>
          </Modal>
        </div>
        <section className={styles.content}>
          {mapGameHistory.get(date) && mapGameHistory.get(date).completed && (
            <div>
              <h2>Congrats!</h2>
              <h3>You Got Today's Highscore of {highscore}!</h3>
              <h3>Check tomorrow for a new challenge.</h3>
            </div>
          )}
          <div>
            <div className={styles.infoContainer}>
              <div className={styles.infoBoxContainer}>
                <div className={styles.infoBox}>
                  <h4 className={styles.info}>Game #: {game}</h4>
                  <h4 className={styles.info}>Moves: {score}</h4>
                </div>
                <div className={styles.infoBox}>
                  <h4 className={styles.infoBelow}>
                    Personal Highscore:{" "}
                    {(mapGameHistory.get(date) &&
                      mapGameHistory.get(date).personalBestScore) ||
                      0}
                  </h4>
                </div>
              </div>
              <div className={styles.infoWordBox}>
                <h3>WORD OF THE DAY:</h3>
                <div className={styles.nextto}>
                  {wordOfTheDay.map((letter, index) => (
                    <p key={index} className={styles.letterbox}>
                      {letter}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <h2>CURRENT WORD:</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.nextto}>
                {currentWord.map((letter, index) => (
                  <InputField
                    key={index}
                    className={`${
                      isSuccessful
                        ? styles.success
                        : `${isErrored ? styles.errored : ""}`
                    }`}
                    isDisabled={isDisabled[index]}
                    value={letter}
                    onChange={(event) => handleInputChange(event, index)}
                    onClick={(event) => {
                      event.target.select();
                    }}
                  />
                ))}
              </div>
              <div className={styles.nextto}>
                <input type="button" value="Back" onClick={handleBack} />
                <input type="submit" value="Submit" />
              </div>
            </form>
          </div>
          <h2>SUBMITTED WORDS:</h2>
          <ol>
            {wordPath
              .slice(0)
              .reverse()
              .map((word, wordIndex) => (
                <li key={wordIndex} className={styles.nextto}>
                  {word.map((letter, letterIndex) => (
                    <p key={letterIndex} className={styles.letterbox}>
                      {letter}
                    </p>
                  ))}
                </li>
              ))}
          </ol>
        </section>
      </>
    );
  }
);

export default MainGame;
