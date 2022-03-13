import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";

import { useParams } from "react-router-dom";

const EditDepart = () => {
    const { id } = useParams();

    const [departmentName, setDepartmentName] = useState("");

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
        };

        fetch(`http://localhost:8080/department/edit/${id}`, requestOptions)
            .then(response => {
                if (response.ok)
                    response.json()
                throw Error(response)
            })
            .then(result => console.log(result))
            .catch(err => console.log(err))
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
                        value={departmentName}
                        onChange={e => setDepartmentName(e.target.value)}
                    />
                </div>
                <div className="form-group text-right">
                    <Link className="btn btn-warning px-3 mr-3" onClick={editDepart} to="/departments">Update</Link>
                    <Link to="/departments" className="btn btn-danger px-3">Cancel</Link>
                </div>
            </form>
        </div>
    );
};
export default EditDepart;