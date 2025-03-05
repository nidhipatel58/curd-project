import React from "react";
import InputFields from "../Input/inputfields";
import PasswordField from "../Input/passwordfield";
import ErrorMessage from "../Error/errormsg";
import ProgressBtn from "../Progressbar/progressbar";
import "./form.css"


let Form = ({ fields, title, onSubmit, error, buttonText, footerText, footerAction, }) => {
    return (
        <form onSubmit={onSubmit}>
            <h1>{title}</h1>
            {fields.map((field, index) =>
                field.type === "password" ? (
                    <PasswordField key={index} {...field} />
                ) : (
                    <InputFields key={index} {...field} />
                )
            )}
            <ErrorMessage error={error} />
            <ProgressBtn type="submit" text={buttonText} className="w-100 mt-3" variant="dark" />
            <div className="register-link">
                <p>
                    {footerText}{" "}
                    <span
                        className="login-link"
                        onClick={footerAction}
                        style={{ color: "black", cursor: "pointer", textDecoration: "underline" }}
                    >
                        {buttonText === "Signup" ? "Login" : "Signup"}
                    </span>
                </p>
            </div>
        </form>
    )
}

export default Form;