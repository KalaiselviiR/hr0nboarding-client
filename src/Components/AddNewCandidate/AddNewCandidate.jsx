import './AddNewCandidate.css'

function AddNewCandidate() {
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
                        <input
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
                        <input type="text"
                            placeholder='olivia'
                        />

                    </div>
                </div>
                <div className="inputDiv">
                    <div className="label">
                        <p>Email</p>
                    </div>
                    <div className="input">
                        <input type="text"
                            placeholder='olivia@techjays.com'
                        />
                    </div>
                </div>
                <div className="inputDiv">
                    <div className="label">
                        <p>Phone number</p>
                    </div>
                    <div className="phoneInput">
                        <select class="country-code">
                            <option value="+1">IN </option>
                            <option value="+44">US</option>
                        </select>
                        <input type="text"
                            placeholder='8845789956'
                        />
                    </div>
                </div>
                <div className="inputDiv">
                    <div className="label">
                        <p>Designation</p>
                    </div>
                    <div className="input">
                        <input type="text"
                            placeholder='Developer'
                        />
                    </div>
                </div>
                <div className="inputDiv">
                    <div className="label">
                        <p>Date of joining</p>
                    </div>
                    <div className="input">
                        <input id='date' type="date" />
                    </div>
                </div>
                <div className="checkBoxDiv">
                    <div>
                        <input type="checkbox" />
                    </div>
                    <div>
                        <p>Candidate is from outside india</p>
                    </div>
                </div>
                <div className="submitDiv">
                    <button>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default AddNewCandidate