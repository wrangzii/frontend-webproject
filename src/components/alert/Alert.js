import React from 'react'

function Alert({isAlert, className, message}) {
    
    return (
        <>{isAlert && <p className={`alert ${className} my-3`}>{message}</p>}</>
    )
}

export default Alert