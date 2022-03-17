import React, { useState } from "react";
import { Cookies } from "react-cookie";

import { Link, useNavigate } from "react-router-dom";

const AddCate = () => {
    const [cateName, setCateName] = useState("")
    const [description, setDescription] = useState("")
    const [createDate, setCreateDate] = useState("")
    // const [lastModifyDate, setLastModifyDate] = useState("")
    const [message, setMessage] = useState("");
    const navigate = useNavigate()

    const handleAddCate = () => {
        const cookies = new Cookies();

        const raw = JSON.stringify({
            cateName,
            description,
            createDate,
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
        fetch("http://localhost:8080/category/add", requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }

                throw new Error(checkError())
            })
            .then(result => {
                setMessage(result.message)
                navigate('/categories')
            })
            .catch(error => {
                createAlert(error)
            })

        function checkError() {
            let msg = ""
            if (document.querySelector("input[type=text]").value === "") {
                msg = "Not allow blank"
            } else {
                msg = "Category name is exist"
            }
            return msg
        }

        function createAlert(message) {
            const title = document.querySelector("h3")
            const alert = document.createElement("p")
            if (!document.querySelector(".alert-danger")) {
                title.after(alert)
            } else {
                return false
            }
            alert.textContent = message
            alert.setAttribute("class", "alert alert-danger")
        }
    }

    return (
        <div className="col-12 col-md-9 col-lg-6 mx-auto shadow p-3 p-md-5">
            <h3 className="text-center mb-4">Add New Category</h3>
            <form>
                <div className="form-group">
                    <label htmlFor="category-name">Category Name</label>
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Category"
                        name="name"
                        value={cateName}
                        onChange={(e) => {
                            setCateName(e.target.value)
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Description"
                        name="description"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="createDate">Create Date</label>
                    <input
                        type="date"
                        className="form-control form-control-lg"
                        name="createDate"
                        value={createDate}
                        onChange={(e) => {
                            setCreateDate(e.target.value)
                        }}
                    />
                </div>
                <div className="form-group text-right">
                    <button type="button" className="btn btn-primary px-3 mr-3" onClick={handleAddCate}>Add Category</button>
                    <Link to="/categories" className="btn btn-danger px-3">Cancel</Link>
                </div>
            </form>
        </div>
    );
}


export default AddCate;