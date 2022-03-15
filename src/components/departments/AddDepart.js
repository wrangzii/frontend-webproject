import React, { useState } from "react";
import { Cookies } from "react-cookie";

import { Link, useNavigate } from "react-router-dom";

const AddDepart = () => {
    const [departmentName, setDepartmentName] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate()
    const $ = document.querySelector.bind(document)

    const handleAddDepart = () => {
        const cookies = new Cookies();

        const raw = JSON.stringify({
            departmentName
        });
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + cookies.get('token'),
                'Content-Type': 'application/json'
            },
            body: raw,
            redirect: 'follow'
        };
        fetch("http://localhost:8080/department/add", requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }

                throw Error(checkError())
            })
            .then(result => {
                setMessage(result.message)
                navigate('/departments')
            })
            .catch(error => createAlert(error));

        function checkError() {
            let msg = ""
            if ($("input[type=text]").value === "") {
                msg = "Not allow blank"
            } else {
                msg = "Department name is exist"
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
        <div className="col-12 col-md-9 col-lg-6 mx-auto shadow p-3 p-md-5">
            <h3 className="text-center mb-4">Add New Department</h3>
            <div className="form-group">
                <label htmlFor="departmentId">Department Name</label>
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Your Department Name"
                    name="departmentName"
                    value={departmentName.trim()}
                    onChange={(e) => {
                        setDepartmentName(e.target.value)
                    }}
                />
            </div>
            <div className="form-group text-right">
                <button type="button" className="btn btn-primary px-3 mr-3" onClick={handleAddDepart}>Add Department</button>
                <Link to="/departments" className="btn btn-danger px-3">Cancel</Link>
            </div>
        </div>
    )
}

export default AddDepart;