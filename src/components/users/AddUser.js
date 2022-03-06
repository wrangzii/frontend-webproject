import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";

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
            //"departmentId": "",
        }
    }

    setParams = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    addUser = () => {
        const cookies = new Cookies();
        // const myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");
        // myHeaders.append("Authorization", 'Bearer ' + cookies.get('token'));
        // axios.defaults.headers.common['Authorization'] = 'Bearer' + cookies.get('token')
        const role = [this.state.role]
        const raw = JSON.stringify({
            "email": this.state.email,
            "username": this.state.username,
            "fullName": this.state.fullName,
            "phoneNumber": this.state.phoneNumber,
            "dateOfBirth": this.state.dateOfBirth,
            "role": role,
            "password": this.state.password,
            "departmentId": this.state.departmentId,
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
                console.log(response);
                if (response.ok) {
                    return response.json()
                }
            })
            .then(result => {
                console.log(result.username)
                // axios.defaults.headers.common['Authorization'] = 'Bearer' + cookies.get('token')
            })
            .catch(error => {
                console.log('error message', error.message)
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

                                className="form-control form-control-lg"
                                placeholder="Enter Your Username"
                                name="username"
                                value={this.username}
                                onChange={this.setParams}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Full name</label>
                            <input

                                className="form-control form-control-lg"
                                placeholder="Enter Your Full Name"
                                name="fullName"
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

                                className="form-control form-control-lg"
                                placeholder="Enter Your Phone Number"
                                name="phoneNumber"
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
                                placeholder="Enter Your Birthday"
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
                                <option>Select a role</option>
                                <option value="admin">Admin</option>
                                <option value="qa_manger">QA manager</option>
                                <option value="2">QA coordinator</option>
                                <option value="3">Staff</option>
                            </select>
                        </div>
                        {/*<div className="form-group">*/}
                        {/*    <label htmlFor="departmentId">Department No.</label>*/}
                        {/*    <input*/}
                        {/*        type="number"*/}
                        {/*        className="form-control form-control-lg"*/}
                        {/*        placeholder="Enter Your Department ID"*/}
                        {/*        name="departmentId"*/}
                        {/*        value={this.departmentId}*/}
                        {/*        onChange={this.setParams}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        <div className="form-group text-right">
                            <button type="button" className="btn btn-primary px-3 mr-3" onClick={this.addUser}>Add User</button>
                            <Link to="/users" className="btn btn-danger px-3">Cancel</Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}