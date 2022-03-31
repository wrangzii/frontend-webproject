import React from 'react'

function AddIdea() {
    return (
        <div className="idea">
            <div className="card mb-3">
                <div className="card-header">Category: abc</div>
                <div className="card-body">
                    <h5 className="card-title">Submission: ABC dat de di ia</h5>
                    <p className="card-text">Description: de k ia dat de ve chuong</p>
                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                </div>
            </div>
            <div className="idea-contribute">
                <div className="user d-flex align-items-center gap-2 p-2">
                    <div className="user-image">
                        <img src="https://phunugioi.com/wp-content/uploads/2020/10/hinh-anh-avatar-de-thuong-cute.jpg" alt="" width={60} />
                    </div>
                    <div className="user-info">
                        <p className="user-name fz-20 text-primary fw-bold">Truong Quoc Khanh</p>
                        <small className="post-username text-muted">@username</small>
                    </div>
                </div>
                <textarea className='w-100 p-2' name="" id="" rows="10"></textarea>
                <button type='button' className='btn btn-primary float-end my-3'>Post your idea</button>
            </div>
        </div>
    )
}

export default AddIdea