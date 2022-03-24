import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Cookies } from "react-cookie";

const EditDepart = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const cookies = new Cookies();
    const [departmentName, setDepartmentName] = useState("");
    const [isAlert, setIsAlert] = useState(false)
    const [message, setMessage] = useState("")

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
            .then(result => {
                setDepartmentName(result.data.departmentName)
            })
            .catch(error => {
                console.log(error)
            });
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
                setMessage(result.message)
                setIsAlert(true)
                setDepartmentName(result.data.departmentName)
            })
    }

    useEffect(() => {
        setTimeout(() => {
            if (isAlert) navigate('/departments')
        }, 2000)
    }, [isAlert])

    return (
        <div className="col-12 col-md-9 col-lg-6 mx-auto shadow p-3 p-md-5">
            <h3 className="text-center mb-4">Edit Department</h3>
            {isAlert && <p className="alert alert-success">{message}</p>}
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