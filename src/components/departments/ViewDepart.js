import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Cookies } from "react-cookie";

const ViewDepart = () => {
    const [departs, setDeparts] = useState([])
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
    }, [])
    const { departmentName, departmentId } = useParams();

    return (
        <>
            <Link className="btn btn-primary" to="/departments">List Department</Link>
            <h3 className="display-4">Department Id: {departmentId}</h3>
            <hr />
            <ul className="list-group col-12 col-md-9 col-lg-6 px-0">
                <li className="list-group-item text-break">Name: {departmentName}</li>
            </ul>
        </>
    );
};

export default ViewDepart;