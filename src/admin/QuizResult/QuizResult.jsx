import React, { useEffect, useState } from 'react'
import './QuizResult.css'
import { useNavigate } from 'react-router-dom';

const QuizResult = () => {
    const [userResults, setUserResults] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        setUserResults(JSON.parse(localStorage.getItem("result")));
    }, [])

    const handleClearResult = () => {
        localStorage.setItem("result", JSON.stringify([]));
        alert("Results are cleared! Referesh your page for latest updates....")
    }
    return (
        <section className='section-box'>
            <h2>Quiz Results</h2>
            <hr />
            {
                userResults.length > 0 ?
                    <div className='result-container'>
                        <table>
                            <thead>
                                <tr>
                                    <td>Type</td>
                                    <td>Obtain Score</td>
                                    <td>Total Score</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userResults.map((user, index) => (
                                        <tr key={index}>
                                            <td>{user.type}</td>
                                            <td>{user.obtainScore}</td>
                                            <td>{user.totalScore}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                    </div>
                    : <p id='no-result'>No Results to show</p>
            }
            <div className='btn-box'>
                {userResults.length > 0 ? <button
                    id='clear-btn'
                    onClick={handleClearResult}>Clear Result</button> : null}
                <button
                    id='back-btn'
                    onClick={() => navigate('/admin')}>Go Back</button>

            </div>
        </section>
    )
}

export default QuizResult