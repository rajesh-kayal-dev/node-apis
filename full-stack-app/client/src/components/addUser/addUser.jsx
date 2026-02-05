import React, {useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

const AddUser = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handelChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handelSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios
                .post('http://localhost:8000/api/users/create',user)
            toast.success(response.data.message || "User added successfully!");

            navigate('/')

        }catch (error) {
            console.log(error.message)
        }
    }



    return (
        <div className="container mt-5">
            <div className="card shadow p-4 rounded-3" style={{ maxWidth: "500px", margin: "0 auto" }}>
                <div className="mb-3">
                    <Link to="/" className="btn btn-secondary btn-sm">
                        <i className="fa-solid fa-backward me-2"></i> Back
                    </Link>
                </div>                <h3 className="text-center mb-4 text-primary fw-bold">Add New User</h3>
                <form  onSubmit={handelSubmit}>
                    {/* Name */}
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-semibold">
                           Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            placeholder="Enter full name"
                            value={user.name}
                            onChange={handelChange}
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-semibold">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={user.email}
                            onChange={handelChange}
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label fw-semibold">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={user.password}
                            onChange={handelChange}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="d-flex justify-content-between mt-4">
                        <button type="submit" className="btn btn-primary w-50 me-2">
                            <i className="fa-solid fa-user-plus me-2"></i> Add User
                        </button>
                        <button type="reset" className="btn btn-outline-secondary w-50">
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUser;