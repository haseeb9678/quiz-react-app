import React, { useEffect, useState } from 'react'
import './QuizResult.css'
import { useNavigate } from 'react-router-dom';

const QuizResult = () => {
    const [userResults, setUserResults] = useState([])
    const [totalApiQuiz, setTotalApiQuiz] = useState(0);
    const [totalLocalQuiz, setTotalLocalQuiz] = useState(0)
    const navigate = useNavigate();

    useEffect(() => {
        setUserResults(JSON.parse(localStorage.getItem("result")));
    }, [])

    useEffect(() => {
        if (userResults.length > 0) {
            const apiQuiz = userResults.filter((q) => q.type == 'API-Based Quiz');
            setTotalApiQuiz(apiQuiz.length);
            setTotalLocalQuiz(userResults.length - apiQuiz.length);
        }
    }, [userResults])

    const handleClearResult = () => {
        localStorage.setItem("result", JSON.stringify([]));
        setUserResults([]);
        alert("Results are cleared....")
    }
    return (
        <section className='section-box' id='quiz-result'>
            <h2>Quiz Results</h2>
            <hr />
            {
                userResults.length > 0 ?
                    <div className='result-container'>
                        <table>
                            <thead>
                                <tr>
                                    <td>User</td>
                                    <td>Type</td>
                                    <td>Obtain Score</td>
                                    <td>Total Score</td>
                                    <td>Performance</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userResults.map((user, index) => (
                                        <tr key={index}>
                                            <td>{user.user}</td>
                                            <td>{user.type}</td>
                                            <td>{user.obtainScore}</td>
                                            <td>{user.totalScore}</td>
                                            <td>{user.performance}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className='total-quiz-container'>
                            <p><strong>Total Api Quiz:</strong> {totalApiQuiz}</p>
                            <p><strong>Total Local Quiz:</strong>{totalLocalQuiz}</p>
                        </div>
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