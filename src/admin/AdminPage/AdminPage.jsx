import React from 'react'
import './AdminPage.css'
import { useNavigate } from 'react-router-dom'

const AdminPage = () => {
    const navigate = useNavigate();
    return (
        <section className='admin-section section-box'>
            <h2>Admin Section</h2>
            <hr />
            <div className='admin-data-section'>
                <button className='box'
                    onClick={() => navigate('/quizCreate')}
                >Create a Quiz</button>

                <button className='box'>
                    Quiz Results
                </button>
            </div>
        </section>
    )
}

export default AdminPage