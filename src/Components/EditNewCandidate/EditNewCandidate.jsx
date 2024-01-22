import React, { useEffect, useState } from 'react';
import styles from './EditNewCandidate.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { editCandidate, getSingleCandidate } from '../../service/allapi';
import moment from 'moment';
import closeIcon from '../../assets/closeIcon.svg'

function EditNewCandidate({ UserToEdit, close }) {
    //create an object to store datas from input
    const [editdata, setEditData] = useState({
        fname: "",
        lname: "",
        email: "",
        phno: "",
        dsesignation: "",
        jdate: "",
        region: ""
    })

    // const [editdata, setEditData] = useState({})
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
        setEditData({ ...editdata, [key]: value })

    }
    console.log(editdata);


    const handleSubmit = async (e) => {
        e.preventDefault()

        //api call
        const response = await editCandidate(editdata._id, editdata)
        // console.log(response);
        if (response.status == 200) {
            toast.success(response.data.message);
            close()

            //reset all states datas
            setEditData({
                fname: "",
                lname: "",
                email: "",
                phno: "",
                dsesignation: "",
                jdate: "",
                region: ""

            })

        } else {
            toast.error(response.data.message)
        }
    }
    useEffect(() => {
        if (UserToEdit) {
            setEditData(UserToEdit);


        } else {
            setEditData(UserToEdit)
        }
    }, [UserToEdit])
    // console.log(teamData);

    const handleClose = () => {
        if (close) {
            close()
        }
    }

    return (

        <div className={styles.addMain}>
            <div className={styles.addHeader}>
                <p> Edit Candidate</p>
                <div>
                    <img onClick={handleClose} src={closeIcon} alt="" />
                </div>
            </div>
            <div className={styles.addBody}>
                <div className={styles.inputDiv}>
                    <div className={styles.label}>
                        <p>First Name</p>
                    </div>
                    <div className={styles.input}>
                        <input
                            type="text" name="fname" required onChange={userDetails}
                            value={editdata.fname}
                            placeholder='olivia'
                            pattern='^[a-zA-Z][a-zA-Z\s]{2,20}$'
                            title='First Name must be atleat 3 charecters long'
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
                            pattern='^[a-zA-Z][a-zA-Z\s]*'
                            title='Enter a valid Last Name'
                            value={editdata.lname}
                        />

                    </div>
                </div>

                <div className={styles.inputDiv}>
                    <div className={styles.label}>
                        <p>Email</p>
                    </div>
                    <div className={styles.input}>
                        <input type="email" name='email' required onChange={userDetails}
                            value={editdata.email}
                            placeholder='olivia@techjays.com'
                        />
                    </div>
                </div >
                <div className={styles.inputDiv}>
                    <div className={styles.label}>
                        <p>Phone number</p>
                    </div>
                    <div className={styles.phoneInput}>
                        <select className="country-code" onChange={userDetails}>
                            <option value="+1">IN </option>
                            <option value="+44">US</option>
                        </select>
                        <input name='phno' type="text" onChange={userDetails}
                            value={editdata.phno}
                            placeholder='8845789956'
                        />
                    </div>
                </div >
                <div className={styles.inputDiv}>
                    <div className={styles.label}>
                        <p>Designation</p>
                    </div>
                    <div className={styles.input}>
                        <input name='dsesignation' type="text" required onChange={userDetails}
                            value={editdata.dsesignation}
                            placeholder='Developer'
                        />
                    </div>
                </div >
                <div className={styles.inputDiv}>
                    <div className={styles.label}>
                        <p>Date of joining</p>
                    </div>
                    <div className={styles.input}>
                        <input id='date' type="date" name='jdate' onChange={userDetails}
                            value={moment(editdata.jdate).format("yyyy-MM-DD")} />
                    </div>
                </div >
                <div className={styles.checkBoxDiv} >
                    <div>
                        <input type="checkbox" name='region' onChange={userDetails} />
                    </div>
                    <div>
                        <p>Candidate is from outside india</p>
                    </div>
                </div >

                <div className={styles.buttonDiv} >
                    <div className={styles.saveButton}>
                        <button onClick={handleSubmit}>Save</button>
                    </div >
                    <div className={styles.resendLinkButton} >
                        <button type='submit' >Resend Link</button>
                    </div >

                </div >

            </div >
        </div >



    )
}


export default EditNewCandidate