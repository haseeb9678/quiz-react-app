import React from 'react'
import './Home.css'

const Home = () => {
    return (
        <section className='home-container'>
            <h2 id='q-type-head'>Choose Quiz Type</h2>
            <hr />
            <div className="button-box">
                <button id='local-q-btn'>Local Quiz</button>
                <button id='api-q-btn'>API-Based Quiz</button>
            </div>
        </section>
    )
}

export default Home