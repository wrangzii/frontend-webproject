import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Cookies } from "react-cookie";

const ViewDepart = () => {
    const [departs, setDeparts] = useState([])
    // const [isMounted, setIsMounted] = useState(false)
    const { id } = useParams();

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
        fetch(`http://localhost:8080/department/${id}`, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw Error(response.message);
            })
            .then(result => setDeparts(result.data))
            .catch(error => {
                alert(error)
            });
        
        // return () => setIsMounted(true)
    }, [])

    return (
        <div className="view-depart">
            <Link className="btn btn-primary" to="/departments">List Department</Link>
            <h3 className="font-weight-bold mt-3">Department ID: #{departs.departmentId}</h3>
            <hr />
            <ul className="list-group col-12 col-md-9 col-lg-6 px-0">
                <li className="list-group-item text-break">Department name: {departs.departmentName}</li>
            </ul>
        </div>
    );
};

export default ViewDepart;