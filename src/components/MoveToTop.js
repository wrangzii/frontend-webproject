import React, { useState } from 'react'

function MoveToTop() {
    const [isShow, setIsShow] = useState(false)
    const moveToTop = () => {
        window.scrollTo(0, -(document.body.clientHeight))
    }
    window.onscroll = () => {
        document.body.clientHeight / 3 < window.scrollY ? setIsShow(true) : setIsShow(false)
    }

    return (
        <button className={`btn btn-secondary btn-lg position-sticky float-end ${isShow ? 'd-block' : 'd-none'}`} style={{ bottom: 0, right: 0 }} onClick={moveToTop}>
            <i className="fa-solid fa-arrow-up"></i>
        </button>
    )
}

export default MoveToTop