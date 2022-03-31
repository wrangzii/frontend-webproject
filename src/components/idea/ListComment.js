import React from "react";
import { Link } from "react-router-dom";
import UserComment from "./components/UserComment";

const ListComment = ({image, name, date, comment}) => {

    return (
        <>
            <div className="comment-board border">
                <div className="user d-flex align-items-center gap-2 p-2">
                    <div className="user-image">
                        <img src="https://phunugioi.com/wp-content/uploads/2020/10/hinh-anh-avatar-de-thuong-cute.jpg" alt="" width={60} />
                    </div>
                    <div className="user-info">
                        <p className="user-name fz-20 text-primary fw-bold">Truong Quoc Khanh</p>
                        <small className="post-date text-muted">12/2/2022</small>
                    </div>
                </div>
                <div className="status border-top border-bottom p-2">
                    <h4>Luc di het minh luc ve het buon</h4>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste, dolores. Ipsa officiis unde ab vero dolorum, necessitatibus iure hic natus nobis nihil dignissimos ullam nesciunt quae numquam aliquam illo corporis!</p>
                </div>
                <div className="reaction fz-20 c-pointer d-flex gap-5 text-secondary p-2 bg-light">
                    <div className="like d-flex align-items-center gap-2">
                        <i className="fa-solid fa-thumbs-up"></i>
                        <p>Like</p>
                    </div>
                    <div className="dislike d-flex align-items-center gap-2">
                        <i className="fa-solid fa-thumbs-down"></i>
                        <p>Dislike</p>
                    </div>
                    <div className="comment d-flex align-items-center gap-2">
                        <i className="fa-solid fa-comment"></i>
                        <p>Comment</p>
                    </div>
                </div>
                <div className="count-reaction fz-20 d-flex align-items-center gap-5 border-top border-bottom p-2 bg-light">
                    <div className="like d-flex align-items-center gap-2">
                        <i className="fa-solid fa-thumbs-up"></i>
                        <p>420</p>
                    </div>
                    <div className="dislike d-flex align-items-center gap-2">
                        <i className="fa-solid fa-thumbs-down"></i>
                        <p>69</p>
                    </div>
                </div>
                <UserComment image={image} name={name} date={date} comment={comment} />
                <UserComment image={image} name={name} date={date} comment={comment} />
                <UserComment image={image} name={name} date={date} comment={comment} />
                <div className="my-contribute d-flex gap-2 p-2">
                    <div className="user-image">
                        <img src="https://phunugioi.com/wp-content/uploads/2020/10/hinh-anh-avatar-de-thuong-cute.jpg" alt="" width={60} />
                    </div>
                    <textarea placeholder="Write your idea..." name="" id="" cols="80" rows="2" className="px-2"></textarea>
                </div>
            </div>

            <nav aria-label="Page navigation example" className="mt-5">
                <ul className="pagination">
                    <li className="page-item">
                        <Link className="page-link" to="1" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </Link>
                    </li>
                    <li className="page-item"><Link className="page-link" to="1">1</Link></li>
                    <li className="page-item"><Link className="page-link" to="1">2</Link></li>
                    <li className="page-item"><Link className="page-link" to="1">3</Link></li>
                    <li className="page-item">
                        <Link className="page-link" to="1" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default ListComment;