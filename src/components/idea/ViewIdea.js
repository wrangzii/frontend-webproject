import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Cookies } from 'react-cookie'
import { useParams } from 'react-router-dom'
import ListComment from './components/ListComment'

function ViewIdea({ image, name, date }) {
    const [idea, setIdea] = useState({})
    const [author, setAuthor] = useState({})
    const [comment, setComment] = useState("")
    const [content, setContent] = useState("")
    const [userId, setUserId] = useState(8)
    const [ideaId, setIdeaId] = useState(1)
    const [isAnonymous, setIsAnonymous] = useState(false)
    const { id } = useParams()
    const cookies = new Cookies()
    const $ = document.querySelector.bind(document)

    const myHeaders = {
        'Authorization': 'Bearer ' + cookies.get('token')
    }

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:8080/submit_idea/${id}`,
            headers: myHeaders
        })
            .then(response => {
                setIdea(response.data.data)
                setAuthor(response.data.data.userId);
            })
            .catch(error => console.log(error))
    }, [])
    const handleLike = idea_id => {
        if ($(".fa-thumbs-down").classList.contains("text-danger")) {
            $(".fa-thumbs-down").classList.remove("text-danger")
        }
        $(".fa-thumbs-up").classList.toggle("text-primary")
    }

    const handleDislike = idea_id => {
        if ($(".fa-thumbs-up").classList.contains("text-primary")) {
            $(".fa-thumbs-up").classList.remove("text-primary")
        }
        $(".fa-thumbs-down").classList.toggle("text-danger")
    }

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
                setIdeaId(idea.ideaId)
                setUserId(author.userId)
                // setIsAnonymous(idea.ideaId)
                console.log(response)
            })
            .catch(error => console.log(error))
    }

    return (
        <div className='view-idea'>
            <div className="shadow rounded" key={idea.ideaId}>
                <div className="user d-flex align-items-center gap-2 p-3 border-bottom">
                    <div className="user-image">
                        <img src="https://phunugioi.com/wp-content/uploads/2020/10/hinh-anh-avatar-de-thuong-cute.jpg" alt="" width={60} />
                    </div>
                    <div className="user-info">
                        <p className="user-name fz-20 text-primary fw-bold">{author.username}</p>
                        <small className="post-date text-muted">{new Date(idea.createDate).toLocaleDateString()}</small>
                    </div>
                </div>
                <div className="status p-3">
                    <h4 className="border-bottom pb-2">{idea.title}</h4>
                    <p>{idea.description}</p>
                </div>
                <div className="reaction fz-20 c-pointer d-flex gap-5 text-secondary p-3 bg-light">
                    <div className="like d-flex align-items-center gap-2" onClick={() => handleLike(idea.ideaId)}>
                        <i className="fa-solid fa-thumbs-up"></i>
                        20
                    </div>
                    <div className="dislike d-flex align-items-center gap-2" onClick={() => handleDislike(idea.ideaId)}>
                        <i className="fa-solid fa-thumbs-down"></i>
                        10
                    </div>
                    <div className="comment d-flex align-items-center gap-2" onClick={() => handleComment()}>
                        <i className="fa-solid fa-comment"></i>
                        Comment
                    </div>
                </div>
                <ListComment image={image} date={date} comment={comment} />
                <div className="my-contribute d-flex gap-2 p-3 mb-5 border rounded">
                    <div className="user-image">
                        <img src="https://phunugioi.com/wp-content/uploads/2020/10/hinh-anh-avatar-de-thuong-cute.jpg" alt="" width={60} />
                    </div>
                    <textarea placeholder="Write your idea..." cols="80" rows="2" className="px-2 form-control" value={content} onChange={e => setContent(e.target.value)}></textarea>
                    <button className="btn btn-primary h-100 mt-auto" onClick={() => handlePostComment(content)}>Post</button>
                </div>
            </div>
        </div>
    )
}

export default ViewIdea