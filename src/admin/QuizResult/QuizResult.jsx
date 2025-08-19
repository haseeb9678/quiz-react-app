import React, { useEffect, useRef, useState } from 'react';
import './QuizResult.css';
import { useNavigate } from 'react-router-dom';

const QuizResult = () => {
    const [userResults, setUserResults] = useState([]);
    const [filterResults, setFilterResults] = useState([]);
    const [totalApiQuiz, setTotalApiQuiz] = useState(0);
    const [totalLocalQuiz, setTotalLocalQuiz] = useState(0);
    const navigate = useNavigate();
    const filter2 = useRef(null);

    const handleMarksSelect = (e) => {
        const filter = e.currentTarget.value;
        let filteredData = [...filterResults];

        if (filter === 'default') {
            return;
        } else if (filter === 'ascending') {
            filteredData.sort((a, b) => a.obtainScore - b.obtainScore);
        } else if (filter === 'descending') {
            filteredData.sort((a, b) => b.obtainScore - a.obtainScore);
        }
        setFilterResults(filteredData);
    };

    const handleTypeSelect = (e) => {
        const filter = e.currentTarget.value;

        if (filter === 'both') {
            setFilterResults(userResults);
        } else if (filter === 'local') {
            const filteredData = userResults.filter((q) => q.type === 'Local Quiz');
            setFilterResults(filteredData);
        } else if (filter === 'api') {
            const filteredData = userResults.filter((q) => q.type === 'API-Based Quiz');
            setFilterResults(filteredData);
        }

        filter2.current.value = '';
    };

    useEffect(() => {
        const storedResults = JSON.parse(localStorage.getItem('result')) || [];
        const seenResults = JSON.parse(localStorage.getItem('seenResults')) || [];

        const resultsWithId = storedResults.map(item => ({
            ...item,
            id: item.id || Date.now() + Math.random() // unique id
        }));

        const markedResults = resultsWithId.map(item => ({
            ...item,
            status: seenResults.includes(item.id) ? 'old' : 'new'
        }));

        setUserResults(markedResults);
        setFilterResults(markedResults);

        localStorage.setItem('result', JSON.stringify(resultsWithId));

        const allIds = resultsWithId.map(item => item.id);
        const updatedSeen = [...new Set([...seenResults, ...allIds])];
        localStorage.setItem('seenResults', JSON.stringify(updatedSeen));
    }, []);

    useEffect(() => {
        if (userResults.length > 0) {
            const apiQuiz = userResults.filter((q) => q.type === 'API-Based Quiz');
            setTotalApiQuiz(apiQuiz.length);
            setTotalLocalQuiz(userResults.length - apiQuiz.length);
        }
    }, [userResults]);

    const handleClearResult = () => {
        localStorage.setItem('result', JSON.stringify([]));
        localStorage.setItem('seenResults', JSON.stringify([]));
        setUserResults([]);
        setFilterResults([]);
    };

    return (
        <section className='section-box' id='quiz-result'>
            <h2>Quiz Results</h2>
            <hr />
            {userResults.length > 0 && (
                <div className="filter-box">
                    <h3>Filter Results</h3>
                    <div className="select-container">
                        <select name="filter" defaultValue={''} onChange={handleTypeSelect}>
                            <option value="" disabled>Choose option</option>
                            <option value="both">Both API and Local</option>
                            <option value="api">API</option>
                            <option value="local">Local</option>
                        </select>
                        <select
                            ref={filter2}
                            name="filter-marks" defaultValue={''} onChange={handleMarksSelect}>
                            <option value="" disabled>Choose option</option>
                            <option value="default">Default</option>
                            <option value="descending">Descending Order</option>
                            <option value="ascending">Marks Ascending Order</option>
                        </select>
                    </div>
                </div>
            )}
            {filterResults.length > 0 ? (
                <div className='result-container'>
                    <table>
                        <thead>
                            <tr>
                                <td>User</td>
                                <td>Type</td>
                                <td>Obtain Score</td>
                                <td>Total Score</td>
                                <td>Performance</td>
                                <td>Category</td>
                            </tr>
                        </thead>
                        <tbody>
                            {filterResults.map((user, index) => (
                                <tr key={index}>
                                    <td>
                                        {user.user} {user.status === 'new' && <span className='new'>NEW</span>}
                                    </td>
                                    <td>{user.type}</td>
                                    <td>{user.obtainScore}</td>
                                    <td>{user.totalScore}</td>
                                    <td>{user.performance}</td>
                                    <td>{user.categoryName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p id='no-result'>No Results to show</p>
            )}


            {userResults.length > 0 ? <div className='total-quiz-container'>
                <p><strong>Total Api Quiz:</strong> {totalApiQuiz}</p>
                <p><strong>Total Local Quiz:</strong> {totalLocalQuiz}</p>
            </div> : null}


            <div className='btn-box'>
                {userResults.length > 0 && (
                    <button id='clear-btn' onClick={handleClearResult}>
                        Clear All Result
                    </button>
                )}
                <button id='back-btn' onClick={() => navigate('/')}>
                    Go Back
                </button>
            </div>
        </section>
    );
};

export default QuizResult;
