import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Cookies } from 'react-cookie'
import { useParams, Link } from 'react-router-dom'
import ListComment from './components/ListComment'

function ViewIdea({ image, date }) {
    const cookies = new Cookies()
    const [idea, setIdea] = useState({})
    const [author, setAuthor] = useState({})
    const [comment, setComment] = useState("")
    const [content, setContent] = useState("")
    const [userId, setUserId] = useState(0)
    const [ideaId, setIdeaId] = useState(0)
    const [isAnonymous, setIsAnonymous] = useState(false)
    const [reactionType, setReactionType] = useState("like")
    const [thumb, setThumb] = useState(false)
    const { id } = useParams()
    const $ = document.querySelector.bind(document)

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
                setIdea(response.data.data)
                setAuthor(response.data.data.userId);
                setIdeaId(response.data.data.ideaId);
                setUserId(response.data.data.userId.userId);
                setIsAnonymous(response.data.data.isAnonymous)
            })
            .catch(error => console.log(error))
        }, [])
        
    // Check post owner
    useEffect(() => {
        console.log(cookies.cookies.id, userId);
        setIsAnonymous(true)
    }, [])

    const handleComment = () => $("textarea").focus()

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

    const handleDislike = id => {
        if ($(".fa-thumbs-up").classList.contains("text-primary")) {
            $(".fa-thumbs-up").classList.remove("text-primary")
        }
        $(".fa-thumbs-down").classList.toggle("text-danger")
        setThumb(!thumb)
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
                setReactionType("dislike")
                setUserId(cookies.cookies.id)
            })
            .catch(error => console.log(error))
    }

    // Get posting views
    // useEffect(() => {
    //     axios({
    //         'method': "GET",
    //         'url': `http://localhost:8080/submit_idea/viewCount/${id}`,
    //         'headers': { 'Authorization': 'Bearer ' + cookies.get('token') },
    //     })
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err.response.data.error))
    // }, [])

    const handleLike = () => {
        if ($(".fa-thumbs-down").classList.contains("text-danger")) {
            $(".fa-thumbs-down").classList.remove("text-danger")
        }
        $(".fa-thumbs-up").classList.toggle("text-primary")
        setThumb(!thumb)
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
            })
            .catch(error => console.log(error))
        if ($(".fa-thumbs-up").classList.contains("text-primary")) {
            console.log(thumb);
        }
    }

    // Get reaction list
    // useEffect(() => {
    //     axios({
    //         method: "GET",
    //         url: `http://localhost:8080/reaction/${id}`,
    //         headers: {
    //             'Authorization': 'Bearer ' + cookies.get('token')
    //         }
    //     })
    //     .then(response => console.log(response))
    // },[])

    return (
        <div className='view-idea'>
            <Link className='btn btn-danger' to={"/"}>Idea List</Link>
            <div className="shadow rounded" key={idea.ideaId}>
                <div className="user d-flex align-items-center justify-content-between p-3 border-bottom bg-light">
                    <div className="user d-flex align-items-center gap-2">
                        <div className="user-image">
                            <img src="https://phunugioi.com/wp-content/uploads/2020/10/hinh-anh-avatar-de-thuong-cute.jpg" alt="" width={60} />
                        </div>
                        <div className="user-info">
                            <p className="user-name fz-20 text-primary fw-bold">{author.username}</p>
                            <small className="post-date text-muted">{new Date(idea.createDate).toLocaleDateString()}</small>
                        </div>
                    </div>
                    {/* {isAnonymous && <Link to={`/edit/${idea.ideaId}`} className='btn btn-warning float-end'>Edit</Link>} */}
                    <Link to={`/edit/${idea.ideaId}`} className='btn btn-warning float-end'>Edit</Link>
                </div>
                <div className="status p-3">
                    <h4 className="border-bottom pb-2">{idea.title}</h4>
                    <p>{idea.description}</p>
                </div>
                <div className="reaction fz-20 c-pointer d-flex gap-5 text-secondary p-3">
                    <div className="like d-flex align-items-center gap-2" onClick={handleLike}>
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
                <ListComment image={image} date={date} comment={comment} />
                <div className="my-contribute d-flex gap-2 p-3 rounded">
                    <div className="user-image">
                        <img src="https://phunugioi.com/wp-content/uploads/2020/10/hinh-anh-avatar-de-thuong-cute.jpg" alt="" width={60} />
                    </div>
                    <textarea required placeholder="Write your idea..." cols="80" rows="2" className="px-2 form-control" value={content} onChange={e => setContent(e.target.value)}></textarea>
                    {content && <button type='submit' className="btn btn-primary h-100 mt-auto" onClick={() => handlePostComment(content)}>Post</button>}
                </div>
                <div className="d-flex align-items-center ml-3 pb-3">
                    <input type="checkbox" id="anonymous" className='mr-2' onChange={e => setIsAnonymous(e.target.checked)} />
                    <label className="form-check-label fw-bold text-danger" htmlFor="anonymous">Post as anonymous</label>
                </div>
            </div>
        </div>
    )
}

export default ViewIdea