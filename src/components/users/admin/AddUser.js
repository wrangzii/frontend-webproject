import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../../alert/Alert";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Cookies } from "react-cookie";
import { MultiSelect } from "react-multi-select-component";

const AddUser = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [role, setRole] = useState([]);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [message, setMessage] = useState("");
    const [className, setClassName] = useState("alert-success");
    const [isAlert, setIsAlert] = useState(false);
    const [mounted, setMounted] = useState(true)
    const [departs, setDeparts] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const [isValid, setIsValid] = useState(false)
    const navigate = useNavigate()
    const cookies = new Cookies();

    const options = [
        { label: "Admin", value: "admin" },
        { label: "QA Manager", value: "qa_manager" },
        { label: "QA Coordinator", value: "qa_coordinator" },
        { label: "Staff", value: "staff" },
    ];

    const handleAddUser = () => {
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

    // Get departments
    const myHeaders = {
        'Authorization': 'Bearer ' + cookies.get('token'),
        'Accept': 'application/json'
    }

    useEffect(() => {
        fetch(`http://localhost:8080/department/all?pageNumber=${pageNumber}`, {
            method: "GET",
            headers: myHeaders,
        })
            .then(response => response.json())
            .then(result => {
                setDeparts(result)
            })
        return () => setMounted(false)
    }, [])

    // Check same password
    useEffect(() => {
        if (password === confirmPassword) {
            setIsValid(true)
        } else {
            setIsValid(false)
        }
    }, [password])

    // Set role
    const handleChange = (e) => {
        setRole(Array.isArray(e) ? e.map(x => x.value) : []);
    }

    return (
        <div className="add-user">
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
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="Enter Password"
                            name="password"
                            value={confirmPassword.trim()}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value)
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="Confirm Password"
                            name="confirmPassword"
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
                            selected={dateOfBirth}
                            value={dateOfBirth}
                            onChange={date => setDateOfBirth(date)}
                            dateFormat="yyyy-MM-dd"
                            maxDate={new Date()}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <MultiSelect
                            options={options}
                            value={options.filter(obj => role.includes(obj.value)) }
                            onChange={handleChange}
                            labelledBy="Select"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="departmentId">Department No.</label>
                        <select
                            className="form-control form-control-lg"
                            name="departmentId"
                            id="departmentId"
                            value={departmentId}
                            onChange={(e) => {
                                setDepartmentId(e.target.value)
                            }}
                        >
                            <optgroup label="Department">
                                <option>Select a department</option>
                                {departs.map(depart => (
                                    <option key={depart.departmentId} value={depart.departmentId}>{depart.departmentName}</option>
                                ))}
                            </optgroup>
                        </select>
                    </div>
                    <div className="form-group d-flex justify-content-end gap-3 flex-wrap">
                        {isValid && <button type="button" className="btn btn-primary col-12 col-sm-auto" onClick={handleAddUser}>Add User</button>}
                        <Link to="/users" className="btn btn-danger col-12 col-sm-auto">Cancel</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddUser;