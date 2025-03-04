import React from "react";

let InputFields = ({ value, type, placeholder, name, onChange, maxLength ,className}) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            maxLength={maxLength}
            className={className}
        />
    )
}


export default InputFields;