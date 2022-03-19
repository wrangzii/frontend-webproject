import React from "react";
import Comment from "./Comment";

const comments = [
    {id: 1, author: 'abc', content: 'dsfgsdg', timeAgo: 'Today at 10:00AM'},
    {id: 1, author: 'abc', content: 'dsfgsdg', timeAgo: 'Today at 10:00AM'},
    {id: 1, author: 'abc', content: 'dsfgsdg', timeAgo: 'Today at 10:00AM'}
]

const IdeaHomePage = () => {

    const contents = comments.map(item => {
        return (
            <Comment key={item.id} author={item.author} content={item.content} timeAgo={item.timeAgo}></Comment>
        )
    })

    return (
        <div className="ui container comments">          
            {contents}
        </div>
    )
}

export default IdeaHomePage;