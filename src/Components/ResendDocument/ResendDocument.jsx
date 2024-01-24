import styles from "./ResendDocument.module.css";
import closeIcon from "../../assets/closeIcon.svg";
import { useState } from "react";
import {
  PHOTO,
  AADHAR_CARD,
  PAYSLIP,
  EDUCATIONAL_CERTIFICATE,
  RELIEVING_LETTERS,
} from "../../constants/constants";

function ResendDocument({ closeModal }) {
  const [checkedItems, setCheckedItems] = useState([]);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    console.log({ value, checked });
    setCheckedItems((prevItems) =>
      checked
        ? [...prevItems, value]
        : prevItems.filter((item) => item !== value)
    );

    if (checkedItems.length === 0 && checked) {
      setError("");
    }
  };

  const handleNoteChange = (event) => {
    const { value } = event.target;
    setNote(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (checkedItems.length === 0) {
      setError("Please select at least one document");
      return;
    }

    console.log({
      documents: checkedItems,
      note,
    });

    setError("");

    closeModal();
  };

  const handleClose = () => {
    if (closeModal) {
      closeModal();
    }
  };

  return (
    <div className={styles.modalBackground}>
      <div className={styles.main}>
        <div className={styles.heading}>
          <p>Resend Document</p>
          <div>
            <img onClick={handleClose} src={closeIcon} alt="closeIcon" />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.checkBoxDiv}>
            <div>
              <input
                type="checkbox"
                name=""
                id="photo"
                value={PHOTO}
                checked={checkedItems.includes(PHOTO)}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="photo">{PHOTO} </label>
            </div>
            <div>
              <input
                type="checkbox"
                name=""
                id="aadhar"
                value={AADHAR_CARD}
                checked={checkedItems.includes(AADHAR_CARD)}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="aadhar">{AADHAR_CARD} </label>
            </div>
            <div>
              <input
                type="checkbox"
                name=""
                id="certificates"
                value={EDUCATIONAL_CERTIFICATE}
                checked={checkedItems.includes(EDUCATIONAL_CERTIFICATE)}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="certificates">{EDUCATIONAL_CERTIFICATE} </label>
            </div>
            <div>
              <input
                type="checkbox"
                name=""
                id="relieving-letters"
                value={RELIEVING_LETTERS}
                checked={checkedItems.includes(RELIEVING_LETTERS)}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="relieving-letters">{RELIEVING_LETTERS} </label>
            </div>
            <div>
              <input
                type="checkbox"
                name=""
                id="payslip"
                value={PAYSLIP}
                checked={checkedItems.includes(PAYSLIP)}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="payslip">{PAYSLIP} </label>
            </div>
          </div>

          <p className={styles.note}>Note(optional)</p>
          <div className={styles.textarea}>
            <textarea
              style={{ width: "100%" }}
              name=""
              cols=""
              rows=""
              placeholder=" Enter a description..."
              value={note}
              onChange={handleNoteChange}
            ></textarea>
          </div>

          <div className={styles.submit}>
            {error && <p className={styles.error}>{error}</p>}
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResendDocument;
