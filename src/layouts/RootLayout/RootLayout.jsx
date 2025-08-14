import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/NavBar/Navbar.jsx'

const RootLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default RootLayout
