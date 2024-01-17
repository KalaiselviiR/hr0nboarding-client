import styles from './EditNewCandidate.module.css'

function EditNewCandidate() {
    return (
        <div className={styles.addMain}>
            <div className={styles.addHeader}>
                <p> Edit Candidate</p>
            </div>
            <div className={styles.addBody}>
                <div className={styles.inputDiv}>
                    <div className={styles.label}>
                        <p>First Name</p>
                    </div>
                    <div className={styles.input}>
                        <input
                            type="text"
                            placeholder='olivia'
                        />
                    </div>
                </div>
                <div className={styles.inputDiv}>
                    <div className={styles.label}>
                        <p>Last Name</p>
                    </div>
                    <div className={styles.input}>
                        <input type="text"
                            placeholder='olivia'
                        />
                    </div>
                </div>
                <div className={styles.inputDiv}>
                    <div className={styles.label}>
                        <p>Email</p>
                    </div>
                    <div className={styles.input}>
                        <input type="text"
                            placeholder='olivia@techjays.com'
                        />
                    </div>
                </div >
                <div className={styles.inputDiv}>
                    <div className={styles.label}>
                        <p>Phone number</p>
                    </div>
                    <div className={styles.phoneInput}>
                        <select className="country-code">
                            <option value="+1">IN </option>
                            <option value="+44">US</option>
                        </select>
                        <input type="text"
                            placeholder='8845789956'
                        />
                    </div>
                </div >
                <div className={styles.inputDiv}>
                    <div className={styles.label}>
                        <p>Designation</p>
                    </div>
                    <div className={styles.input}>
                        <input type="text"
                            placeholder='Developer'
                        />
                    </div>
                </div >
                <div className={styles.inputDiv}>
                    <div className={styles.label}>
                        <p>Date of joining</p>
                    </div>
                    <div className={styles.input}>
                        <input id='date' type="date" />
                    </div>
                </div >
                <div className={styles.checkBoxDiv} >
                    <div>
                        <input type="checkbox" />
                    </div>
                    <div>
                        <p>Candidate is from outside india</p>
                    </div>
                </div >
                <div className={styles.buttonDiv} >
                    <div className={styles.saveButton}>
                        <button>Save</button>
                    </div >
                    <div className={styles.resendLinkButton} >
                        <button>Resend Link</button>
                    </div >

                </div >

            </div >
        </div >
    )
}

export default EditNewCandidate