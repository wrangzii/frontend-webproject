import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Cookies } from "react-cookie";


const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const cookies = new Cookies();
    const [isAlert, setIsAlert] = useState(false)
    const [message, setMessage] = useState("")
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [fullName, setFullName] = useState("");
    const [role, setRole] = useState("");
    const [departmentId, setDepartmentId] = useState("");

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
                setEmail(result.data.email)
                setUsername(result.data.username)
                setPhoneNumber(result.data.phoneNumber)
                setDateOfBirth(result.data.dateOfBirth)
                setFullName(result.data.fullName)
                setDepartmentId(result.data.departmentId)
                setPassword(result.data.password)
            })
            .catch(error => {
                console.log(error)
            });
    }, [])

    const editUser = () => {

        const raw = JSON.stringify({
            username
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
                setMessage(result.message)
                setIsAlert(true)
                setEmail(result.data.email)
                setUsername(result.data.username)
                setPhoneNumber(result.data.phoneNumber)
                setDateOfBirth(result.data.dateOfBirth)
                setFullName(result.data.fullName)
                setDepartmentId(result.data.departmentId)
                setRole(result.data.role)
            })
    }

    useEffect(() => {
        setTimeout(() => {
            if (isAlert) navigate('/users')
        }, 2000)
    }, [isAlert])

    

    return (
        <div className="col-12 col-md-9 col-lg-6 mx-auto shadow p-3 p-md-5">
            <h3 className="text-center mb-4">Edit User</h3>
            {isAlert && <p className="alert alert-success">{message}</p>}
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
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Your Phone Number"
                        name="phoneNumber"
                        value={phoneNumber.trim()}
                        onChange={e => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="departmentId">Choose Department</label>
                    <select
                        name="departmentId"
                        className="form-control form-control-lg"
                        value={departmentId}
                        onChange={e => setDepartmentId(e.target.value)}
                    >
                        <optgroup label="Department">
                            <option value="QA department">QA department</option>
                            <option value="Falcuty of IT">Falcuty of IT</option>
                            <option value="HR department">HR department</option>
                        </optgroup>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="role">Choose Role</label>
                    <select
                        name="role"
                        className="form-control form-control-lg"
                        value={role}
                        onChange={e => setRole(e.target.value)}
                    >
                        <optgroup label="Role">
                            <option value="Admin">Admin</option>
                            <option value="QA manager">QA manager</option>
                            <option value="QA coordinator">QA coordinator</option>
                            <option value="Staff">Staff</option>
                        </optgroup>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password Token</label>
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        name="password"
                        value={password.trim()}
                        disabled
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