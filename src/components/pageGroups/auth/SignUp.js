import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/register', { name, email, password })
      .then((response) => {
        localStorage.setItem("authTokenRegister", true);
        console.log(response);
        toast.success("Register Account Succefully!", {
          autoClose: 5000
        });
        window.location.href = "/SignIn"
      })
      .catch((error) => {
        toast.error("Please add a valid data", {
          position: toast.POSITION.TOP_RIGHT
        });
      });
  }

  return (
    <div className="py-28 mx-5">
      <div className="bg-white/25 p-5 mx-auto max-w-xs rounded-lg">
        <div className="auth-for-container">
          <h4 className="uppercase text-[#424372] text-4xl font-bold py-3 text-center">Sign Up</h4>
          <form className="signup-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              style={{ width: '100%', backgroundColor: '#ffffff' }}
              className="items-center"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="name"
              placeholder="Your name"
              id="name"
              name="name"
            />
            <label htmlFor="email">Email</label>
            <input
              style={{ width: '100%', backgroundColor: '#ffffff' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="Email"
              placeholder="youremail.com"
              id="Email"
              name="Email"
            />
            <label htmlFor="password">Password</label>
            <input
              style={{ width: '100%', backgroundColor: '#ffffff' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="********"
              id="password"
              name="password"
            />
            <div className="my-3">
              <button
                type="submit"
                className="inline-block px-20 py-2.5 bg-[#8687bb] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#d4a695] hover:shadow-lg focus:bg-[#8687bb] focus:shadow-lg focus:outline-none focus:ring-0 active:[#d4a695] active:shadow-lg transition duration-150 ease-in-out"
              >
                Sign Up
              </button>
            </div>
            <Link to="/SignIn">
              <button className="link-btn">Already have an account? Sign In</button>
            </Link>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default SignUp; 
