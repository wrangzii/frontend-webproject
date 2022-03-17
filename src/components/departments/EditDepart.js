import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { useParams } from "react-router-dom";

const EditDepart = () => {
    const { id } = useParams();
    const [departmentName, setDepartmentName] = useState("");
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const editDepart = () => {
        const cookies = new Cookies();

        const raw = JSON.stringify({
            departmentName
        });
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + cookies.get('token'),
                'Content-Type': 'application/json'
            },
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/department/edit/${id}`, requestOptions)
            .then(response => {
                if (response.ok)
                    response.json()
                throw Error(checkError())
            })
            .then(result => {
                // setMessage(result.message)
                console.log(result);
                navigate('/departments')
            })
            .catch(error => createAlert(error))

    }

    function checkError() {
        let msg = ""
        if (document.querySelector("input[type=text]").value === "") {
            msg = "Not allow blank"
        } else {
            msg = "Department name is exist"
        }
        return msg
    }

    function createAlert(message) {
        const title = document.querySelector("h3")
        const alert = document.createElement("p")
        if (!document.querySelector(".alert-danger")) {
            title.after(alert)
        } else {
            document.querySelector(".alert-danger").remove()
            title.after(alert)
        }

        alert.textContent = message
        alert.setAttribute("class", "alert alert-danger")
    }

    return (
        <div className="col-12 col-md-9 col-lg-6 mx-auto shadow p-3 p-md-5">
            <h3 className="text-center mb-4">Edit Department</h3>
            <form>
                <div className="form-group">
                    <label htmlFor="department-name">Department Name</label>
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Department"
                        name="departmentName"
                        value={departmentName}
                        onChange={e => setDepartmentName(e.target.value)}
                    />
                </div>
                <div className="form-group text-right">
                    <button type="button" className="btn btn-warning px-3 mr-3" onClick={editDepart}>Update</button>
                    <Link to="/departments" className="btn btn-danger px-3">Cancel</Link>
                </div>
            </form>
        </div>
    );
};
export default EditDepart;