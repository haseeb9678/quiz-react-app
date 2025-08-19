import React, { useEffect } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import { useId } from 'react';

const Home = () => {
    const id = useId();
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.setItem("userId", null);
    }, [])
    return (
        <section className='home-container section-box'>
            <h2 id='q-type-head'>Home</h2>
            <hr />

            <div className="button-box">

                <button
                    onClick={() => navigate('/result')}
                    id='result-q-btn'>Quiz Results</button>
                <button
                    onClick={() => navigate('/user', { state: { id: id } })}
                    id='user-q-btn'>User Page</button>
            </div>
        </section >
    )
}

export default Home