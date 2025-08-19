import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import { VscCode } from "react-icons/vsc";

const Navbar = () => {
    return (
        <header>
            <h2>Quiz App
                <VscCode />
            </h2>
        </header>
    )
}

export default Navbar