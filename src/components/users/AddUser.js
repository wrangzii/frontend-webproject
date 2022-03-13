import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

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
    const navigate = useNavigate()
    const $ = document.querySelector.bind(document)

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
            .then(response => {
                if (response.ok) {
                    return response.json()
                }

                throw Error(checkError())
            })
            .then(result => {
                setMessage(result.message)
                navigate('/users')
            })
            .catch(error => {
                createAlert(error)
            });

        function checkError() {
            let msg = ""
            if ($("input[type=text]").value === "" && $("input[type=email]").value === "" && $("input[type=number]").value === "" && $("input[type=password]").value === "") {
                msg = "Not allow blank"
            } else {
                msg = "User name is exist"
            }
            return msg
        }

        function createAlert(message) {
            const title = $("h3")
            const alert = document.createElement("p")
            if (!$(".alert-danger")) {
                title.after(alert)
            } else {
                $(".alert-danger").remove()
                title.after(alert)
            }

            alert.textContent = message
            alert.setAttribute("class", "alert alert-danger")
        }
    }

    return (
        <>
            <div className="col-12 col-md-9 col-lg-6 mx-auto shadow p-3 p-md-5">
                <h3 className="text-center mb-4">Add New User</h3>
                <div>
                    <div className="form-group">
                        <label htmlFor="Username">Username</label>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter Your Username"
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
                            placeholder="Enter Your Full Name"
                            name="fullName"
                            value={fullName.trim()}
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
                            placeholder="Enter Your E-mail Address"
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
                            type="number"
                            className="form-control form-control-lg"
                            placeholder="Enter Your Phone Number"
                            name="phoneNumber"
                            value={phoneNumber.trim()}
                            onChange={(e) => {
                                setPhoneNumber(e.target.value)
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="Enter Your Password"
                            name="password"
                            value={password.trim()}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}

                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateOfBirth">Date of birth</label>
                        <input
                            type="date"
                            className="form-control form-control-lg"
                            placeholder="Enter Your Birthday"
                            name="dateOfBirth"
                            value={dateOfBirth}
                            onChange={(e) => {
                                setDateOfBirth(e.target.value)
                            }}

                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <select
                            name="role"
                            className="form-control form-control-lg"
                            placeholder="Enter Your Role"
                            value={role}
                            onChange={(e) => {
                                setRole(e.target.value)
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
                            placeholder="Enter Your Department ID"
                            name="departmentId"
                            value={departmentId}
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