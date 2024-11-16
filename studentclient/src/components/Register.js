import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/studentApi";
import "./student.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await register({ username, password, firstname, lastname });
            if (response.success) {
                navigate("/login"); 
            } else {
                alert("Registration failed");
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("An error occurred during registration.");
        }
    };

    return (
        <div className="form-container">
            <h2>Register</h2>
            <input
                type="text"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
            />
            <input
                type="text"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
            />
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
            <p className="toggle-link" onClick={() => navigate("/login")}>
                Already have an account? Login
            </p>
        </div>
    );
};

export default Register;
