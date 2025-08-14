import React from 'react'
import './AdminPage.css'
import { useNavigate } from 'react-router-dom'

const AdminPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <section className='admin-section section-box'>
                <h2>Admin Section</h2>
                <hr />
                <p>Welcome Haseeb,</p>
                <div className='admin-data-section'>
                    <button
                        id='create-btn'
                        onClick={() => navigate('/quizCreate')}
                    >Create a Quiz</button>

                    <button
                        id='result-btn'
                        onClick={() => navigate('/result')}
                    >
                        Quiz Results
                    </button>
                </div>
            </section>
            <div className='btn-box'>
                <button id='back-btn' onClick={() => navigate('/')}>Back to Home Page</button>
            </div>
        </>
    )
}

export default AdminPage