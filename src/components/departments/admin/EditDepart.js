import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Cookies } from "react-cookie";
import Alert from "../../alert/Alert";

const EditDepart = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const cookies = new Cookies();
    const [departmentName, setDepartmentName] = useState("");
    const [isAlert, setIsAlert] = useState(false)
    const [message, setMessage] = useState("")
    const [className, setClassName] = useState("alert-success");

    const myHeaders = {
        'Authorization': 'Bearer ' + cookies.get('token'),
        'Content-Type': 'application/json'
    }
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    // Fill current data
    useEffect(() => {
        fetch(`http://localhost:8080/department/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === '200 OK' || result.status === "201 CREATED") {
                    setClassName("alert-success")
                    setDepartmentName(result.data.departmentName)
                } else {
                    setClassName("alert-danger")
                }
            })
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
            .then(response => response.json())
            .then(result => {
                setMessage(result.message || result.error)
                setIsAlert(true)
                if (result.status === "200 OK" || result.status === "201 CREATED") {
                    setDepartmentName(result.data.departmentName)
                    setClassName("alert-success")
                    setTimeout(() => {
                        navigate('/departments')
                    }, 2000);
                } else {
                    setClassName("alert-danger")
                }
                window.scrollTo(0, 0)
            })
    }

    return (
        <div className="col-12 col-md-9 col-lg-6 mx-auto shadow p-3 p-md-5">
            <h3 className="text-center mb-4">Edit Department</h3>
            <Alert isAlert={isAlert} className={className} message={message} />
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
                <div className="form-group d-flex justify-content-end gap-3 flex-wrap">
                    <button type="button" className="btn btn-warning col-12 col-sm-auto" onClick={editDepart}>Update</button>
                    <Link to="/departments" className="btn btn-danger col-12 col-sm-auto">Cancel</Link>
                </div>
            </form>
        </div>
    );
};
export default EditDepart;