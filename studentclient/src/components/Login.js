import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/studentApi";
import "./student.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await login(username, password);
            if (response.token) {
                navigate("/studentList"); 
            } else {
                alert("Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred during login.");
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
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
            <button onClick={handleLogin}>Login</button>
            <p className="toggle-link" onClick={() => navigate("/register")}>
                Don't have an account? Register
            </p>
        </div>
    );
};

export default Login;
