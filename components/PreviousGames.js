import React, { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import Modal from "react-modal";
import { getCurrentDate } from "@/components/GetCurrentDate.js";

export default function PreviousGames(props) {
  const [isOpen, setIsOpen] = useState(false);
  const currentDate = getCurrentDate();
  const [mapGameHistory, setMapGameHistory] = useState(new Map());

  const filteredWords = props.words.filter((word) => word.id <= currentDate);

  useEffect(() => {
    // Perform localStorage action
    const currHistory = new Map(JSON.parse(localStorage.getItem("history")));
    if (currHistory) {
      setMapGameHistory(currHistory);
    }
  }, [isOpen]);

  const saveToLocalStorage = (map) => {
    const serializedMap = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem("history", serializedMap);
  };

  const handleGameSelect = (word) => {
    props.onSelectWord(word);
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Previous Games</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className={styles.modal}
        ariaHideApp={false}
      >
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h1>Previous Games</h1>
          </div>
          <div className={styles.gameModalBody}>
            <ol className={`${styles.gameListContainer} ${styles.scrollable}`}>
              {filteredWords
                .slice(0)
                .reverse()
                .map((word) => (
                  <button
                    className={styles.gameListItems}
                    key={word.id}
                    type="game"
                    onClick={() => {
                      handleGameSelect(word);
                    }}
                  >
                    <div className={styles.itemText}>
                      #{word.game} - Date:{" "}
                      {word.id.substring(4, word.id.length - 2)}/
                      {word.id.substring(6)}
                    </div>
                    <div className={styles.itemText}>
                      {mapGameHistory.has(word.id) &&
                      mapGameHistory.get(word.id).completed ? (
                        <p>Complete</p>
                      ) : null}
                    </div>
                  </button>
                ))}
            </ol>
          </div>
          <div className={styles.modalFooter}>
            <button type="close" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
