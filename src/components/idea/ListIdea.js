import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Cookies } from "react-cookie";
// import MoveToTop from "../MoveToTop";
import { CSVLink } from 'react-csv'
import JSZip from 'jszip';
import FileSaver from 'file-saver'

const ListIdea = () => {
    const [ideas, setIdeas] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const [data, setData] = useState([])
    const $ = document.querySelector.bind(document)
    const cookies = new Cookies()

    const myHeaders = {
        "Content-Type": "multipart/form-data",
        'Authorization': 'Bearer ' + cookies.get('token')
    }
    const bodyFormData = new FormData();

    // Get list idea
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

    // Check pagination
    useEffect(() => {
        (function checkPage() {
            pageNumber <= 0 ? $(".prev").classList.add("pe-none") : $(".prev").classList.remove("pe-none")
        })()
    }, [pageNumber])

    // Sorting
    const sortLastestIdea = () => {
        axios({
            method: "GET",
            headers: { 'Authorization': 'Bearer ' + cookies.get('token') },
            url: `http://localhost:8080/submit_idea/getLatestIdeas?pageNumber=${pageNumber}`
        })
            .then(response => setIdeas(response.data))
    }
    const sortMostPopular = () => {
        axios({
            method: "GET",
            headers: { 'Authorization': 'Bearer ' + cookies.get('token') },
            url: `http://localhost:8080/submit_idea/sortByViewCount?pageNumber=${pageNumber}`
        })
            .then(response => setIdeas(response.data))
    }
    const sortLastestComment = () => {
        axios({
            method: "GET",
            headers: { 'Authorization': 'Bearer ' + cookies.get('token') },
            url: `http://localhost:8080/submit_idea/sortIdeaByLatestComment?pageNumber=${pageNumber}`
        })
            .then(response => setIdeas(response.data))
    }

    // Add view count
    const addViewCount = id => {
        axios({
            method: "GET",
            url: `http://localhost:8080/submit_idea/viewCount/${id}`,
            headers: {
                'Authorization': 'Bearer ' + cookies.get('token')
            }
        })
    }

    // Export CSV
    useEffect(() => {
        axios({
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + cookies.get('token')
            },
            url: 'http://localhost:8080/submit_idea/export'
        })
            .then(response => {
                setData(response.data)
            })
            .catch(error => console.log({ error }))
    }, [])

    const csvReport = {
        filename: `Report_${new Date().toLocaleDateString()}.csv`,
        data: data
    }

    return (
        <div className="list-idea">
            <div className="sort-area d-flex align-items-center gap-3 mb-3">
                <button className="btn btn-outline-secondary" onClick={sortLastestIdea}>Lastest Idea</button>
                <button className="btn btn-outline-secondary" onClick={sortMostPopular}>Most Popular</button>
                <button className="btn btn-outline-secondary" onClick={sortLastestComment}>Lastest Comment</button>
                <CSVLink {...csvReport} className='btn btn-success'>
                    <i className="fa-solid fa-download mr-2"></i>
                    Export CSV File
                </CSVLink>
            </div>
            {ideas.map(idea => (
                <div className="shadow rounded mb-5" key={idea.ideaId}>
                    <div className="user d-flex align-items-center justify-content-between p-3 border-bottom bg-light">
                        <div className="user d-flex">
                            <div className="user-image">
                                <img src="https://phunugioi.com/wp-content/uploads/2020/10/hinh-anh-avatar-de-thuong-cute.jpg" alt="" width={60} />
                            </div>
                            <div className="user-info">
                                <p className="user-name fz-20 text-primary fw-bold">{idea.isAnonymous ? "Anonymous" : idea.userId.username}</p>
                                <small className="post-date text-muted">{new Date(idea.createDate).toLocaleDateString()}</small>
                            </div>
                        </div>
                        <div className="idea-info">
                            <p className="text-right"><b>Category: </b>{idea.cateId.cateName}</p>
                            <p className="text-right"><b>Submission: </b>{idea.submissionId.submissionName}</p>
                        </div>
                    </div>
                    <div className="status p-3">
                        <h4 className="border-bottom pb-2">{idea.title}</h4>
                        <p>{idea.description}</p>
                    </div>
                    <div className="action form-group p-3 d-flex justify-content-between align-items-center">
                        <Link className="btn btn-primary" to={`/${idea.ideaId}`} onClick={() => addViewCount(idea.ideaId)}>
                            View
                            <i className="fa-solid fa-eye ml-2"></i>
                        </Link>
                        <span className="view-count"><b>{idea.viewCount}</b> people watched</span>
                    </div>
                    {/* <MoveToTop /> */}
                </div>
            ))}
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