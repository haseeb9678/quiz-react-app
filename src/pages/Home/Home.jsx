import React, { useEffect } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import { useId } from 'react';
import { VscAccount } from "react-icons/vsc";
import { VscTable } from "react-icons/vsc";

const Home = () => {
    const id = useId();
    const navigate = useNavigate();
    return (
        <section className='home-container section-box'>
            <h2 id='q-type-head'>Home</h2>
            <hr />

            <div className="button-box">

                <button
                    className='btn-logo'
                    onClick={() => navigate('/result')}
                    id='result-q-btn'>
                    Quiz Results
                    <VscTable />
                </button>
                <button
                    className='btn-logo'
                    onClick={() => navigate('/user', { state: { id: id } })}
                    id='user-q-btn'>User Page
                    <VscAccount />
                </button>
            </div>
        </section >
    )
}

export default Home