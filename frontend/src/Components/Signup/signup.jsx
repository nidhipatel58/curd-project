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
                <form onSubmit={handleSignup}>
                    <h1>Signup</h1>
                    <div className="input-box">
                        <InputFields
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={username}
                            onChange={handleChange(setUsername)}
                        />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <InputFields
                            placeholder="Email"
                            onChange={handleChange(setEmail)}
                            name="email"
                            value={email}
                        />
                        <FaEnvelope className="icon" />
                    </div>
                    <div className="input-box">
                        <InputFields
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            onChange={handleChange(setPassword)}
                            name="password"
                            value={password}
                        />
                        <span
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <div className="input-box">
                        <InputFields
                            type={showConfirmpass ? "text" : "password"}
                            placeholder="Confirm Password"
                            onChange={handleChange(setConfirmPass)}
                            name="confirmpass"
                            value={confirmpass}
                        />
                        <span
                            className="password-toggle"
                            onClick={() => setShowConfirm(!showConfirmpass)}
                        >
                            {showConfirmpass ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    {error && <span className="error">{error}</span>}
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
                </form>
            </div>
        </div>
    );
}

export default Signup;
