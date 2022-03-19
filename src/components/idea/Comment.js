import React from 'react'

const Comment = (props) => {
    return (
        <div className='ui container comment'>
            <div className='content'>
                <a href="" className='author'>
                    {props.author}
                </a>
                <div className='metadata'>
                    <span className='date'>{props.timeAgo}</span>
                </div>
                <div className='text'>{props.content}</div>
            </div>
        </div>
    )
}

export default Comment;