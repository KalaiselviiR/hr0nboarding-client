import styles from './AddNewCandidate.module.css'
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { addCandidate } from '../../service/allapi'

function AddNewCandidate() {

    //create an object to store datas from input
    const [userData, setUser] = useState({
        fname: "",
        lname: "",
        email: "",
        phno: "",
        dsesignation: "",
        jdate: "",
        region: ""
    })
    //object for useNavigate
    const navigate = useNavigate()
    // a function to update userdata when user enter the input in html
    const userDetails = (e) => {
        //prevent the event
        e.preventDefault()
        //access value to update in userData
        const { value } = e.target
        //access key to update in userData
        const key = e.target.name
        //update the data with existing data
        setUser({ ...userData, [key]: value })

    }
    console.log(userData);


    const handleSubmit = async (e) => {
        e.preventDefault()


        //api call
        const response = await addCandidate(userData)

        if (response.status == 200) {
            toast.success(response.data.message);
            setTimeout(() => {
                navigate('/dashboard')
            }, 1500);

            //reset all states datas
            setUser({
                fname: "",
                lname: "",
                email: "",
                phno: "",
                dsesignation: "",
                jdate: "",
                region: ""

            })

        } else {
            // toast.error(response.data.message)
        }


    }
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
                            <input name="fname" required onChange={userDetails} id='nam'
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
                            <input
                                type="text"
                                required onChange={userDetails}
                                placeholder='olivia'
                                name="lname"
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
                                name="email"
                                required onChange={userDetails}
                            />
                        </div>
                    </div>
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
                                name="phno"
                                onChange={userDetails}
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
                                placeholder='Developer'
                                name="designation"
                                onChange={userDetails}
                            />
                        </div>
                    </div>

                    <div className={styles.inputDiv}>
                        <div className={styles.label}>
                            <p>Date of joining</p>
                        </div>
                        <div className={styles.input}>
                            <input
                                id='date'
                                type="date"
                                name="jdate"
                                onChange={userDetails}
                            />

                        </div>
                    </div >
                    <div className={styles.checkBoxDiv}>
                        <div>
                            <input name='region' type="checkbox" onChange={userDetails} />
                        </div>
                        <div>
                            <p>Candidate is from outside india</p>
                        </div>
                    </div>
                    <div className={styles.submitDiv}>
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </div >
            </div>
        </form >
    )
}

export default AddNewCandidate