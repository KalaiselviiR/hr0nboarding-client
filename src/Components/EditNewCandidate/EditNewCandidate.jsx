import styles from './EditNewCandidate.module.css'

function EditNewCandidate() {

    const handleSubmit = () => {
        console.log('first')
    }

    return (
        <form onSubmit={handleSubmit} >
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
                                pattern='^[a-zA-Z][a-zA-Z\s]{2,20}$'
                                title='First Name must be atleat 3 charecters long'
                                required
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
                                pattern='^[a-zA-Z][a-zA-Z\s]*'
                                title='Enter a valid Last Name'
                                required
                            />
                        </div>
                    </div>
                    <div className={styles.inputDiv}>
                        <div className={styles.label}>
                            <p>Email</p>
                        </div>
                        <div className={styles.input}>
                            <input
                                type="email"
                                placeholder='olivia@techjays.com'
                                required
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
                                required
                                pattern='^[0-9]+$'
                                title='Enter a valid phone number'
                            />
                        </div>
                    </div >
                    <div className={styles.inputDiv}>
                        <div className={styles.label}>
                            <p>Designation</p>
                        </div>
                        <div className={styles.input}>
                            <input
                                type="text"
                                required
                                placeholder='Developer'
                                pattern='^[a-zA-Z][a-zA-Z\s]*'
                                title='Enter a valid Designation'
                            />
                        </div>
                    </div >
                    <div className={styles.inputDiv}>
                        <div className={styles.label}>
                            <p>Date of joining</p>
                        </div>
                        <div className={styles.input}>
                            <input id='date'
                                type="date"
                                required
                            />

                        </div>
                    </div >
                    <div className={styles.checkBoxDiv} >
                        <div>
                            <input
                                type="checkbox"
                            />
                        </div>
                        <div>
                            <p>Candidate is from outside india</p>
                        </div>
                    </div >
                    <div className={styles.buttonDiv} >
                        <div className={styles.saveButton}>
                            <button type='submit'>Save</button>
                        </div >
                        <div className={styles.resendLinkButton} >
                            <button type='submit' >Resend Link</button>
                        </div >

                    </div >

                </div >
            </div >
        </form>
    )
}

export default EditNewCandidate