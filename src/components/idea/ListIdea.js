import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Cookies } from "react-cookie";

const ListIdea = () => {
    const [ideas, setIdeas] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const $ = document.querySelector.bind(document)
    const cookies = new Cookies()

    const myHeaders = {
        "Content-Type": "multipart/form-data",
        'Authorization': 'Bearer ' + cookies.get('token')
    }
    const bodyFormData = new FormData();

    useEffect(() => {
        axios({
            'method': "GET",
            'url': `http://localhost:8080/submit_idea/all?pageNumber=${pageNumber}`,
            'data': bodyFormData,
            'headers': myHeaders
        })
            .then(response => setIdeas(response.data))
            .catch(error => console.log(error))
    }, [pageNumber])

    useEffect(() => {
        (function checkPage() {
            pageNumber <= 0 ? $(".prev").classList.add("pe-none") : $(".prev").classList.remove("pe-none")
        })()
    }, [pageNumber])


    return (
        <div className="list-idea">
            <div className="comment-board">
                {ideas.map(idea => (
                    <div className="shadow rounded mb-5" key={idea.ideaId}>
                        <div className="user d-flex align-items-center justify-content-between p-3 border-bottom bg-light">
                            <div className="user d-flex">
                                <div className="user-image">
                                    <img src="https://phunugioi.com/wp-content/uploads/2020/10/hinh-anh-avatar-de-thuong-cute.jpg" alt="" width={60} />
                                </div>
                                <div className="user-info">
                                    <p className="user-name fz-20 text-primary fw-bold">{idea.userId.username}</p>
                                    <small className="post-date text-muted">{new Date(idea.createDate).toLocaleDateString()}</small>
                                </div>
                            </div>
                            <div className="idea-info">
                                <p><b>Category: </b>{idea.cateId.cateName}</p>
                                <p><b>Submission: </b>{idea.submissionId.submissionName}</p>
                            </div>
                        </div>
                        <div className="status p-3">
                            <h4 className="border-bottom pb-2">{idea.title}</h4>
                            <p>{idea.description}</p>
                        </div>
                        <div className="action form-group p-3">
                            <Link className="btn btn-primary" to={`/${idea.ideaId}`}>View</Link>
                        </div>
                    </div>
                ))}
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
    )
}

export default ListIdea;