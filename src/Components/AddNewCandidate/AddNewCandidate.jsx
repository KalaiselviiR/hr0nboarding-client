import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { addCandidate } from '../../service/allapi'
import './AddNewCandidate.css'

function AddNewCandidate() {

    //create an object to store datas from input
    const [userData, setUser] = useState({
        fname:"",
        lname:"",
        email:"",
        phno:"",
        dsesignation:"",
        jdate:"",
        region:""
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
                    fname:"",
                    lname:"",
                    email:"",
                    phno:"",
                    dsesignation:"",
                    jdate:"",
                    region:""

                })

            } else {
                toast.error(response.data.message)
            }

     
    }
    return (
        <div className="addMain">
            <div className="addHeader">
                <p> Add New Candidate</p>
            </div>
            <div className="addBody">
                <div className="inputDiv">
                    <div className="label">
                        <p>First Name</p>
                    </div>
                    <div className="input">
                        <input name="fname" required onChange={userDetails} id='nam'
                            type="text"
                            placeholder='olivia'
                        />
                    </div>
                </div>
                <div className="inputDiv">
                    <div className="label">
                        <p>Last Name</p>
                    </div>
                    <div className="input">
                        <input name='lname' type="text" required onChange={userDetails}
                            placeholder='olivia'
                        />

                    </div>
                </div>
                <div className="inputDiv">
                    <div className="label">
                        <p>Email</p>
                    </div>
                    <div className="input">
                        <input name='email' type="text" required onChange={userDetails}
                            placeholder='olivia@techjays.com'
                        />
                    </div>
                </div>
                <div className="inputDiv">
                    <div className="label">
                        <p>Phone number</p>
                    </div>
                    <div className="phoneInput">
                        <select  class="country-code"  onChange={userDetails}>
                           
                        </select>
                        <input name='phno' type="text"  onChange={userDetails}
                            placeholder='8845789956'
                        />
                    </div>
                </div>
                <div className="inputDiv">
                    <div className="label">
                        <p>Designation</p>
                    </div>
                    <div className="input">
                        <input name='dsesignation' type="text" required onChange={userDetails}
                            placeholder='Developer'
                        />
                    </div>
                </div>
                <div className="inputDiv">
                    <div className="label">
                        <p>Date of joining</p>
                    </div>
                    <div className="input">
                        <input name='jdate' id='date' type="date" required onChange={userDetails} />
                    </div>
                </div>
                <div className="checkBoxDiv">
                    <div>
                        <input name='region' type="checkbox" onChange={userDetails} />
                    </div>
                    <div>
                        <p>Candidate is from outside india</p>
                    </div>
                </div>
                <div className="submitDiv">
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default AddNewCandidate