import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Cookies } from 'react-cookie'
import { useParams, Link, useNavigate } from 'react-router-dom'
import ListComment from './components/ListComment'
import Alert from "../alert/Alert"
import MoveToTop from '../MoveToTop'

function ViewIdea({ image, date }) {
    const cookies = new Cookies()
    const [myUsername, setMyUsername] = useState("")
    const [idea, setIdea] = useState({})
    const [comment, setComment] = useState("")
    const [content, setContent] = useState("")
    const [posterId, setPosterId] = useState(0)
    const [userId, setUserId] = useState(0)
    const [ideaId, setIdeaId] = useState(0)
    const [isAnonymous, setIsAnonymous] = useState(false)
    const [reactionType, setReactionType] = useState("like")
    const [submissionId, setSubmissionId] = useState("")
    const [cateId, setCateId] = useState("")
    const [isAlert, setIsAlert] = useState(false)
    const [className, setClassName] = useState("alert-success")
    const [message, setMessage] = useState("")
    const [isShowCmt, setIsShowCmt] = useState(false)
    const [thumb, setThumb] = useState(false)
    const { id } = useParams()
    const $ = document.querySelector.bind(document)
    const navigate = useNavigate()
    const like = $(".like")
    const dislike = $(".dislike")

    const myHeaders = {
        'Authorization': 'Bearer ' + cookies.get('token')
    }

    // Get idea by id
    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:8080/submit_idea/${id}`,
            headers: myHeaders
        })
            .then(response => {
                // console.log(response.data);
                setIdea(response.data.data)
                setIdeaId(response.data.data.ideaId);
                setCateId(response.data.data.cateId)
                setPosterId(response.data.data.userId)
                setSubmissionId(response.data.data.submissionId)
                setUserId(parseInt(cookies.cookies.id));
            })
            .catch(error => console.log(error))
    }, [])

    const handleComment = () => {
        setIsShowCmt(true)
        window.scrollTo(0, document.body.clientHeight)
        $(".call-to-comment").classList.add("d-none")
    }

    const raw = JSON.stringify({
        content,
        userId,
        ideaId,
        isAnonymous
    })

    // Add comment
    const handlePostComment = () => {
        axios({
            method: "POST",
            url: "http://localhost:8080/comment/add",
            data: raw,
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + cookies.get('token')
            }
        })
            .then(response => {
                setContent("")
                window.location.reload()
            })
            .catch(error => {
                console.log(error)
            })
    }

    // isAnonymous
    useEffect(() => {
        setIsAnonymous($("#anonymous").checked ? true : false);
    }, [isAnonymous])

    // Add reaction
    const handleThumb = (idea_id, type) => {
        if (type === 1) {
            like.classList.toggle("text-primary")
        } else if (type === 2) {
            dislike.classList.toggle("text-danger")
        }
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
                setReactionType("like")
                setUserId(cookies.cookies.id)
                setIdeaId(idea_id)
            })
            .catch(error => console.log(error))
    }

    // Delete reaction
    const deleteReaction = (idea_id) => {
        axios({
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + cookies.get('token')
            },
            url: "http://localhost:8080/reaction/delete",
            data: JSON.stringify({ userId, ideaId })
        })
            .then(response => {
                setUserId(cookies.cookies.id)
                setIdeaId(idea_id)
            })
            .catch(error => console.log(error))
    }

    // Get reaction list
    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:8080/reaction/${id}`,
            headers: {
                'Authorization': 'Bearer ' + cookies.get('token')
            }
        })
            .then(response => {
                console.log(response.data.data)
                setMyUsername(response.data.data.username)
                return response.data.data
            })
            .then(response => response.find(reaction => reaction.reactionType === "like" ? setThumb(true) : setThumb(false)))
    }, [])

    // Delete idea
    const deleteIdea = idea_id => {
        axios({
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + cookies.get('token')
            },
            url: `http://localhost:8080/submit_idea/delete/${idea_id}`
        })
            .then(response => {
                console.log(response);
                setIsAlert(true)
                setClassName("alert-success")
                setMessage(response.data.message)
                navigate('/')
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className='view-idea'>
            <Link className='btn btn-primary' to={"/"}>
                <i className="fa-solid fa-angles-left mr-2"></i>
                Idea List
            </Link>
            <div className="card my-3">
                <div className="card-header">
                    <div className="d-flex align-items-center gap-2">
                        <p>Category: {cateId.cateName}</p>
                    </div>
                </div>
                <div className="card-body">
                    <h5 className="card-title">Submission: {submissionId.submissionName}</h5>
                    <p className="card-text">Description: {submissionId.description}</p>
                </div>
            </div>
            <div className="shadow rounded my-3" key={idea.ideaId}>
                <div className="user d-flex align-items-center justify-content-between p-3 border-bottom bg-light">
                    <div className="d-flex align-items-center gap-2">
                        <div className="user-image">
                            <img src="https://phunugioi.com/wp-content/uploads/2020/10/hinh-anh-avatar-de-thuong-cute.jpg" alt="" width={60} />
                        </div>
                        <div className="user-info">
                            <p className="user-name fz-20 text-primary fw-bold">{idea.isAnonymous ? "Anonymous" : posterId.username}</p>
                            <small className="post-date text-muted">{new Date(idea.createDate).toLocaleDateString()}</small>
                        </div>
                    </div>
                    <div className='idea-info'>
                        <p className='text-right'><b>Closure Date:</b> {new Date(submissionId.closureDate).toLocaleDateString()}</p>
                        <p className='text-right'><b>Final Closure Date:</b> {new Date(submissionId.finalClosureDate).toLocaleDateString()}</p>
                    </div>
                </div>
                <div className="status p-3">
                    <h4 className="border-bottom pb-2">{idea.title}</h4>
                    <p>{idea.description}</p>
                </div>
                <div className="reaction fz-20 c-pointer d-flex align-items-center gap-5 text-secondary px-3">
                    <button
                        type='button'
                        className={`like btn fz-20 ${myUsername === cookies.cookies.username ? thumb ? "text-primary" : "" : ""}`}
                        // onClick={() => myUsername === cookies.cookies.username ? thumb ? deleteReaction(idea.ideaId) : handleThumb(idea.ideaId, 1) : null}
                        onClick={() => handleThumb(idea.ideaId, 1) }
                    >
                        <i className="fa-solid fa-thumbs-up mr-2"></i>
                        Like
                    </button>
                    <button
                        type='button'
                        className={`like btn fz-20 ${!thumb ? "text-danger" : ""}`}
                        onClick={() => handleThumb(idea.ideaId, 2)}>
                        <i className="fa-solid fa-thumbs-down mr-2"></i>
                        Dislike
                    </button>
                    <Link to={`/${id}`} className="comment text-decoration-none" onClick={() => handleComment(idea.ideaId)}>
                        <i className="fa-solid fa-comment mr-2"></i>
                        Comment
                    </Link>
                </div>
                <ListComment image={image} date={date} comment={comment} />
                <button className="btn btn-primary call-to-comment m-3" onClick={handleComment}>
                    <i className="fa-solid fa-comment mr-2"></i>
                    Write a comment...
                </button>
                <div className={`my-contribute ${isShowCmt ? 'd-block' : 'd-none'}`}>
                    <div className='d-flex gap-2 p-3 pb-0 rounded'>
                        <div className="user-image">
                            <img src="https://phunugioi.com/wp-content/uploads/2020/10/hinh-anh-avatar-de-thuong-cute.jpg" alt="" width={60} />
                        </div>
                        <textarea required placeholder="Write your idea..." cols="80" rows="2" className="px-2 form-control" value={content} onChange={e => setContent(e.target.value)}></textarea>
                        {content && <button type='submit' className="btn btn-primary h-100 mt-auto" onClick={() => handlePostComment(content)}>Post</button>}
                    </div>
                    <div className="d-flex align-items-center ml-3 py-3">
                        <input type="checkbox" id="anonymous" className='mr-2' onChange={e => setIsAnonymous(e.target.checked)} />
                        <label className="form-check-label fw-bold text-danger" htmlFor="anonymous">Post as anonymous</label>
                    </div>
                </div>
            </div>
            {posterId.userId === userId && (
                <div className="d-flex gap-3 justify-content-end mb-3">
                    <Link to={`/edit/${idea.ideaId}`} className={`btn btn-warning ${submissionId.closureDate < new Date().getTime() ? "pe-none" : ""}`}>
                        <i className="fa-solid fa-pen mr-2"></i>
                        Edit
                    </Link>
                    <button className='btn btn-danger' onClick={() => deleteIdea(idea.ideaId)}>
                        <i className="fa-solid fa-trash-can mr-2"></i>
                        Delete
                    </button>
                </div>
            )}
            <Alert isAlert={isAlert} className={className} message={message} />
            <MoveToTop />
        </div>
    )
}

export default ViewIdea