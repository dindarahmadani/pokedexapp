import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./SigninStyle.css";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:3001/login", { email, password })
      .then((response) => {
        console.log("token", response.data.token);
        const token = response.data.token
        if (token) {
          localStorage.setItem("authToken", token);
          window.location.href = "/"
        } else {
          toast.error("Invalid email and password", {
            position: toast.POSITION.TOP_RIGHT
          });
        }

      })
      .catch((error) => {
        toast.error("Invalid email and password", {
          position: toast.POSITION.TOP_RIGHT
        });
      });
  }

  return (
    <div className="py-28 mx-5">
      <div className="bg-white/25 p-5 mx-auto max-w-xs rounded-lg">
        <div className="auth-for-container">
          <h4 className='uppercase text-[#424372] text-4xl font-bold py-3 text-center'>Login</h4>
          <form className="signin-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              style={{ width: '100%' }}
              className='items-center'
              value={email}
              onChange={handleEmailChange}
              type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input
              style={{ width: '100%' }}
              value={password} onChange={handlePasswordChange} type="password" placeholder="********" id="password" name="password" />
            <div className='my-3'>
              <button
                type="submit"
                className="inline-block px-20 py-2.5 bg-[#8687bb] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#d4a695] hover:shadow-lg focus:bg-[#8687bb] focus:shadow-lg focus:outline-none focus:ring-0 active:[#d4a695] active:shadow-lg transition duration-150 ease-in-out">Login</button>
            </div>
            <Link to="/SignUp">
              <button className="link-btn">Don't have an account? Sign Up</button>
            </Link>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  )
}

export default SignIn