import React from 'react'
import './ErrorPage.css'
import { VscHome } from "react-icons/vsc";
import { FaRegFaceFrown } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <section className='section-box error-section'>
            <h2>ERROR</h2>
            <hr />
            <div className="content-box">
                <p className='btn-logo'> <FaRegFaceFrown /> Error 404 | Page not found</p>
                <button
                    className='btn-logo'
                    onClick={() => navigate('/')}
                >Go to Home Page
                    <VscHome />
                </button>
            </div>
        </section>
    )
}

export default ErrorPage