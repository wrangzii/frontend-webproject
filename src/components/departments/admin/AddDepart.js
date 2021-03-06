import React, { useState } from "react";
import { Cookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../../alert/Alert";

const AddDepart = () => {
    const [departmentName, setDepartmentName] = useState("");
    const [message, setMessage] = useState("");
    const [isAlert, setIsAlert] = useState(false);
    const [className, setClassName] = useState("alert-success");
    const navigate = useNavigate()
    
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
            .then(response => response.json())
            .then(result => {
                setMessage(result.message)
                setIsAlert(true)
                if (result.status === "200 OK") {
                    setClassName("alert-success")
                    // setTimeout(() => {
                    //     navigate('/departments')
                    // }, 2000);
                    navigate('/departments')
                } else {
                    setClassName("alert-danger")
                }
                window.scrollTo(0, 0)
            })
    }

    return (
        <div className="col-12 col-md-9 col-lg-6 mx-auto shadow p-3 p-md-5">
            <h3 className="text-center mb-4">Add New Department</h3>
            <Alert isAlert={isAlert} className={className} message={message} />
            <div className="form-group">
                <label htmlFor="departmentId">Department Name</label>
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Your Department Name"
                    name="departmentName"
                    value={departmentName}
                    onChange={e => setDepartmentName(e.target.value)}
                />
            </div>
            <div className="form-group form-group d-flex justify-content-end gap-3 flex-wrap">
                <button type="button" className="btn btn-primary col-12 col-sm-auto" onClick={handleAddDepart}>Add Department</button>
                <Link to="/departments" className="btn btn-danger col-12 col-sm-auto">Cancel</Link>
            </div>
        </div>
    )
}

export default AddDepart;