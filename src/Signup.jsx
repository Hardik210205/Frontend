import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Signup() {
    // 1. Initialize state with empty strings
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();

        // 2. Add frontend validation to prevent empty submissions
        if (!name || !email || !password) {
            alert("All fields are required!");
            return; // Stop the function here
        }

        axios.post(`${import.meta.env.VITE_API_URL}/register`, { name, email, password })
        .then(result => {
            console.log(result);
            // 3. Navigate only on a clear success message from the server
            if (result.data.status === "Success") {
                navigate('/login');
            }
        })
        .catch(err => {
            console.log(err);
            // 4. Show a specific error message to the user if something goes wrong
            if (err.response) {
                alert(err.response.data.message);
            }
        });
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded" style={{ width: '90%', maxWidth: '400px' }}>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    {/* 5. Corrected HTML attributes below */}
                    <div className="mb-3">
                        <label htmlFor="name">
                            <strong>Name</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="off"
                            id="name"
                            name="name"
                            className="form-control rounded-0"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            id="email"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            id="password"
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Register
                    </button>
                </form>
                <p>Already Have an Account</p>
                <Link
                    to="/login"
                    className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
                >
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Signup;