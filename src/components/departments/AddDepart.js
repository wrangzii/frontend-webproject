import React from "react";
import axios from "axios";
import { Cookies } from "react-cookie";

import { Link } from "react-router-dom";

export default class AddDepart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "departmentName": "",
            "description": ""
        }
    }

    setParams = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    AddDepart = () => {
        const cookies = new Cookies();
        
        const raw = JSON.stringify({
            "departmentName": this.state.departmentName,
            "description": this.state.description
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
        fetch("http://localhost:8080/department/add", requestOptions)
            .then(response => {
                console.log(response);
                if (response.ok) {
                    return response.json()
                }
            })
            .then(result => {
                console.log(result.departmentName)
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
                    <h2 className="text-center mb-4">Add New Department</h2>

                    <div className="form-group">
                        <label htmlFor="departmentId">Department Name</label>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter Your Department Name"
                            name="departmentName"
                            value={this.departmentName}
                            onChange={this.setParams}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter Your Description"
                            name="description"
                            value={this.description}
                            onChange={this.setParams}
                        />
                    </div>
                    <div className="form-group text-right">
                        <button className="btn btn-primary px-3 mr-3" onClick={this.AddDepart}>Add Department</button>
                        <Link to="/department" className="btn btn-danger px-3">Cancel</Link>
                    </div>
                </div>
            </>
        )
    }
}