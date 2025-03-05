import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import { showToast } from "../../utils/utils";
import { FaUser, FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";
import { signup } from "../../api/user";
import ValidationError from "../../Validation/ValidationError";
import ResponseHandler from "../../api/ResponseHandler/ResponseHandler";
import ProgressBtn from "../common/Progressbar/progressbar";
import InputFields from "../common/Input/inputfields"
import ErrorMessage from "../common/Error/errormsg";
import PasswordField from "../common/Input/passwordfield";
import Form from "../common/Form/form";

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpass, setConfirmPass] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmpass, setShowConfirm] = useState(false)
    const navigate = useNavigate();
    const [isTouched, setIsTouched] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!ValidationError.isSignupValidate(username, email, password, confirmpass, setError)) {
            return;
        }
        try {
            let response = await signup({ username, email, password });
            showToast("User registered successfully", "success");
            navigate("/login");
        } catch (err) {
            ResponseHandler.error(err);
        }
        setIsTouched(false);
        setError("");
    };


    const handleChange = (setter) => (e) => {
        setter(e.target.value);
        setIsTouched(true);
    };


    useEffect(() => {
        if (isTouched) {
            if (!ValidationError.isSignupValidate(username, email, password, confirmpass, setError)) {
                return;
            }
        }
    }, [username, email, password, confirmpass]);

    return (
        <div className="wrapper">
            <div className="form-box login">
                {/* <form onSubmit={handleSignup}>
                    <h1>Signup</h1>
                    <InputFields
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={handleChange(setUsername)}
                        icon={FaUser}
                    />
                    <InputFields
                        placeholder="Email"
                        onChange={handleChange(setEmail)}
                        name="email"
                        value={email}
                        icon={FaEnvelope}
                    />
                    <PasswordField
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={handleChange(setPassword)}
                        name="password"
                        showPassword={showPassword}
                        togglePasswordVisibility={() => setShowPassword(!showPassword)} />
                    <PasswordField
                        type={showConfirmpass ? "text" : "password"}
                        placeholder="Confirm Password"
                        onChange={handleChange(setConfirmPass)}
                        name="confirmpass"
                        value={confirmpass}
                        showPassword={showConfirmpass}
                        togglePasswordVisibility={() => setShowConfirm(!showConfirmpass)}
                    />
                    <ErrorMessage error={error} />
                    <ProgressBtn
                        type="submit"
                        text="Signup"
                        className="w-100 mt-3"
                        variant="dark"
                    />

                    <div className="register-link">
                        <p>
                            Already have an account?{" "}
                            <span
                                className="login-link"
                                onClick={() => navigate("/login")}
                                style={{
                                    color: "black",
                                    cursor: "pointer",
                                    textDecoration: "underline",
                                }}
                            >
                                Login
                            </span>
                        </p>
                    </div>
                </form> */}
                <Form
                    title="Signup"
                    fields={[
                        { type: "text", placeholder: "Username", name: "username", value: username, onChange: handleChange(setUsername), icon: FaUser },
                        { type: "email", placeholder: "Email", name: "email", value: email, onChange: handleChange(setEmail), icon: FaEnvelope },
                        { type: showPassword ? "text" : "password", placeholder: "Password", name: "password", value: password, onChange: handleChange(setPassword), showPassword, togglePasswordVisibility: () => setShowPassword(!showPassword) },
                        { type: showConfirmpass ? "text" : "password", placeholder: "Confirm Password", name: "confirmpass", value: confirmpass, onChange: handleChange(setConfirmPass), showPassword: showConfirmpass, togglePasswordVisibility: () => setShowConfirm(!showConfirmpass) }
                    ]}
                    onSubmit={handleSignup}
                    error={error}
                    buttonText="Signup"
                    footerText="Already have an account?"
                    footerAction={() => navigate("/login")}
                />
            </div>
        </div>
    );
}

export default Signup;
