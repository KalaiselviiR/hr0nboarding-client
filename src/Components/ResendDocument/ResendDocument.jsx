import styles from './ResendDocument.module.css'



function ResendDocument({ closeModal }) {


    const handleSubmit = () => {

        
        closeModal()
    }


    return (
        <div className={styles.modalBackground}>
            <div className={styles.main}>
                <div className={styles.heading}>
                    <p>Resend Document</p>
                </div>

                <div className={styles.checkBoxDiv}>
                    <div>
                        <input type="checkbox" name="" />
                        <p>Photo</p>
                    </div>
                    <div>
                        <input type="checkbox" name="" />
                        <p>Aadhar Card</p>
                    </div>
                    <div>
                        <input type="checkbox" name="" />
                        <p>Educational Certificate</p>
                    </div>
                    <div>
                        <input type="checkbox" name="" />
                        <p>Relieving Letters from all your previous organization</p>
                    </div>
                    <div>
                        <input type="checkbox" name="" />
                        <p>3 Month PaySlip</p>
                    </div>
                </div>

                <p className={styles.note}>Note(optional)</p>
                <div className={styles.textarea}>
                    <textarea style={{ width: '100%' }} name="" cols="" rows="" placeholder=' Enter a description...'>

                    </textarea>
                </div>

                <div className={styles.submit}>
                    <button onClick={handleSubmit} >Submit</button>
                </div>

            </div>
        </div>
    )
}

export default ResendDocument