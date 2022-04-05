import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

const ListSubmission = () => {
    const [submissions, setSubmissions] = useState([])
    const [listSubmission, setListSubmission] = useState([])
    const [message, setMessage] = useState("")
    const [isDeleted, setIsDeleted] = useState(false)
    const [pageNumber, setPageNumber] = useState(0)
    const [mounted, setMounted] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)
    const $ = document.querySelector.bind(document)
    const navigate = useNavigate()
    const cookies = new Cookies();

    useEffect(() => {
        if (cookies.get("token")) {
            if (cookies.get("roles").some(role => role === "ROLE_ADMIN")) {
                setIsAdmin(true)
            } else {
                setIsAdmin(false)
                // navigate("/")
            }
        }
        return () => setMounted(false)
    }, [mounted])

    const myHeaders = {
        'Authorization': 'Bearer ' + cookies.get('token'),
        'Content-Type': 'application/json'
    }

    useEffect(() => {
        fetch(`http://localhost:8080/submission/all?pageNumber=${pageNumber}`, {
            method: "GET",
            headers: myHeaders,
        })
            .then(response => response.json())
            .then(result => setSubmissions(result))
    }, [pageNumber])

    // Delete item
    const deleteSubmission = submissionId => {
        fetch(`http://localhost:8080/submission/delete/${submissionId}`, {
            method: 'DELETE',
            headers: myHeaders,
        })
            .then(res => res.json())
            .then(id => {
                setListSubmission(listSubmission.filter(submission => id !== submission.submissionId))
                setIsDeleted(true)
                setListSubmission(listSubmission)
                setMessage(id.message)
            })
    }

    // Handle pagination action
    useEffect(() => {
        (function checkPage() {
            pageNumber <= 0 ? $(".prev").classList.add("pe-none") : $(".prev").classList.remove("pe-none")
        })()
    }, [pageNumber])

    return (
        <div className="submission">
            <h3>Submission List</h3>
            {isAdmin && <Link className="btn btn-outline-dark mb-3" to="/submission/add">Add Submission</Link>}
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
                                    <td><span className="d-block overflow-hidden" style={{ textOverflow: 'ellipsis', width: '160px' }}>{submission.description}</span></td>
                                    <td>{new Date(submission.closureDate).toLocaleDateString()}</td>
                                    <td>{new Date(submission.finalClosureDate).toLocaleDateString()}</td>
                                    <td>
                                        <Link className="btn btn-primary mr-2" to={isAdmin ? `/submission/${submission.submissionId}` : `/add/${submission.submissionId}`}>{isAdmin ? "View" : "Add" }</Link>
                                        {isAdmin &&
                                            <>
                                                <Link className="btn btn-outline-primary mr-2" to={`/submission/edit/${submission.submissionId}`}>Edit</Link>
                                                <Link className="btn btn-outline-danger mr-2" onClick={() => deleteSubmission(submission.submissionId)} to="/submission">Delete</Link>
                                            </>}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {isDeleted && <p className="alert alert-success">{message}</p>}
            </div>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item prev" onClick={() => setPageNumber(pageNumber - 1)}>
                        <Link className="page-link" to={`?pageNumber=${pageNumber - 1}`} aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </Link>
                    </li>
                    <li className="page-item next" onClick={() => setPageNumber(pageNumber + 1)}>
                        <Link className="page-link" to={`?pageNumber=${pageNumber + 1}`} aria-label="Previous">
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default ListSubmission;