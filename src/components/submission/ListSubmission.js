import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

const ListSubmission = () => {
    const [submissions, setSubmissions] = useState([])
    const [listSubmission, setListSubmission] = useState([])
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
        fetch("http://localhost:8080/submission/all", requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw Error(response.message);
            })
            .then(result => {
                setSubmissions(result)
                alertSuccess(result.message)
            })
            .catch(error => {
                navigate('/login')
            });
    }, [listSubmission])

    function alertSuccess(msg) {
        return `
            ${msg}
        `
    }

    const deleteSubmission = submissionId => {
        fetch(`http://localhost:8080/submission/delete/${submissionId}`, {
            method: 'DELETE',
            headers: myHeaders,
        })
            .then(res => res.json())
            .then(id => {
                setListSubmission(listSubmission.filter(submissions => id !== submissions.submissionId))

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
        <div className="submission">
            <Link className="btn btn-outline-dark mb-3" to="/submission/add">Add Submission</Link>
            <div className="overflow-auto">
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Submission</th>
                            <th scope="col">Description</th>
                            <th scope="col">Closure Date</th>
                            <th scope="col">Final Closure Date</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            submissions.map(submission => (
                                <tr key={submission.submissionId}>
                                    <th scope="row">#{submission.submissionId}</th>
                                    <td>{submission.submissionName}</td>
                                    <td>{submission.description}</td>
                                    <td>{new Date(submission.closureDate).toLocaleDateString()}</td>
                                    <td>{new Date(submission.finalClosureDate).toLocaleDateString()}</td>
                                    <td>
                                        <Link className="btn btn-primary mr-2" to={`/submission/${submission.submissionId}`}>View</Link>
                                        <Link className="btn btn-outline-primary mr-2" to={`/submission/edit/${submission.submissionId}`}>Edit</Link>
                                        <Link className="btn btn-outline-danger mr-2" onClick={() => deleteSubmission(submission.submissionId)} to="/submission">Delete</Link>
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

export default ListSubmission;