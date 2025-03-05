import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordField = ({ type, placeholder, name, value, onChange, showPassword, togglePasswordVisibility }) => (
    <div className="input-box">
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
        />
        <span
            className="password-toggle"
            onClick={togglePasswordVisibility}
        >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
    </div>
);

export default PasswordField;