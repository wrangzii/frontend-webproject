import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";

const ListDepart = () => {
    const [departs, setDeparts] = useState([])
    const [isDeleted, setIsDeleted] = useState(false)
    const cookies = new Cookies();

    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + cookies.get('token'),
            'Content-Type': 'application/json'
        },
        redirect: 'follow'
    };
    useEffect(() => {
        fetch("http://localhost:8080/department/all", requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw Error(response.message);
            })
            .then(result => setDeparts(result))
            .catch(error => {
                alert(error.message)
            });
    }, [isDeleted])

    const deleteDepart = departmentId => {
        fetch(`http://localhost:8080/department/delete/${departmentId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + cookies.get('token'),
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(res => {
                setIsDeleted(true)
                console.log(res)
            })
    }

    return (
        <div className="list-depart">

            <Link className="btn btn-outline-dark mb-3" to="/departments/add">Add Department</Link>

            <div className="overflow-auto">
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            departs.map(depart => (
                                <tr key={depart.departmentId}>
                                    <th scope="row">{depart.departmentId}</th>
                                    <td>{depart.departmentName}</td>
                                    <td>
                                        <Link className="btn btn-primary mr-2" to={`/departments/${depart.departmentId}`}>View</Link>
                                        <Link className="btn btn-outline-primary mr-2" to={`/departments/edit/${depart.departmentId}`}>Edit</Link>
                                        <Link className="btn btn-outline-danger mr-2" onClick={() => deleteDepart(depart.departmentId)} to="/departments">Delete</Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListDepart;