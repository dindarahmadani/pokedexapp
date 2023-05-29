import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }

    axios.post("http://localhost:3001/auth/register", { email, password })
      .then((response) => {
        localStorage.setItem("authToken", true);
        navigate('/SignIn')
      })
      .catch((error) => {
        toast.error("Error occurred during sign up", {
          position: toast.POSITION.TOP_RIGHT
        });
      });
  };

  return (
    <div className="py-28 mx-5">
      <div className="bg-white/25 p-5 mx-auto max-w-xs rounded-lg">
        <div className="auth-for-container">
          <h4 className="uppercase text-[#424372] text-4xl font-bold py-3 text-center">Sign Up</h4>
          <form className="signup-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              style={{ width: '100%' }}
              className="items-center"
              value={email}
              onChange={handleEmailChange}
              type="email"
              placeholder="youremail@gmail.com"
              id="email"
              name="email"
            />
            <label htmlFor="password">Password</label>
            <input
              style={{ width: '100%' }}
              value={password}
              onChange={handlePasswordChange}
              type="password"
              placeholder="********"
              id="password"
              name="password"
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              style={{ width: '100%' }}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              type="password"
              placeholder="********"
              id="confirmPassword"
              name="confirmPassword"
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
