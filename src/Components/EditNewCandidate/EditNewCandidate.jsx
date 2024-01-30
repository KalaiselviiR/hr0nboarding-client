import React, { useEffect, useState } from 'react';
import styles from './EditNewCandidate.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { editCandidate, getSingleCandidate, resendCandidateForm } from '../../service/allapi';
import moment from 'moment';
import closeIcon from '../../assets/closeIcon.svg'

function EditNewCandidate({ UserToEdit, close }) {

    const [editdata, setEditData] = useState({
        fname: "",
        lname: "",
        email: "",
        phno: "",
        countryCode: "",
        dsesignation: "",
        jdate: "",
        region: false
    })


    const userDetails = (e) => {
        const { value } = e.target

        const key = e.target.name

        const { checked } = e.target


        if (key === 'region') {
            setEditData({ ...editdata, [key]: checked })
        }
        else {
            setEditData({ ...editdata, [key]: value })
        }
    }
    console.log(editdata);

    const handleClose = () => {
        if (close) {
            close()
        }
    }



    const handleSubmit = async (e) => {
        e.preventDefault()

        //api call
        const response = await editCandidate(editdata._id, editdata)
        // console.log(response);
        if (response.status == 200) {
            toast.success(response.data.message);

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
        handleClose()
    }


    useEffect(() => {
        if (UserToEdit) {
            setEditData(UserToEdit);


        } else {
            setEditData(UserToEdit)
        }
    }, [UserToEdit])





    const handleResend = async () => {

        handleClose()

        try {

            const response = await resendCandidateForm(editdata._id)
            toast.success(response.data.message);
        }
        catch (err) {
            console.log(err)
            toast.error(err.response.data.message)
        }

    }




    return (

        <form onSubmit={handleSubmit}>
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

                                name="lname"
                                pattern='^[a-zA-Z][a-zA-Z\s]*'
                                title='Enter a valid Last Name'
                                value={editdata.lname}
                                autoComplete="off"
                            />

                        </div>
                    </div>

                    <div className={styles.inputDiv}>
                        <div className={styles.label}>
                            <p>Email</p>
                        </div>
                        <div className={styles.input}>
                            <input type="text"
                                name='email' required
                                onChange={userDetails}
                                value={editdata.email}
                                pattern='^[^\s@]+@[^\s@]+\.[^\s@]+$'
                                title='enter a valid email'
                                autoComplete="off"

                            />
                        </div>
                    </div >
                    <div className={styles.inputDiv}>
                        <div className={styles.label}>
                            <p>Phone number</p>
                        </div>
                        <div className={styles.phoneInput}>
                            <select className="country-code"
                                name='countryCode'
                                value={editdata.countryCode}
                                onChange={userDetails}
                            >
                                <option value="+91">IN(+91)</option>
                                <option value="+880">BD(+880)</option>
                                <option value="+1">US(+1)</option>
                                <option value="+20">EG(+20)</option>
                            </select>
                            <input name='phno' type="text" onChange={userDetails}
                                value={editdata.phno}
                                required
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
                            <input name='dsesignation' type="text" required onChange={userDetails}
                                value={editdata.dsesignation}

                                pattern='^[a-zA-Z][a-zA-Z\s]*'
                                title='Enter a valid Designation'
                                autoComplete="off"
                            />
                        </div>
                    </div >
                    <div className={styles.inputDiv}>
                        <div className={styles.label}>
                            <p>Date of joining</p>
                        </div>
                        <div className={styles.input}>
                            <input id='date' type="date"
                                name='jdate' onChange={userDetails} requ
                                value={moment(editdata.jdate).format("yyyy-MM-DD")} />
                        </div>
                    </div >
                    <div className={styles.checkBoxDiv} >
                        <div>
                            <input checked={editdata.region} type="checkbox" name='region' onChange={userDetails} />

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
                            <button type='button' onClick={handleResend} >Resend Link</button>
                        </div >

                    </div >

                </div >
            </div >
        </form>


    )
}


export default EditNewCandidate