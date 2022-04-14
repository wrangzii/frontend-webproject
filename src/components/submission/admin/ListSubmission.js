import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import axios from "axios";

const ListSubmission = () => {
    const [submissions, setSubmissions] = useState([])
    const [message, setMessage] = useState("")
    const [pageNumber, setPageNumber] = useState(0)
    const [mounted, setMounted] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)
    const [isManager, setIsManager] = useState(false)
    const [className, setClassName] = useState("")
    const $ = document.querySelector.bind(document)
    const navigate = useNavigate()
    const cookies = new Cookies();

    // Check role
    useEffect(() => {
        if (cookies.get("token")) {
            if (cookies.get("roles").some(role => role === "ROLE_ADMIN")) {
                setIsAdmin(true)
            } else {
                setIsAdmin(false)
            }
            if (cookies.get("roles").some(role => role === "ROLE_QA_MANAGER")) {
                setIsManager(true)
            } else {
                setIsManager(false)
            }
        }
        return () => setMounted(false)
    }, [mounted])

    const myHeaders = {
        'Authorization': 'Bearer ' + cookies.get('token'),
        'Content-Type': 'application/json'
    }

    // Get submission list
    useEffect(() => {
        fetch(`http://localhost:8080/submission/all?pageNumber=${pageNumber}`, {
            method: "GET",
            headers: myHeaders,
        })
            .then(response => response.json())
            .then(result => {
                setSubmissions(result)
            })
    }, [pageNumber])

    // Delete item
    const deleteSubmission = submissionId => {
        axios({
            method: "DELETE",
            url: `http://localhost:8080/submission/delete/${submissionId}`,
            headers: { 'Authorization': 'Bearer ' + cookies.get('token') }
        })
            .then(res => {
                const newListSubmission = [...submissions]
                const index = submissions.findIndex(submission => submission.id === submissionId)
                newListSubmission.splice(index, 1)
                setSubmissions(newListSubmission)
                setMessage(res.data.message)
            })
    }

    // Handle pagination
    useEffect(() => {
        if ($(".prev")) {
            (function checkPage() {
                pageNumber <= 0 ? $(".prev").classList.add("pe-none") : $(".prev").classList.remove("pe-none")
            })()
        }
    }, [pageNumber])

    return (
        <div className="submission">
            <h3>Submission List</h3>
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
                                    <td><span className="d-block overflow-hidden" style={{ textOverflow: 'ellipsis', width: '160px' }}>{submission.description}</span></td>
                                    <td>{new Date(submission.closureDate).toLocaleDateString()}</td>
                                    <td>{new Date(submission.finalClosureDate).toLocaleDateString()}</td>
                                    <td>
                                        <Link className={`btn btn-primary mr-2 ${submission.closureDate < new Date().getTime() ? "pe-none opacity-50" : ""}`} to={`/add/${submission.submissionId}`}>Add</Link>
                                        {(isAdmin || isManager) && (
                                            <>
                                                <Link className="btn btn-outline-primary mr-2" to={`/submission/edit/${submission.submissionId}`}>Edit</Link>
                                                <Link className="btn btn-outline-danger mr-2" onClick={() => deleteSubmission(submission.submissionId)} to="/submission">Delete</Link>
                                            </>
                                        ) }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {message && <p className="alert alert-success">{message}</p>}
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