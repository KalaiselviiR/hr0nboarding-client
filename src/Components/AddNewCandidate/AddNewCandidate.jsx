import styles from './AddNewCandidate.module.css'
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { addCandidate } from '../../service/allapi'
import closeIcon from '../../assets/closeIcon.svg'

function AddNewCandidate({ close, onAddData }) {

    //create an object to store datas from input
    const [userData, setUser] = useState({
        fname: "",
        lname: "",
        email: "",
        countryCode: "+91",
        phno: "",
        dsesignation: "",
        jdate: "",
        region: false,
        status: "Pending",
        isDelete: "no"


    })

    const navigate = useNavigate()


    const userDetails = (e) => {


        const { value } = e.target
        const key = e.target.name
        const { checked } = e.target

        if (key === 'region') {
            setUser({ ...userData, [key]: checked })
        }
        else {
            setUser({ ...userData, [key]: value })
        }
    }
    console.log(userData);


    const handleClose = () => {
        if (close) {
            close()
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        handleClose()
        const response = await addCandidate(userData)

        if (response.status == 200) {
            toast.success(response.data.message);
            onAddData(response.data.newUser)

    

        } else {
            toast.error(response.response.data)
            
        }


    }


   
    return (
        <form onSubmit={handleSubmit} >
            <div className={styles.addMain}>
                <div className={styles.addHeader}>
                    <p> Add New Candidate</p>
                    <div>
                        <img onClick={handleClose} src={closeIcon} alt="close-icon" />
                    </div>
                </div>
                <div className={styles.addBody}>
                    <div className={styles.inputDiv}>
                        <div className={styles.label}>
                            <p>First Name</p>
                        </div>
                        <div className={styles.input}>
                            <input name="fname" required onChange={userDetails} id='nam'
                                type="text"
                                placeholder='First Name'
                                pattern='^[a-zA-Z][a-zA-Z\s]{2,20}$'
                                title='First Name must be atleat 3 charecters long'
                                autoComplete="off"

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
                                placeholder='Last Name'
                                name="lname"
                                pattern='^[a-zA-Z][a-zA-Z\s]*'
                                title='Enter a valid Last Name'
                                autoComplete="off"
                            />

                        </div>
                    </div>
                    <div className={styles.inputDiv}>
                        <div className={styles.label}>
                            <p>Email</p>
                        </div>
                        <div className={styles.input}>
                            <input
                                type="text"
                                placeholder='Email'
                                name="email"
                                required
                                onChange={userDetails}
                                pattern='^[^\s@]+@[^\s@]+\.[^\s@]+$'
                                title='enter a valid email'
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className={styles.inputDiv}>
                        <div className={styles.label}>
                            <p>Phone number</p>
                        </div>
                        <div className={styles.phoneInput}>
                            <select className="country-code"
                                name="countryCode"
                                onChange={userDetails}
                            >
                                <option selected value="+91">IN(+91)</option>
                                <option value="+880">BD(+880)</option>
                                <option value="+1">US(+1)</option>
                                <option value="+20">EG(+20)</option>
                            </select>
                            <input type="text"
                                placeholder="(555) 000-0000"
                                name="phno"
                                required
                                onChange={userDetails}
                                pattern='^\d{10,}$'
                                title='Enter a valid phone number'
                                autoComplete="off"
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
                                placeholder='Designation'
                                name="dsesignation"
                                onChange={userDetails}
                                pattern='^[a-zA-Z][a-zA-Z\s]*'
                                title='Enter a valid Designation'
                                autoComplete="off"
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
                                required
                                type="date"
                                name="jdate"
                                onChange={userDetails}
                            />

                        </div>
                    </div >
                    <div className={styles.checkBoxDiv}>
                        <div>
                        <input name='region' type="checkbox" checked={userData.region} onChange={userDetails} />
                        </div>
                        <div>
                            <p>Candidate is from outside india</p>
                        </div>
                    </div>
                    <div className={styles.submitDiv}>
                        <button type='submit'>Submit</button>
                    </div>
                </div >
            </div>
        </form >
    )
}

export default AddNewCandidate