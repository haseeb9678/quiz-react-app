import React, { useEffect, useState } from 'react'
import './QuizResult.css'
import { useNavigate } from 'react-router-dom';

const QuizResult = () => {
    const [userResults, setUserResults] = useState([]);
    const [filterResults, setFilterResults] = useState([]);
    const [totalApiQuiz, setTotalApiQuiz] = useState(0);
    const [totalLocalQuiz, setTotalLocalQuiz] = useState(0)
    const navigate = useNavigate();

    const handleMarksSelect = (e) => {
        const filter = e.currentTarget.value;
        let filteredData = [...filterResults];

        console.log(filter);
        if (filter == 'default') {
            return;
        } else if (filter == 'ascending') {
            filteredData.sort((a, b) => a.obtainScore - b.obtainScore);
            console.log(filteredData);
        } else if (filter == 'descending') {
            filteredData.sort((a, b) => b.obtainScore - a.obtainScore);
            console.log(filteredData);
        }

        setFilterResults(filteredData);

    }

    const handleTypeSelect = (e) => {
        const filter = e.currentTarget.value;
        console.log(filter);

        if (filter == 'both') {
            setFilterResults(userResults);
        } else if (filter == 'local') {
            const filteredData = userResults.filter((q) => {
                if (q.type == 'Local Quiz') return q;
            })
            console.log(filteredData);
            setFilterResults(filteredData);
        } else if (filter == 'api') {
            const filteredData = userResults.filter((q) => {
                if (q.type == 'API-Based Quiz') return q;
            })
            console.log(filteredData);
            setFilterResults(filteredData);
        }
    }

    useEffect(() => {
        setUserResults(JSON.parse(localStorage.getItem("result")));
        setFilterResults(JSON.parse(localStorage.getItem("result")));
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
                filterResults.length > 0 ?
                    <div className='result-container'>
                        <div className="filter-box">
                            <h3>Filter Results</h3>
                            <div className="select-container">
                                <select name="filter" defaultValue={''} onChange={handleTypeSelect}>
                                    <option value="" disabled>Choose option</option>
                                    <option value="both">Both API and Local</option>
                                    <option value="api">API</option>
                                    <option value="local">Local</option>
                                </select>
                                <select name="filter-marks" defaultValue={''} onChange={handleMarksSelect}>
                                    <option value="" disabled>Choose option</option>
                                    <option value="default">Default</option>
                                    <option value="descending">Descending Order</option>
                                    <option value="ascending">Marks Ascending Order</option>
                                </select>
                            </div>
                        </div>
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
                                    filterResults.map((user, index) => (
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
                    onClick={handleClearResult}>Clear All Result</button> : null}
                <button
                    id='back-btn'
                    onClick={() => navigate('/admin')}>Go Back</button>

            </div>
        </section>
    )
}

export default QuizResult