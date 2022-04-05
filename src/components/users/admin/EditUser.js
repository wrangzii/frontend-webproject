import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Cookies } from "react-cookie";
import Alert from "../../alert/Alert";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [isAlert, setIsAlert] = useState(false)
    const [className, setClassName] = useState("alert-success");
    const [message, setMessage] = useState("")
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [fullName, setFullName] = useState("");
    const [roles, setRoles] = useState([]);
    const [departmentId, setDepartmentId] = useState("");
    const [selectedDate, setSelectedDate] = useState(null)

    const myHeaders = {
        'Authorization': 'Bearer ' + cookies.get('token'),
        'Content-Type': 'application/json'
    }
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    useEffect(() => {
        fetch(`http://localhost:8080/users/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "200 OK" || result.status === "201 CREATED") {
                    setEmail(result.data.email)
                    setUsername(result.data.username)
                    setPhoneNumber(result.data.phoneNumber)
                    setDateOfBirth(result.data.dateOfBirth)
                    setFullName(result.data.fullName)
                    setDepartmentId(result.data.departmentId.departmentId)
                    setRoles(result.data.roles.map(user => user.roleName))
                    setPassword(result.data.password)
                    setClassName("alert-success")
                } else {
                    setClassName("alert-danger")
                }
            })
    }, [])

    const editUser = () => {

        const raw = JSON.stringify({
            email,
            username,
            phoneNumber,
            dateOfBirth,
            fullName,
            departmentId,
            roles,
            password,
        });
        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/users/edit/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setMessage(result.message || result.error)
                setIsAlert(true)
                if (result.status === "200 OK") {
                    console.log(result);
                    setEmail(result.data.email)
                    setUsername(result.data.username)
                    setPhoneNumber(result.data.phoneNumber)
                    setDateOfBirth(result.data.dateOfBirth)
                    setFullName(result.data.fullName)
                    setDepartmentId(result.data.departmentId.departmentId)
                    setRoles(result.date.roles.map(user => user.roleName))
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

    console.log(dateOfBirth);

    return (
        <div className="col-12 col-md-9 col-lg-6 mx-auto shadow p-3 p-md-5">
            <h3 className="text-center mb-4">Edit User</h3>
            <Alert isAlert={isAlert} className={className} message={message} />
            <form>
                <div className="form-group">
                    <label htmlFor="username">Enter Username</label>
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Username"
                        name="username"
                        value={username.trim()}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Enter Fullname</label>
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Fullname"
                        name="fullName"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Enter Email</label>
                    <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Enter E-mail Address"
                        name="email"
                        value={email.trim()}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Enter Phone No.</label>
                    <input
                        type="tel"
                        className="form-control form-control-lg"
                        placeholder="Enter Your Phone Number"
                        name="phoneNumber"
                        value={phoneNumber.trim()}
                        onChange={e => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dateOfBirth">Enter D.O.B</label>
                    <DatePicker
                        className="form-control form-control-lg"
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        dateFormat="yyyy-MM-dd"
                        maxDate={new Date()}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="departmentId">Choose Department</label>
                    <select
                        name="departmentId"
                        className="form-control form-control-lg"
                        value={departmentId.departmentName}
                        onChange={e => setDepartmentId(e.target.value)}
                    >
                        <optgroup label="Department">
                            <option value="1">QA department</option>
                            <option value="2">Falcuty of IT</option>
                            <option value="3">HR department</option>
                        </optgroup>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="role">Choose Role</label>
                    <select
                        name="role"
                        className="form-control form-control-lg"
                        value={roles.roleId}
                        onChange={e => setRoles(e.target.value)}
                    >
                        <optgroup label="Role">
                            <option value="admin">Admin</option>
                            <option value="qa_manager">QA manager</option>
                            <option value="qa_coordinator">QA coordinator</option>
                            <option value="staff">Staff</option>
                        </optgroup>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control form-control-lg"
                        name="password"
                        value={password.trim()}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group text-right">
                    <button type="button" onClick={editUser} className="btn btn-warning px-3 mr-3">Update</button>
                    <Link to="/users" className="btn btn-danger px-3">Cancel</Link>
                </div>
            </form>
        </div>
    );
};

export default EditUser;