import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";

import { useNavigate, useParams } from "react-router-dom";

const EditDepart = () => {

    // let navigate = useNavigate();

    const { id } = useParams();

    const [departmentName, setDepartmentName] = useState("");

    const handleEditDepart = () => {
        // navigate('/departments')
        const cookies = new Cookies();

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
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
            .then(response => response.json())
            .then(result => setDepartmentName(result))
    }

    return (
        <div className="col-12 col-md-9 col-lg-6 mx-auto shadow p-3 p-md-5">
            <h2 className="text-center mb-4">Edit Department</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="department-name">Department Name</label>
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Department"
                        name="name"
                        value={departmentName.trim()}
                        onChange={e => setDepartmentName(e.target.value)}
                    />
                </div>
                <div className="form-group text-right">
                    <button className="btn btn-warning px-3 mr-3" onClick={handleEditDepart}>Update</button>
                    <Link to="/departments" className="btn btn-danger px-3">Cancel</Link>
                </div>
            </form>
        </div>
    );
};
export default EditDepart;