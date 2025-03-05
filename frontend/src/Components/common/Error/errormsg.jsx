import React from "react";


let ErrorMessage = ({ error }) => {
    return (
        error ? <span className="error">{error}</span> : null
    )
}


export default ErrorMessage;