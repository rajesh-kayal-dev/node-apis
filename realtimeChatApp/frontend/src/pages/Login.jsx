import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../main.jsx";

const Login = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await axios.post(`${serverUrl}/api/auth/login`, {
                email,
                password,
            }, { withCredentials: true });

            console.log("Login successful:", result.data);
            navigate("/");
            setEmail("");
            setPassword("");
            setLoading(false);
            setError("");

        } catch (error) {
            console.error("Login error:", error);
            setLoading(false);
            setError(error.response.data.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden max-w-sm w-full m-4">
                <div className="bg-sky-400 p-10 rounded-b-3xl">
                    <h2 className="text-white text-3xl text-center font-light">
                        Welcome back to <span className="font-bold">Chatly</span>
                    </h2>
                </div>

                <div className="p-8">
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>

                        <div className="relative">
                            <input
                                type={show ? 'text' : 'password'}
                                placeholder="Password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                            <span
                                onClick={() => setShow(prev => !prev)}
                                className="absolute inset-y-0 right-0 flex items-center pr-4 text-sky-500 text-lg cursor-pointer"
                            >
                                {show ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {error && <p className={'text-red-500'}>{"*"+error}</p>}

                        <div>
                            <button
                                type="submit"
                                className="w-full bg-sky-400 text-white py-3 rounded-full font-semibold shadow-lg hover:bg-sky-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-50"
                                disabled={loading}
                            >
                                {loading ?"Loading...":"Login"}
                            </button>
                        </div>
                    </form>

                    <p className="text-center text-gray-500 text-sm mt-8">
                        Don’t have an account?{' '}
                        <span
                            onClick={() => navigate('/signup')}
                            className="text-sky-500 font-medium hover:underline cursor-pointer"
                        >
                            Sign Up
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
