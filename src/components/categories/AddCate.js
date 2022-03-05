import React, { useState } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

export default class AddCate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "name": "",
            "description": "",
            "createDate": "",
            "lastEdit": "",
        }
    }

    setParams = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    addCate = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "username": this.state.username,
            "description": this.state.description,
            "createDate": this.state.createDate,
            "lastEdit": this.state.lastEdit,
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("http://localhost:8080/category/add", requestOptions)
            .then(response => {
                console.log(response);
                if (response.ok) {
                    return response.json()
                }

                throw Error(response.status)
            })
            .then(result => {
                localStorage.setItem("token", result.token)
                axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token')
                console.log(result.username)
                console.log(result);
            })
            .catch(error => {
                console.log('error', error)
                alert("Wrong")
            });
    }

    render() {
        return (
            <div className="col-12 col-md-9 col-lg-6 mx-auto shadow p-3 p-md-5">
                <h2 className="text-center mb-4">Add New Category</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="category-name">Category Name</label>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter Category"
                            name="name"
                            value={this.name}
                            onChange={this.setParams}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter Description"
                            name="description"
                            value={this.description}
                            onChange={this.setParams}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="createDate">Create Date</label>
                        <input
                            type="date"
                            className="form-control form-control-lg"
                            name="createDate"
                            value={this.createDate}
                            onChange={this.setParams}
                        />
                    </div>
                    <div className="form-group text-right">
                        <button type="button" className="btn btn-primary px-3 mr-3" onClick={this.addCate} >Add Category</button>
                        <Link to="/categories" className="btn btn-danger px-3">Cancel</Link>
                    </div>
                </form>
            </div>
        )
    }
}