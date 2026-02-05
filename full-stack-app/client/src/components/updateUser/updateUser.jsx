import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import toast from "react-hot-toast";

const UpdateUser = () => {
    const { id } = useParams();

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
    useEffect(()=>{
        const  getUserById = async () => {
           try {
               const response = await axios.get(`http://localhost:8000/api/users/${id}`);
               setUser(response.data.data);
           }catch(error) {
               toast.error("Failed to get user data");
           }
        };
        getUserById();
    },[id])


    const handelSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios
                .put(`http://localhost:8000/api/users/update/${id}`,user)
            toast.success(response.data.message);
            setTimeout(()=> navigate("/"), 1000)

        }catch (error) {
            toast.error(error.response?.data?.message || "Failed to update user!");
        }
    }
    const handleReset = () => {
        setUser({
            name: '',
            email: '',
            password: ''
        })

    }



    return (
        <div className="container mt-5">
            <div className="card shadow p-4 rounded-3" style={{ maxWidth: "500px", margin: "0 auto" }}>
                <div className="mb-3">
                    <Link to="/" className="btn btn-secondary btn-sm">
                        <i className="fa-solid fa-backward me-2"></i> Back
                    </Link>
                </div>                <h3 className="text-center mb-4 text-primary fw-bold">Update User</h3>
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
                            <i className="fa-solid fa-pen-to-square me-2"></i> Update User
                        </button>
                        <button type="reset" onClick={handleReset} className="btn btn-outline-secondary w-50">
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateUser;