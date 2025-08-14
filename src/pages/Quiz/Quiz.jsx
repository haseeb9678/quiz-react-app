import React, { useRef, useState, useEffect } from 'react';
import './Quiz.css';
import { getQuizData } from '../../assets/apiData';
import simpleData from '../../assets/data'
import { useLocation, useNavigate } from 'react-router-dom';
import { BiAlarm } from "react-icons/bi";
import { localResult } from '../../assets/quizResults';

const Quiz = () => {
    const [data, setData] = useState([]); // API quiz data
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [select, setSelect] = useState(true);
    const [reset, setReset] = useState(false);
    const [status, setStatus] = useState('');
    const [warn, setWarn] = useState('');
    const [quizStart, setQuizStart] = useState(false);
    const [timesUp, setTimesUp] = useState(false);
    const startQuizBtn = useRef(null);
    const homeBtn = useRef(null);
    const [time, setTime] = useState(60);

    useEffect(() => {
        if (!quizStart) return; // don't run timer if quiz hasn't started
        if (time > 0 && reset) return; // user finsish quiz before time...

        if (time <= 0) {
            setReset(true); // show score and reset
            setQuizStart(false);
            setTimesUp(true);
            handleStatus();
            setTime(0);
            return;
        }

        const timerId = setInterval(() => {
            setTime(prev => prev - 1);
        }, 1000);

        // Cleanup when component unmounts or dependencies change
        return () => clearInterval(timerId);

    }, [quizStart, time]);


    const navigate = useNavigate();

    const location = useLocation();

    const option1 = useRef(null);
    const option2 = useRef(null);
    const option3 = useRef(null);
    const option4 = useRef(null);

    const options = [option1, option2, option3, option4];
    const question = data[index];

    useEffect(() => {
        async function fetchData() {
            let info;
            if (location.state.status == 'api') {
                info = await getQuizData()
            } else {
                info = simpleData;
            }

            setData(info);
        }
        fetchData();
    }, [])

    const checkAns = (e, ans) => {
        setWarn('');
        if (!quizStart) {
            setWarn('Please start the quiz!')
            return null;
        }
        if (select && quizStart) {
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
                setTime(prev => prev + 1);
                setSelect(true);
                setIndex(0);
                const newRecord = {
                    type: location.state.status == 'api' ? 'API-Based Quiz' : "Local Quiz",
                    totalScore: data.length,
                    obtainScore: score
                }
                console.log('old: ', localResult);
                const updatedRecord = [...localResult, newRecord]
                localStorage.setItem("result", JSON.stringify(updatedRecord));

                console.log('new: ', updatedRecord);

            }
        } else {
            if (quizStart)
                setWarn('Please select any option...');
            else {
                setWarn('Please start the quiz!');
            }
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

    const handleStart = () => {
        if (!quizStart) {
            setQuizStart(true);
            setTime(60);
            setWarn('');
            startQuizBtn.current.classList.add("disable-btn");
            homeBtn.current.classList.add("disable-btn");
        }
    }

    const handleHome = () => {
        const classList = homeBtn.current.classList
        if (!classList.contains('disable-btn')) {
            navigate('/');
        }

    }

    if (data.length === 0) {
        return <section className="section-box"><h2>Loading quiz...</h2></section>;
    }

    return (
        <>
            <section className='quiz-container section-box'>
                <div className="timing-box">
                    <h2 id='main-head'>
                        {location.state.status == 'api' ? 'API-Based Quiz' : "Local Quiz"}
                    </h2>
                    {
                        timesUp ? null : <div className='timer'>
                            <span><BiAlarm /></span>
                            <p>{time}s</p>
                        </div>
                    }
                </div>
                <hr />
                {reset ? (
                    <div className='reset-box'>
                        {timesUp ? <div className='timer'>
                            <span style={{ color: 'red' }}><BiAlarm /></span>
                            <p>Times'UPP</p>
                        </div> : null}
                        <h2>Your score is: <span>{score}</span>/{data.length}</h2>
                        <p id='performance-p'>{status} Performance</p>
                        <button
                            id='reset-btn'
                            onClick={() => {
                                setReset(false);
                                setScore(0);
                                setQuizStart(false);
                                setTimesUp(false);
                                startQuizBtn.current.classList.remove("disable-btn");
                                homeBtn.current.classList.remove("disable-btn");
                            }}
                        >
                            Reset
                        </button>
                    </div>
                ) : (
                    <div className='question-box'>
                        <h2 id='q-h2'>
                            <span id='q-num'>{index + 1}</span>
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
                            {warn ? <p id='warn-p' style={{ color: "red" }}>{warn}</p> : null}
                            <p id='score-p'>Score: {score}/{data.length}</p>
                        </div>
                    </div>
                )}
            </section>
            <div className='back-home-box'>
                <button
                    ref={homeBtn}
                    onClick={handleHome}
                    id='home-btn'
                >Go to Home Page</button>
                <button
                    ref={startQuizBtn}
                    onClick={handleStart}
                    id='start-quiz-btn'
                >Start Quiz</button>
            </div>

        </>
    );
};

export default Quiz;
