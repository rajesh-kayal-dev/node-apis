import React, {useEffect, useState} from 'react';
import "./getUser.css";
import axios, {Axios} from "axios";
import {Link} from "react-router-dom";
import toast from "react-hot-toast";

const User = () => {
    const [users, setUsers] = useState([])

    useEffect(()=>{
            getUsers();
    },[]);

    const getUsers = async () => {
        try{
            const userData = await axios.get('http://localhost:8000/api/users/getAll');
            setUsers(userData.data.data)
        }catch(e){
            console.error(e.message);
        }
    }

    const deleteUser = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/users/delete/${id}`);
            setUsers((prevUser)=>prevUser.filter((users) => users._id !== id));
            toast.success(response.data.message);
        }catch (err){
            console.error(err.response.data.message);
        }

    }

    return (
        <div className="container mt-5 userTable">
            <Link to={'/add-user'} className="btn btn-secondary btn-sm text-warning">
                Add user <i class="fa-solid fa-user-plus"></i>
            </Link>

            <table className="table table-bordered table-hover mt-3">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Password</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {users.length > 0 ? (
                    users.map((user, index)=>(
                            <tr key={user._id}>
                                <th scope="row">{index +1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td className="text-center actionButton">
                                    <Link to={`update-user/${user._id}`} className="fa-solid fa-pen-to-square text-warning"></Link>
                                    <i onClick={()=>{
                                        if (confirm(`Want to delete ${user.name} ?`)) {
                                            deleteUser(user._id)
                                        }
                                    }} className="fa-solid fa-trash text-danger" style={{cursor:"pointer"}}></i>
                                </td>
                            </tr>
                        ))
                ):(
                    <tr>
                        <td colSpan="5" className="text-center text-muted">
                            No users found.
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default User;
