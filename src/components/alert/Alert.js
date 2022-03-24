import React from 'react'

function Alert({isAlert, className, message}) {
    
    return (
        <>{isAlert && <p className={`alert ${className}`}>{message}</p>}</>
    )
}

export default Alert