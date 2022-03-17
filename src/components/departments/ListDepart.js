import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

const ListDepart = () => {
    const [departs, setDeparts] = useState([])
    const [listDepart, setListDepart] = useState([])
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
        fetch("http://localhost:8080/department/all", requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw Error(response.message);
            })
            .then(result => {
                setDeparts(result)
                alertSuccess(result.message)
            })
            .catch(error => {
                navigate('/login')
            });
    }, [listDepart])

    function alertSuccess(msg) {
        return `
            ${msg}
        `
    }

    const deleteDepart = departmentId => {
        fetch(`http://localhost:8080/department/delete/${departmentId}`, {
            method: 'DELETE',
            headers: myHeaders,
        })
            .then(res => res.json())
            .then(id => {
                setListDepart(listDepart.filter(depart => id !== depart.departmentId))

                // Alert success notification
                const div = $(".overflow-auto")
                const alert = document.createElement('p')
                alert.setAttribute("class", "alert alert-success mt-3")
                alert.textContent = id.message
                div.after(alert)
            })

        setTimeout(() => {
            $(".alert").style.display = "none"
        }, 3000)
    }

    return (
        <div className="list-depart">
            <Link className="btn btn-outline-dark mb-3" to="/departments/add">Add Department</Link>
            <div className="overflow-auto">
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Department name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            departs.map(depart => (
                                <tr key={depart.departmentId}>
                                    <th scope="row">#{depart.departmentId}</th>
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