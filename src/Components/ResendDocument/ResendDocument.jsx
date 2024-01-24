import styles from "./ResendDocument.module.css";
import closeIcon from "../../assets/closeIcon.svg";
import { useState } from "react";
import {
  PHOTO,
  AADHAR_CARD,
  PAYSLIP,
  EDUCATIONAL_CERTIFICATE,
  RELIEVING_LETTERS,
  CLIENT_SERVER_URL,
} from "../../constants/constants";
import { resendDocuments } from "../../service/allapi";


function ResendDocument({ closeModal,onApiError,onApiSuccess }) {
  const [checkedItems, setCheckedItems] = useState([]);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [isLoading,setIsLoading] = useState(false);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (checkedItems.length === 0) {
      setError("Please select at least one document");
      return;
    }

    setIsLoading(true); 
    
    try {

      const data = {
        from:'hr@techjays.com',
        to:'candidate@techjays.com',
        documents:checkedItems,
        note,
        resendLink:`${CLIENT_SERVER_URL}/candidateForm`
  
      }
      const response = await resendDocuments(data)
      
      if (response.status !== 200) {
        throw new Error('something went wrong');
      }

      if(response){
        onApiSuccess(response.data.message)
      }
      
    } catch (error) {
      onApiError(error.message)
    }finally{
      setIsLoading(false);
    }
    

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
            <button>
              {
                isLoading ? 'sending..' : 'Submit'
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResendDocument;
