import React, { useState } from "react";
import styles from "@/styles/Home.module.css";
import Modal from "react-modal";

export default function gameComplete(highscore, score, gameNum) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className={styles.modal}
        ariaHideApp={false}
      >
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h1>Congrats!</h1>
          </div>
          <div className={styles.modalBody}>
            <h2>
              You got {gameNum} in {score} guesses!
            </h2>
            <p></p>
            <p>
              Try Again to beat the highscore {highscore} set by the AI
              algorithm!
            </p>
          </div>
          <div className={styles.modalFooter}>
            <button type="close" onClick={() => setIsOpen(false)}>
              Try Again
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
