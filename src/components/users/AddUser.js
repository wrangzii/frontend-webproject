import React, { useState } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

export default class AddUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "email": "",
            "username": "",
            "fullName": "",
            "phoneNumber": "",
            "dateOfBirth": "",
            "role": [],
            "password": "",
            "departmentId": ""
        }
    }

    setParams = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    addUser = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "email": this.state.email,
            "username": this.state.username,
            "fullName": this.state.fullName,
            "phoneNumber": this.state.phoneNumber,
            "dateOfBirth": this.state.dateOfBirth,
            "role": this.state.role,
            "password": this.state.password,
            "departmentId": this.state.departmentId
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        console.log(requestOptions);
        fetch("http://localhost:8080/users/add", requestOptions)
            .then(response => {
                console.log(response);
                if (response.ok) {
                    return response.json()
                }

                throw Error(response.status)
            })
            .then(result => {
                console.log(result)
                localStorage.setItem("token", result.token)
                console.log(result.username)
                alert(localStorage.getItem('token'))
                axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token')
            })
            .catch(error => {
                console.log('error', error)
                alert("Wrong")
            });
    }

    render() {
        return (
            <>
                <div className="col-12 col-md-9 col-lg-6 mx-auto shadow p-3 p-md-5">
                    <h2 className="text-center mb-4">Add New User</h2>
                    <div>
                        <div className="form-group">
                            <label htmlFor="Username">Username</label>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter Your Username"
                                name="Username"
                                value={this.username}
                                onChange={this.setParams}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Full name</label>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter Your Username"
                                name="name"
                                value={this.fullName}
                                onChange={this.setParams}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control form-control-lg"
                                placeholder="Enter Your E-mail Address"
                                name="email"
                                value={this.email}
                                onChange={this.setParams}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone No.</label>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter Your Phone Number"
                                name="phone"
                                value={this.phoneNumber}
                                onChange={this.setParams}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control form-control-lg"
                                placeholder="Enter Your Password"
                                name="password"
                                value={this.password}
                                onChange={this.setParams}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dateOfBirth">Date of birth</label>
                            <input
                                type="date"
                                className="form-control form-control-lg"
                                placeholder="Enter Your Dob"
                                name="dateOfBirth"
                                value={this.dateOfBirth}
                                onChange={this.setParams}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <select
                                name="role"
                                className="form-control form-control-lg"
                                placeholder="Enter Your Role"
                                value={this.role}
                                onChange={this.setParams}
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
                            <label htmlFor="departmentId">Department No.</label>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter Your Department Id"
                                name="departmentId"
                                value={this.departmentId}
                                onChange={this.setParams}
                            />
                        </div>


                        {/* <div className="form-group">
                            <label htmlFor="department">Department</label>
                            <select
                                name="department"
                                className="form-control form-control-lg"
                                placeholder="Enter Your Department"
                                value={this.department}
                                onChange={this.setParams}
                            >
                                <optgroup label="Department">
                                    <option value="QA department">QA department</option>
                                    <option value="Falcuty of IT">Falcuty of IT</option>
                                    <option value="HR department">HR department</option>
                                </optgroup>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <select
                                name="role"
                                className="form-control form-control-lg"
                                placeholder="Enter Your Role"
                                value={role}
                                onChange={this.setParams}
                            >
                                <optgroup label="Role">
                                    <option value="Admin">Admin</option>
                                    <option value="QA manager">QA manager</option>
                                    <option value="QA coordinator">QA coordinator</option>
                                    <option value="Staff">Staff</option>
                                </optgroup>
                            </select>
                        </div> */}
                        <div className="form-group text-right">
                            <button className="btn btn-primary px-3 mr-3" onClick={this.addUser}>Add User</button>
                            <Link to="/users" className="btn btn-danger px-3">Cancel</Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

// const AddUser = () => {

//     let navigate = useNavigate();
//     const [user, setUser] = useState({
//         name: "",
//         email: "",
//         phone: "",
//         department: "",
//         role: ""
//     });

//     const { name, email, phone, department, role } = user;
//     const onInputChange = e => {
//         setUser({ ...user, [e.target.name]: e.target.value });
//     };

//     const onSubmit = async e => {
//         e.preventDefault();
//         await axios.post("http://localhost:3003/users", user);
//         navigate("/users");
//     };

//     return (
        // <div className="col-12 col-md-9 col-lg-6 mx-auto shadow p-3 p-md-5">
        //     <h2 className="text-center mb-4">Add New User</h2>
        //     <form onSubmit={e => onSubmit(e)}>
        //         <div className="form-group">
        //             <label htmlFor="name">Full Name</label>
        //             <input
        //                 type="text"
        //                 className="form-control form-control-lg"
        //                 placeholder="Enter Your Name"
        //                 name="name"
        //                 value={name}
        //                 onChange={e => onInputChange(e)}
        //             />
        //         </div>
        //         <div className="form-group">
        //             <label htmlFor="email">Email</label>
        //             <input
        //                 type="email"
        //                 className="form-control form-control-lg"
        //                 placeholder="Enter Your E-mail Address"
        //                 name="email"
        //                 value={email}
        //                 onChange={e => onInputChange(e)}
        //             />
        //         </div>
        //         <div className="form-group">
        //             <label htmlFor="phone">Phone No.</label>
        //             <input
        //                 type="text"
        //                 className="form-control form-control-lg"
        //                 placeholder="Enter Your Phone Number"
        //                 name="phone"
        //                 value={phone}
        //                 onChange={e => onInputChange(e)}
        //             />
        //         </div>
        //         <div className="form-group">
        //             <label htmlFor="department">Department</label>
        //             <select
        //                 name="department"
        //                 className="form-control form-control-lg"
        //                 placeholder="Enter Your Department"
        //                 value={department}
        //                 onChange={e => onInputChange(e)}
        //             >
        //                 <optgroup label="Department">
        //                     <option value="QA department">QA department</option>
        //                     <option value="Falcuty of IT">Falcuty of IT</option>
        //                     <option value="HR department">HR department</option>
        //                 </optgroup>
        //             </select>
        //         </div>
        //         <div className="form-group">
        //             <label htmlFor="role">Role</label>
        //             <select
        //                 name="role"
        //                 className="form-control form-control-lg"
        //                 placeholder="Enter Your Role"
        //                 value={role}
        //                 onChange={e => onInputChange(e)}
        //             >
        //                 <optgroup label="Role">
        //                     <option value="Admin">Admin</option>
        //                     <option value="QA manager">QA manager</option>
        //                     <option value="QA coordinator">QA coordinator</option>
        //                     <option value="Staff">Staff</option>
        //                 </optgroup>
        //             </select>
        //         </div>
        //         <div className="form-group text-right">
        //             <button className="btn btn-primary px-3 mr-3">Add User</button>
        //             <Link to="/users" className="btn btn-danger px-3">Cancel</Link>
        //         </div>
        //     </form>
        // </div>
//     )
// }

// const AddUser = () => {

//     let navigate = useNavigate();
//     const [user, setUser] = useState({
//         name: "",
//         email: "",
//         phone: "",
//         department: "",
//         role: ""
//     });

//     const { name, email, phone, department, role } = user;
//     const onInputChange = e => {
//         setUser({ ...user, [e.target.name]: e.target.value });
//     };

//     const onSubmit = async e => {
//         e.preventDefault();
//         await axios.post("http://localhost:3003/users", user);
//         navigate("/users");
//     };

//     return (
        // <div className="col-12 col-md-9 col-lg-6 mx-auto shadow p-3 p-md-5">
        //     <h2 className="text-center mb-4">Add New User</h2>
        //     <form onSubmit={e => onSubmit(e)}>
        //         <div className="form-group">
        //             <label htmlFor="name">Full Name</label>
        //             <input
        //                 type="text"
        //                 className="form-control form-control-lg"
        //                 placeholder="Enter Your Name"
        //                 name="name"
        //                 value={name}
        //                 onChange={e => onInputChange(e)}
        //             />
        //         </div>
        //         <div className="form-group">
        //             <label htmlFor="email">Email</label>
        //             <input
        //                 type="email"
        //                 className="form-control form-control-lg"
        //                 placeholder="Enter Your E-mail Address"
        //                 name="email"
        //                 value={email}
        //                 onChange={e => onInputChange(e)}
        //             />
        //         </div>
        //         <div className="form-group">
        //             <label htmlFor="phone">Phone No.</label>
        //             <input
        //                 type="text"
        //                 className="form-control form-control-lg"
        //                 placeholder="Enter Your Phone Number"
        //                 name="phone"
        //                 value={phone}
        //                 onChange={e => onInputChange(e)}
        //             />
        //         </div>
        //         <div className="form-group">
        //             <label htmlFor="department">Department</label>
        //             <select
        //                 name="department"
        //                 className="form-control form-control-lg"
        //                 placeholder="Enter Your Department"
        //                 value={department}
        //                 onChange={e => onInputChange(e)}
        //             >
        //                 <optgroup label="Department">
        //                     <option value="QA department">QA department</option>
        //                     <option value="Falcuty of IT">Falcuty of IT</option>
        //                     <option value="HR department">HR department</option>
        //                 </optgroup>
        //             </select>
        //         </div>
        //         <div className="form-group">
        //             <label htmlFor="role">Role</label>
        //             <select
        //                 name="role"
        //                 className="form-control form-control-lg"
        //                 placeholder="Enter Your Role"
        //                 value={role}
        //                 onChange={e => onInputChange(e)}
        //             >
        //                 <optgroup label="Role">
        //                     <option value="Admin">Admin</option>
        //                     <option value="QA manager">QA manager</option>
        //                     <option value="QA coordinator">QA coordinator</option>
        //                     <option value="Staff">Staff</option>
        //                 </optgroup>
        //             </select>
        //         </div>
        //         <div className="form-group text-right">
        //             <button className="btn btn-primary px-3 mr-3">Add User</button>
        //             <Link to="/users" className="btn btn-danger px-3">Cancel</Link>
        //         </div>
        //     </form>
        // </div>
//     )
// }

// export default AddUser;