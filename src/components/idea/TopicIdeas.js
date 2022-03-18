import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

const TopicIdeas = () => {
    const [topicIdeas, setTopicIdea] = useState ([])
    const [listTopicIdeas, setListTopicIdeas] = useState([])
    const navigate = useNavigate();
    const cookies = new Cookies();
    const myHeaders = {
        'Authorization': 'Bearer ' + cookies.get('token'),
        'Content-Type': 'application/json'
    }

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    useEffect(() => {
        fetch("", requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw Error(response.message);
            })
            .then(result => setListTopicIdeas(result))
            .catch(error => {
                navigate('/idea')
            });
    }, [listTopicIdeas])

    const deleteTopicIdea = topicIdeaId => {
        fetch(`http://localhost:8080/users/delete/${topicIdeaId}`, {
            method: 'DELETE',
            headers: myHeaders,
        })
            .then(res => res.json())
            .then(id => setListTopicIdeas(listTopicIdeas.filter(topicIdea => id !== topicIdea.topicIdeaId)))
    }

    return (
        <div className="topic-idea">
            {topicIdeas.topicIdeaId}   
        </div>
    )
}

export default TopicIdeas;