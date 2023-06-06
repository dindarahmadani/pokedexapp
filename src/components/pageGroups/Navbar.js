import "./NavbarStyle.css"
import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { FaBars, FaTimes } from "react-icons/fa"
import { isLoggedIn } from "../../service/auth"
import { useNavigate } from "react-router-dom"

function Navbar() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();

    function handleOnClick() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('idUserLogged');
        window.location.href = "/"
    }

    function handleCancel() {
        setModal(false);
    }

    return (
        <div className="header">
            <img src='/img/logo.png' alt="" class="h-10 ml-5" />
            <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {isLoggedIn() && (
                    <>
                        <li>
                            <Link to="/Pokemons">Pokemons</Link>
                        </li>
                        <li>
                            <Link to="/Mypokemons">My Pokemons</Link>
                        </li>
                    </>
                )}

                <li>
                    <Link to="/Todos">Todo list</Link>
                </li>
                <li>
                    <Link to="/IndexUser">Users</Link>
                </li>
                <li>
                    {isLoggedIn() ? (
                        <button className="btn btn-sm btn-outline text-white" style={{ textTransform: 'none'}} onClick={() => setModal(true)}>Log Out</button>
                    ) : (
                        <button className="btn btn-sm btn-outline text-white" style={{ textTransform: 'none' }} onClick={() => navigate('/SignIn')}>Log In</button>
                    )}
                    <input type="checkbox" id="my-modal" className="modal-toggle" checked={modal} onChange={() => setModal(!modal)} />
                    <div className="modal">
                        <div className="modal-box bg-slate-800">
                            <h3 className="font-bold text-base text-white">Are you sure to exit?</h3>
                            <div className="modal-action">
                                <button className="inline-block py-2.5 bg-[#8687bb] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#d4a695] hover:shadow-lg focus:bg-[#8687bb] focus:shadow-lg focus:outline-none focus:ring-0 active:[#d4a695] active:shadow-lg transition duration-150 ease-in-out"
                                    onClick={handleCancel}>Cancel</button>
                                <button className="inline-block py-2.5 bg-[#8687bb] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#d4a695] hover:shadow-lg focus:bg-[#8687bb] focus:shadow-lg focus:outline-none focus:ring-0 active:[#d4a695] active:shadow-lg transition duration-150 ease-in-out"
                                    onClick={handleOnClick}>Yay!</button>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div className="hamburger" onClick={handleClick}>
                {click ? (<FaTimes size={20} style={{ color: "#fff" }} />) : (<FaBars size={20} style={{ color: "#fff" }} />)}
            </div>
        </div>
    )
}

export default Navbar