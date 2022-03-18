import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { useParams } from "react-router-dom";

const EditDepart = () => {
    const { id } = useParams();
    const [departmentName, setDepartmentName] = useState("");
    const navigate = useNavigate()
    const $ = document.querySelector.bind(document)
    const cookies = new Cookies();
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
        fetch(`http://localhost:8080/department/${id}`, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw Error(response.message);
            })
            .then(result => setDepartmentName(result.data.departmentName))
            .catch(error => {
                console.log(error)
            });
        
        return () => {
            console.log("clean");
        }
    }, [])

    const editDepart = () => {

        const raw = JSON.stringify({
            departmentName
        });
        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
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
                console.log(result);
                setDepartmentName(result.data.departmentName)
                // navigate('/departments')
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

    return (
        <div className="col-12 col-md-9 col-lg-6 mx-auto shadow p-3 p-md-5">
            <h3 className="text-center mb-4">Edit Department</h3>
            <form>
                <div className="form-group">
                    <label htmlFor="departmentName">Department Name</label>
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