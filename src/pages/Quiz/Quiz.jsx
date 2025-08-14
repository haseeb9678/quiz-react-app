import React, { useRef, useState, useEffect } from 'react';
import './Quiz.css';
import { getQuizData } from '../../assets/apiData';

const Quiz = () => {
    const [data, setData] = useState([]); // API quiz data
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [select, setSelect] = useState(true);
    const [reset, setReset] = useState(false);
    const [status, setStatus] = useState('');
    const [warn, setWarn] = useState(false);

    const option1 = useRef(null);
    const option2 = useRef(null);
    const option3 = useRef(null);
    const option4 = useRef(null);

    const options = [option1, option2, option3, option4];
    const question = data[index];

    useEffect(() => {
        async function fetchData() {
            const info = await getQuizData()
            setData(info);
        }
        fetchData();
    }, [])

    const checkAns = (e, ans) => {
        setWarn(false);
        if (select) {
            if (question.answer === ans) {
                e.target.classList.add("correct");
                setScore(prev => prev + 1);
            } else {
                e.target.classList.add("wrong");
                options.forEach((op, i) => {
                    if (i === question.answer - 1) {
                        op.current.classList.add("correct");
                    }
                });
            }
        }
        setSelect(false);
    };

    const resetClasses = () => {
        options.forEach(op => op.current.classList.remove('correct', 'wrong'));
    };

    const handleNext = () => {
        if (!select) {
            if (index + 1 < data.length) {
                setIndex(prev => prev + 1);
                setSelect(true);
                resetClasses();
            } else {
                setReset(true);
                handleStatus();
                setSelect(true);
                setIndex(0);
            }
        } else {
            setWarn(true);
        }
    };

    const handleStatus = () => {
        const points = (score / data.length) * 100;
        if (points <= 30) setStatus("Poor");
        else if (points <= 50) setStatus("Average");
        else if (points <= 80) setStatus("Good");
        else if (points < 100) setStatus("Excellent");
        else setStatus("Outstanding");
    };

    if (data.length === 0) {
        return <section className="section-box"><h2>Loading quiz...</h2></section>;
    }

    return (
        <section className='quiz-container section-box'>
            <h2 id='main-head'>API-Based Quiz</h2>
            <hr />
            {reset ? (
                <div className='reset-box'>
                    <h2>Your score is: <span>{score}</span>/{data.length}</h2>
                    <p id='performance-p'>{status} Performance</p>
                    <button
                        id='reset-btn'
                        onClick={() => {
                            setReset(false);
                            setScore(0);
                        }}
                    >
                        Reset
                    </button>
                </div>
            ) : (
                <div className='question-box'>
                    <h2>
                        <span id='q-num'>{index + 1} </span>
                        <span dangerouslySetInnerHTML={{ __html: question.question }} />
                    </h2>
                    <ul>

                        <li ref={option1} onClick={(event) => checkAns(event, 1)} dangerouslySetInnerHTML={{ __html: question.option1 }} />
                        <li ref={option2} onClick={(event) => checkAns(event, 2)} dangerouslySetInnerHTML={{ __html: question.option2 }} />
                        <li ref={option3} onClick={(event) => checkAns(event, 3)} dangerouslySetInnerHTML={{ __html: question.option3 }} />
                        <li ref={option4} onClick={(event) => checkAns(event, 4)} dangerouslySetInnerHTML={{ __html: question.option4 }} />
                    </ul>
                    <div className='score-next-container'>
                        <button onClick={handleNext} id='next-btn'>Next</button>
                        {warn ? <p style={{ color: "red" }}>Please choose one option</p> : null}
                        <p id='score-p'>Score: {score}/{data.length}</p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Quiz;
