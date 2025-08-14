import React from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
    return (
        <section className='home-container section-box'>
            <h2 id='q-type-head'>Choose Quiz Type</h2>
            <hr />
            <div className="button-box">
                <button id='local-q-btn'>Local Quiz</button>
                <button id='api-q-btn'>API-Based Quiz</button>
                <button
                    onClick={() => navigate('/admin')}
                    id='admin-q-btn'>Admin Page</button>
            </div>
        </section>
    )
}

export default Home