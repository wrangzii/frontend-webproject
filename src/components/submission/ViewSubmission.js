import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Cookies } from "react-cookie";

const ViewSubmission = () => {
    const { id } = useParams();
    const [submissions, setsubmissions] = useState([])

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
        fetch(`http://localhost:8080/submission/${id}`, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw Error(response.message);
            })
            .then(result => setsubmissions(result.data))
            .catch(error => {
                alert(error)
            });
    }, [])

    return (
        <div className="view-submission">
            <Link className="btn btn-primary" to="/submission">List Submission</Link>
            <h3 className="font-weight-bold mt-3">Submission ID: #{submissions.submissionNameId}</h3>
            <hr />
            <ul className="list-group col-12 col-md-9 col-lg-6 px-0">
                <li className="list-group-item text-break">Submission Name: {submissions.submissionName}</li>
                <li className="list-group-item text-break">Description: {submissions.description}</li>
                <li className="list-group-item text-break">Closure Date: {submissions.closureDate}</li>
                <li className="list-group-item text-break">Final Closure Date: {submissions.finalClosureDate}</li>
            </ul>
        </div>
    );
};

export default ViewSubmission;