import React, { useState } from "react";
import styles from "@/styles/Home.module.css";
import Modal from "react-modal";

export default function creditPopup() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Credit</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className={styles.modal}
        ariaHideApp={false}
      >
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h1>Credit</h1>
          </div>
          <div className={styles.modalBody}>
            <p>All programming designed by Griffin Velichko</p>
            <p></p>
            <p>
              The data used to determine the validity of a submitted word comes
              from RapidAPI WordsAPI.
            </p>
            <p></p>
            <p>
              The ai software used to determine the daily competition comes from
              OpenAI CHAT GPT.
            </p>
            <p></p>
            <p>
              The website uses cookies to colledfsct statistics and show ads.
              More info in the privacy policy. *ADD HREF*
            </p>
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
