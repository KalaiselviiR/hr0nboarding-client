import styles from './AddNewCandidate.module.css'

function AddNewCandidate() {
    return (
        <form >
            <div className={styles.addMain}>
                <div className={styles.addHeader}>
                    <p> Add New Candidate</p>
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
                                required
                                pattern="[A-Za-z\s]{3,15}"
                                title="First Name must be at least 3 charecters"
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
                                pattern="[A-Za-z\s]{1,5}"
                                // title="Enter a valid name"
                            />

                        </div>
                    </div>
                    <div className={styles.inputDiv}>
                        <div className={styles.label}>
                            <p>Email</p>
                        </div>
                        <div className={styles.input}>
                            <input type="email"
                                placeholder='olivia@techjays.com'
                            />
                        </div>
                    </div>
                    <div className={styles.inputDiv}>
                        <div className={styles.label}>
                            <p>Phone number</p>
                        </div>
                        <div className={styles.phoneInput}>
                            <select class="country-code">
                                <option value="+1">IN </option>
                                <option value="+44">US</option>
                            </select>
                            <input type="text"
                                placeholder='8845789956'
                            />
                        </div>
                    </div>
                    <div className={styles.inputDiv}>
                        <div className={styles.label}>
                            <p>Designation</p>
                        </div>
                        <div className={styles.input}>
                            <input type="text"
                                placeholder='Developer'
                            />
                        </div>
                    </div>
                    <div className={styles.inputDiv}>
                        <div className={styles.label}>
                            <p>Date of joining</p>
                        </div>
                        <div className={styles.input}>
                            <input id='date' type="date" />
                        </div>
                    </div>
                    <div className={styles.checkBoxDiv}>
                        <div>
                            <input type="checkbox" />
                        </div>
                        <div>
                            <p>Candidate is from outside india</p>
                        </div>
                    </div>
                    <div className={styles.submitDiv}>
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default AddNewCandidate