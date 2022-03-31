import React from 'react'

function UserComment() {
    return (
        <div className="user-comment bg-light p-2 border-bottom">
            <div className="user d-flex align-items-center gap-2 py-3">
                <div className="user-image"><img src="https://phunugioi.com/wp-content/uploads/2020/10/hinh-anh-avatar-de-thuong-cute.jpg" alt="" width={60} /></div>
                <div className="user-info">
                    <p className="user-name fz-20">My name</p>
                    <small className="post-date">12/2/2022</small>
                </div>
            </div>
            <p className="px-3">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
    )
}

export default UserComment