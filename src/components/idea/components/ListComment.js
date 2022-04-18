import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Cookies } from 'react-cookie'
import avatar from '../../../assets/avatar.jpg'

function ListComment() {
    const [comments, setComments] = useState([])
    const [commentsCount, setCommentsCount] = useState(0)
    const [mounted, setMounted] = useState(true)
    const cookies = new Cookies()

    const myHeaders = {
        'Authorization': 'Bearer ' + cookies.get('token'),
    }

    const { id } = useParams()

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:8080/comment/all/${id}`,
            headers: myHeaders,
        })
            .then(response => {
                setComments(response.data)
                setCommentsCount(response.data.length);
            })
            .catch(error => console.log(error))
        return () => setMounted(false)
    }, [])

    if (commentsCount !== 0) {
        return (
            <div className="user-comment bg-light p-2 border-bottom">
                {comments.map(comment => (
                    <div key={comment.commentId} className="border-top">
                        <div className="user d-flex align-items-center gap-2 py-3">
                            <div className="user-image">
                                <img src={avatar} alt="" width={60} />
                            </div>
                            <div className="user-info">
                                <p className="user-name fz-20">{comment.isAnonymous ? "Anonymous" : comment.username}</p>
                                <small className="post-date">{new Date(comment.createDate).toLocaleDateString()}</small>
                            </div>
                        </div>
                        <p className="px-3">{comment.content}</p>
                    </div>
                ))}
            </div>
        )
    }
    return (
        null
    )
}

export default ListComment