import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
// import ListComment from "./components/ListComment";
import axios from "axios";
import { Cookies } from "react-cookie";

const ListIdea = ({ image, name, date, comment }) => {
    const [ideas, setIdeas] = useState([])
    const [id, setId] = useState("")
    const [reactionType, setReactionType] = useState("")
    const [userId, setUserId] = useState("")
    const [ideaId, setIdeaId] = useState("")
    const [pageNumber, setPageNumber] = useState(0)
    const $ = document.querySelector.bind(document)
    const $$ = document.querySelectorAll.bind(document)
    const cookies = new Cookies()

    const myHeaders = {
        "Content-Type": "multipart/form-data",
        'Authorization': 'Bearer ' + cookies.get('token')
    }
    const bodyFormData = new FormData();

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:8080/submit_idea/all?pageNumber=${pageNumber}`,
            data: bodyFormData,
            headers: myHeaders
        })
            .then(response => setIdeas(response.data))
            .catch(error => console.log(error))
    }, [pageNumber])

    useEffect(() => {
        (function checkPage() {
            pageNumber <= 0 ? $(".prev").classList.add("pe-none") : $(".prev").classList.remove("pe-none")
        })()
    }, [pageNumber])

    // const listThumbs = [...$$(".fa-thumbs-up"), ...$$(".fa-thumbs-down")]
    const idea_id = useRef(null)
    const handleLike = id => {
        console.log(id);
        if ($(".fa-thumbs-down").classList.contains("text-danger")) {
            $(".fa-thumbs-down").classList.remove("text-danger")
        }
        $(".fa-thumbs-up").classList.toggle("text-primary")
        axios({
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + cookies.get('token')
            },
            url: "http://localhost:8080/reaction/add",
            data: JSON.stringify({ reactionType, userId, ideaId })
        })
            .then(response => {
                console.log(response)
                // setIdeaId(idea_id.current)
            })
            .catch(error => console.log(error))
    }

    const handleDislike = idea_id => {
        if ($(".fa-thumbs-up").classList.contains("text-primary")) {
            $(".fa-thumbs-up").classList.remove("text-primary")
        }
        $(".fa-thumbs-down").classList.toggle("text-danger")
    }

    const handleComment = idea_id => {
        setId(idea_id)
    }

    return (
        <>
            <div className="comment-board">
                {ideas.map(idea => (
                    <div className="shadow rounded" ref={idea_id} key={idea.ideaId}>
                        <div className="user d-flex align-items-center justify-content-between p-3 border-bottom">
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
                        <div className="reaction fz-20 c-pointer d-flex gap-5 text-secondary p-3 mb-5 bg-light">
                            <div className="like d-flex align-items-center gap-2" onClick={() => handleLike(idea.ideaId)}>
                                <i className="fa-solid fa-thumbs-up"></i>
                                20
                            </div>
                            <div className="dislike d-flex align-items-center gap-2" onClick={() => handleDislike(idea.ideaId)}>
                                <i className="fa-solid fa-thumbs-down"></i>
                                10
                            </div>
                            <Link to={`/${id}`} className="comment d-flex align-items-center gap-2 text-decoration-none" onClick={() => handleComment(idea.ideaId)}>
                                <i className="fa-solid fa-comment"></i>
                                Comment
                            </Link>
                        </div>
                        {/* <ListComment image={image} name={name} date={date} comment={comment} /> */}
                        {/* <div className="my-contribute d-flex gap-2 p-3 mb-5 border rounded">
                            <div className="user-image">
                                <img src="https://phunugioi.com/wp-content/uploads/2020/10/hinh-anh-avatar-de-thuong-cute.jpg" alt="" width={60} />
                            </div>
                            <textarea placeholder="Write your idea..." name="" id="" cols="80" rows="2" className="px-2 w-100"></textarea>
                        </div> */}
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
        </>
    )
}

export default ListIdea;