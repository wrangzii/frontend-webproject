import React, { useState, useEffect, useLayoutEffect } from 'react'
import axios from 'axios'
import { Cookies } from 'react-cookie'
import { useParams, Link, useNavigate } from 'react-router-dom'
import ListComment from './components/ListComment'
import Alert from "../alert/Alert"
import avatar from '../../assets/avatar.jpg'
// import MoveToTop from '../MoveToTop'

function ViewIdea({ image, date }) {
    const cookies = new Cookies()
    const [myUsername, setMyUsername] = useState("")
    const [idea, setIdea] = useState({})
    const [content, setContent] = useState("")
    const [posterId, setPosterId] = useState(0)
    const [userId, setUserId] = useState(0)
    const [ideaId, setIdeaId] = useState(0)
    const [isAnonymous, setIsAnonymous] = useState(false)
    const [reactionType, setReactionType] = useState("like")
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
                setCateId(response.data.data.cateId)
                setPosterId(response.data.data.userId)
                setSubmissionId(response.data.data.submissionId)
                setUserId(parseInt(cookies.cookies.id));
                setMyUsername(cookies.cookies.username)
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

    // Add reaction
    const handleThumb = (type) => {
        if (type === 1) {
            setIsThumbup(true)
            setReactionType("like")
        } else if (type === 2) {
            setIsThumbdown(true)
            setReactionType("dislike")
        } else {
            return false
        }
        axios({
            method: "POST",
            headers: myHeaders,
            url: "http://localhost:8080/reaction/add",
            data: JSON.stringify({ reactionType, userId, ideaId })
        })
            .then(res => {
                console.log(res)
            })
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

    const deleteReaction = () => {
        setIsThumbup(false)
        setIsThumbdown(false)
        axios({
            method: "DELETE",
            headers: myHeaders,
            url: "http://localhost:8080/reaction/delete",
            data: JSON.stringify({ userId, ideaId })
        })
        .then(res => console.log(res))
    }


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
    useLayoutEffect(() => {
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
                <div className="user d-flex align-items-center justify-content-between p-3 border-bottom bg-light flex-wrap gap-3">
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                        <div className="user-image">
                            <img src={avatar} alt="" width={60} />
                        </div>
                        <div className="user-info">
                            <p className="user-name fz-20 text-primary fw-bold">{idea.isAnonymous ? "Anonymous" : posterId.username}</p>
                            <small className="post-date">{new Date(idea.createDate).toLocaleDateString()}</small>
                        </div>
                    </div>
                    <div className='idea-info'>
                        <p className='text-left text-sm-right'><b>Closure Date:</b> {new Date(submissionId.closureDate).toLocaleDateString()}</p>
                        <p className='text-left text-sm-right'><b>Final Closure Date:</b> {new Date(submissionId.finalClosureDate).toLocaleDateString()}</p>
                    </div>
                </div>
                <div className="status p-3">
                    <h4 className="border-bottom pb-2">{idea.title}</h4>
                    <p>{idea.description}</p>
                </div>
                <div className="reaction fz-20 c-pointer d-flex align-items-center gap-3 gap-sm-5 text-secondary px-3 flex-wrap">
                    <button
                        type='button'
                        className={`like btn fz-20 ${isThumbup ? "text-primary" : ""}`}
                        onClick={() => isThumbup ? deleteReaction() : handleThumb(1)}
                    >
                        <i className="fa-solid fa-thumbs-up mr-2"></i>
                        {countLike}
                    </button>
                    <button
                        type='button'
                        className={`dislike btn fz-20 ${isThumbdown ? "text-danger" : ""}`}
                        onClick={() => isThumbdown ? deleteReaction() : handleThumb(2)}>
                        <i className="fa-solid fa-thumbs-down mr-2"></i>
                        {countDislike}
                    </button>
                    <Link to={`/${id}`} className="comment btn fz-20" onClick={() => handleComment(idea.ideaId)}>
                        <i className="fa-solid fa-comment mr-2"></i>
                        Comment
                    </Link>
                </div>
                <ListComment image={image} date={date} />
                <button className="btn btn-primary call-to-comment m-3" onClick={handleComment}>
                    <i className="fa-solid fa-comment mr-2"></i>
                    Write a comment...
                </button>
                <div className={`my-contribute ${isShowCmt ? 'd-block' : 'd-none'}`}>
                    <div className='d-flex gap-2 p-3 pb-0 rounded'>
                        <div className="user-image">
                            <img src={avatar} alt="" width={60} />
                        </div>
                        <textarea required placeholder="Write your idea..." cols="80" rows="2" className="px-2 form-control" value={content} onChange={e => setContent(e.target.value)}></textarea>
                        {content && (
                            <button
                                type='submit'
                                className="btn btn-primary h-100 mt-auto"
                                onClick={() => handlePostComment(content)}>
                                Post
                            </button>
                        )}
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