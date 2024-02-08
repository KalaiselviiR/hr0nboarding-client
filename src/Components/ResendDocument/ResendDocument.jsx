import styles from "./ResendDocument.module.css";
import closeIcon from "../../assets/closeIcon.svg";
import { useState } from "react";
import {
  PHOTO,
  AADHAR_CARD,
  PAYSLIP,
  RELIEVING_LETTERS,
  CLIENT_SERVER_URL,
  TENTH_MARKSHEET,
  TWELFTH_MARKSHEET,
  UGDEGREE_CERTIFICATE,
  UGMARK_SHEET,
  PGMARK_SHEET,
  PGDEGREE_CERTIFICATE
} from "../../constants/constants";
import { resendDocuments } from "../../service/allapi";


function ResendDocument({ closeModal,onApiError,onApiSuccess,id }) {
  const [checkedItems, setCheckedItems] = useState([]);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const email = localStorage.getItem("email")

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
        from:email,
        id,
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
                id="tenthMarksheet"
                value={TENTH_MARKSHEET}
                checked={checkedItems.includes(TENTH_MARKSHEET)}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="tenthMarksheet">{TENTH_MARKSHEET} </label>
            </div>
            <div>
              <input
                type="checkbox"
                name=""
                id="twelfthMarksheet"
                value={TWELFTH_MARKSHEET}
                checked={checkedItems.includes(TWELFTH_MARKSHEET)}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="twelfthMarksheet">{TWELFTH_MARKSHEET} </label>
            </div>
            <div>
              <input
                type="checkbox"
                name=""
                id="ugDegreeCertificate"
                value={UGDEGREE_CERTIFICATE}
                checked={checkedItems.includes(UGDEGREE_CERTIFICATE)}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="ugDegreeCertificate">{UGDEGREE_CERTIFICATE} </label>
            </div>
            <div>
              <input
                type="checkbox"
                name=""
                id="ugMarksheet"
                value={UGMARK_SHEET}
                checked={checkedItems.includes(UGMARK_SHEET)}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="ugMarksheet">{UGMARK_SHEET} </label>
            </div>
            <div>
              <input
                type="checkbox"
                name=""
                id="pgDegreeCertificate"
                value={PGDEGREE_CERTIFICATE}
                checked={checkedItems.includes(PGDEGREE_CERTIFICATE)}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="pgDegreeCertificate">{PGDEGREE_CERTIFICATE} </label>
            </div>
            <div>
              <input
                type="checkbox"
                name=""
                id="pgMarksheet"
                value={PGMARK_SHEET}
                checked={checkedItems.includes(PGMARK_SHEET)}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="pgMarksheet">{PGMARK_SHEET} </label>
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
