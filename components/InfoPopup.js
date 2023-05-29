import React, { useState } from "react";
import styles from "@/styles/Home.module.css";
import Modal from "react-modal";

export default function infoPopup() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Rules</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className={styles.modal}
        ariaHideApp={false}
      >
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h1>How to Play?</h1>
          </div>
          <div className={styles.modalBody}>
            <p>Transform the CURRENT WORD to the WORD OF THE DAY.</p>
            <p></p>
            <p>
              Change one letter of the CURRENT WORD to create a new word. With
              each new word try to get closer to the WORD OF THE DAY.
            </p>
            <p></p>
            <p>
              Our AI software has found the least amount of new words needed to
              transform the CURRENT WORD to the WORD OF THE DAY.
            </p>
            <p></p>
            <p>
              WIN THE GAME by transforming to the WORD OF THE DAY in the least
              amount of attempts!
            </p>
            <p></p>
            <p>Once you're done, check back tomorrow for a new challenge!</p>
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
