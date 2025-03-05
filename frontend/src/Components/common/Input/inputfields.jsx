import React from "react";
import "./input.css"

let InputFields = ({ value, type, placeholder, name, onChange, maxLength, className, icon: Icon }) => {
    return (
        <div className="input-box">
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                className=""
            />
            {Icon && <Icon className="icon" />}
        </div>
    )
}


export default InputFields;