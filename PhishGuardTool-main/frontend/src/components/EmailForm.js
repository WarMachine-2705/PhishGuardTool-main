import React, { useState } from "react";
import axios from "axios";

const EmailForm = ({ onLogUpdate }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        onLogUpdate("Starting phishing detection scan...");

        try {
            setTimeout(async () => {
                try {
                    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
                    const response = await axios.post(`${API_URL}/api/email/start`, { email, password });
                    onLogUpdate(response.data.message);
                    onLogUpdate("Scanning for suspicious patterns...");
                } catch (error) {
                    onLogUpdate("Error: Unable to connect to email server.");
                    onLogUpdate("Please check your credentials and try again.");
                } finally {
                    setIsLoading(false);
                }
            }, 1000);
        } catch (error) {
            onLogUpdate("Error starting detection.");
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label text-light">
                    Email Address
                </label>
                <div className="input-group">
                    <span className="input-group-text bg-dark text-light border-light">
                        ✉️
                    </span>
                    <input
                        id="email"
                        type="email"
                        className="form-control bg-dark text-light border-light"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
            </div>
            
            <div className="mb-4">
                <label htmlFor="password" className="form-label text-light">
                    App Password
                </label>
                <div className="input-group">
                    <span className="input-group-text bg-dark text-light border-light">
                        🔑
                    </span>
                    <input
                        id="password"
                        type="password"
                        className="form-control bg-dark text-light border-light"
                        placeholder="App Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
            </div>
            
            <button
                type="submit"
                disabled={isLoading}
                className="btn btn-light w-100"
            >
                {isLoading ? (
                    <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Scanning...
                    </>
                ) : (
                    "Start Scanning"
                )}
            </button>
        </form>
    );
};

export default EmailForm;