import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import Alert from "../../alert/Alert";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const AddUser = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [message, setMessage] = useState("");
    const [className, setClassName] = useState("alert-success");
    const [isAlert, setIsAlert] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null)
    const navigate = useNavigate()

    const handleAddUser = () => {
        const cookies = new Cookies();
        const raw = JSON.stringify({
            email,
            username,
            fullName,
            phoneNumber,
            dateOfBirth,
            role,
            password,
            departmentId,
        });
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + cookies.get('token'),
                'Content-Type': 'application/json'
            },
            body: raw,
            redirect: 'follow',
        };
        fetch("http://localhost:8080/users/add", requestOptions)
            .then(response => response.json())
            .then(result => {
                setMessage(result.message || result.error)
                setIsAlert(true)
                if (result.status === "201 CREATED") {
                    setClassName("alert-success")
                    setTimeout(() => {
                        navigate('/users')
                    }, 2000);
                } else {
                    setClassName("alert-danger")
                }
                window.scrollTo(0, 0)
            })
    }

    function checkNumber(type) {
        if (!isNaN(type)) {
            setMessage("Keep it on")
            setClassName("mt-2 d-block text-success")
            return true
        } else {
            setMessage("Please input only numbers")
            setClassName("mt-2 d-block text-danger")
            return false
        }
    }

    return (
        <>
            <div className="col-12 col-md-9 col-lg-6 mx-auto shadow p-3 p-md-5">
                <h3 className="text-center mb-4">Add New User</h3>

                <Alert isAlert={isAlert} className={className} message={message} />
                <div>
                    <div className="form-group">
                        <label htmlFor="Username">Username</label>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter Username"
                            name="username"
                            value={username.trim()}
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Full name</label>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter Full Name"
                            name="fullName"
                            value={fullName}
                            onChange={(e) => {
                                setFullName(e.target.value)
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control form-control-lg"
                            placeholder="Enter E-mail Address"
                            name="email"
                            value={email.trim()}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone No.</label>
                        <input
                            type="tel"
                            pattern="[0-9]{10}"
                            className="form-control form-control-lg"
                            placeholder="Enter Phone Number"
                            name="phoneNumber"
                            value={phoneNumber.trim()}
                            onChange={(e) => {
                                setPhoneNumber(e.target.value)
                                checkNumber(e.target.value)
                            }}
                        />
                        {/* <small className={className}>{message}</small> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="Enter Password"
                            name="password"
                            value={password.trim()}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateOfBirth">Date of birth</label>
                        <DatePicker
                            className="form-control form-control-lg"
                            selected={selectedDate}
                            onChange={date => setSelectedDate(date)}
                            dateFormat="yyyy-MM-dd"
                            maxDate={new Date()}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <select
                            name="role"
                            className="form-control form-control-lg"
                            placeholder="Enter Role"
                            value={role}
                            onChange={(e) => {
                                setRole([e.target.value])
                            }}
                        >
                            <option>Select a role</option>
                            <option value="admin">Admin</option>
                            <option value="qa_manger">QA manager</option>
                            <option value="qa_coordinator">QA coordinator</option>
                            <option value="staff">Staff</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="departmentId">Department No.</label>
                        <input
                            type="number"
                            className="form-control form-control-lg"
                            placeholder="Enter Department ID"
                            name="departmentId"
                            value={departmentId.trim()}
                            onChange={(e) => {
                                setDepartmentId(e.target.value)
                            }}

                        />
                    </div>
                    <div className="form-group text-right">
                        <button type="button" className="btn btn-primary px-3 mr-3" onClick={handleAddUser}>Add User</button>
                        <Link to="/users" className="btn btn-danger px-3">Cancel</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddUser;