import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Cookies } from 'react-cookie'
import { useParams, Link, useNavigate } from 'react-router-dom'
import ListComment from './components/ListComment'
import Alert from "../alert/Alert"
// import MoveToTop from '../MoveToTop'

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
    const [reactionType, setReactionType] = useState("")
    const [isThumbup, setIsThumbup] = useState(false)
    const [isThumbdown, setIsThumbdown] = useState(false)
    const [submissionId, setSubmissionId] = useState("")
    const [cateId, setCateId] = useState("")
    const [isAlert, setIsAlert] = useState(false)
    const [className, setClassName] = useState("alert-success")
    const [message, setMessage] = useState("")
    const [isShowCmt, setIsShowCmt] = useState(false)
    const [reactionList, setReactionList] = useState([])
    const [countLike, setCountLike] = useState(0)
    const [countDislike, setCountDislike] = useState(0)
    const [reactionId, setReactionId] = useState(0)
    const { id } = useParams()
    const $ = document.querySelector.bind(document)
    const navigate = useNavigate()

    const myHeaders = {
        'Authorization': 'Bearer ' + cookies.get('token'),
        "Content-Type": "application/json",
    }

    // Get idea by id
    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:8080/submit_idea/${id}`,
            headers: {
                'Authorization': 'Bearer ' + cookies.get('token')
            }
        })
            .then(response => {
                setIdea(response.data.data)
                setIdeaId(response.data.data.ideaId);
                setReactionId(response.data.data.reactionId)
                setCateId(response.data.data.cateId)
                setPosterId(response.data.data.userId)
                setSubmissionId(response.data.data.submissionId)
                setUserId(parseInt(cookies.cookies.id));
                setMyUsername(cookies.cookies.username)
                setReactionType((!isThumbup) ? "like" : (!isThumbdown) ? "dislike" : "")
            })
            .catch(error => console.log(error))
    }, [])

    // Handle post comment button
    const handleComment = () => {
        setIsShowCmt(true)
        window.scrollTo(0, document.body.clientHeight)
        $(".call-to-comment").classList.add("d-none")
    }

    // Add comment
    const raw = JSON.stringify({
        content,
        userId,
        ideaId,
        isAnonymous
    })

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
                if (content !== "") {
                    window.location.reload()
                } else {
                    return false
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    // isAnonymous
    useEffect(() => {
        setIsAnonymous($("#anonymous").checked ? true : false);
    }, [isAnonymous])

    // Delete reaction
    const deleteReaction = () => {
        axios({
            method: "DELETE",
            headers: myHeaders,
            url: "http://localhost:8080/reaction/delete",
            data: JSON.stringify({ userId, ideaId })
        })
            .then(res => console.log(res))
        setIsThumbup(false)
        setIsThumbdown(false)
    }

    // Add reaction
    const handleThumb = (type) => {
        axios({
            method: "POST",
            headers: myHeaders,
            url: "http://localhost:8080/reaction/add",
            data: JSON.stringify({ reactionType, userId, ideaId })
        })
            .then(res => {
                console.log(res)
                if (type === 1) {
                    setIsThumbup(true)
                } else if (type === 2) {
                    setIsThumbdown(true)
                } else {
                    return false
                }
                console.log(type);
            })
    }

    // Edit reaction
    const editReaction = () => {
        axios({
            method: "GET",
            url: "http://localhost:8080/reaction/edit",
            headers: myHeaders,
            data: JSON.stringify({ reactionId, reactionType, userId, ideaId })
        })
            .then(res => console.log(res))
            .catch(err => console.log({err}))
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
                setReactionList(response.data.data)
            })

    }, [isThumbup, isThumbdown])

    // Delete idea
    const deleteIdea = idea_id => {
        axios({
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + cookies.get('token')
            },
            url: `http://localhost:8080/submit_idea/delete?ideaId=${idea_id}&userId=${userId}`,
            data: JSON.stringify(userId, ideaId)
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

    // Count like/ dislike and whether had my thumb
    useEffect(() => {
        const count_like = reactionList.filter(reaction => reaction.reactionType === "like")
        const count_dislike = reactionList.filter(reaction => reaction.reactionType === "dislike")
        setCountLike(count_like.length)
        setCountDislike(count_dislike.length)
        setIsThumbup(reactionList.some(reaction => reaction.reactionType === "like" && reaction.username === myUsername))
        setIsThumbdown(reactionList.some(reaction => reaction.reactionType === "dislike" && reaction.username === myUsername))
    }, [reactionList])

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
                        className={`like btn fz-20 ${isThumbup ? "text-primary" : ""}`}
                        onClick={() => !isThumbup ? handleThumb(1) : deleteReaction(1)}
                    >
                        <i className="fa-solid fa-thumbs-up mr-2"></i>
                        {countLike}
                    </button>
                    <button
                        type='button'
                        className={`dislike btn fz-20 ${isThumbdown ? "text-danger" : ""}`}
                        onClick={() => !isThumbdown ? handleThumb(2) : deleteReaction(2)}>
                        <i className="fa-solid fa-thumbs-down mr-2"></i>
                        {countDislike}
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
            {/* <MoveToTop /> */}
        </div>
    )
}

export default ViewIdea