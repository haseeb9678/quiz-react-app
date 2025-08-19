import React, { useEffect, useRef, useState, useId } from 'react'
import { useNavigate } from 'react-router-dom'
import { VscAccount } from "react-icons/vsc";
import { VscHome } from "react-icons/vsc";
import { FaCoins } from "react-icons/fa6";
import { FaFileArrowUp } from "react-icons/fa6";
import { FaEarthAmericas } from "react-icons/fa6";
import './UserPage.css'

const UserPage = () => {
    const [enableButoons, setEnableButtons] = useState(false);
    const [name, setName] = useState('');
    const [quizLength, setQuizLength] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem("selectedCategory", JSON.stringify({ "id": null, 'name': null }))
    }, [])

    const localQuizBtn = useRef(null);
    const apiQuizBtn = useRef(null);

    const handleForm = (formData) => {
        const userName = formData.get("name");
        const length = formData.get("length");

        setName(userName);
        setQuizLength(length);

        localQuizBtn.current.classList.remove("disable");
        apiQuizBtn.current.classList.remove("disable");

        setEnableButtons(true);
    }

    useEffect(() => {
        if (localQuizBtn && apiQuizBtn) {
            localQuizBtn.current.classList.add("disable");
            apiQuizBtn.current.classList.add("disable");
            setEnableButtons(false);
        }
    }, [])


    return (
        <>
            <section className='section-box'>
                <h2>User</h2>
                <hr />
                {!enableButoons
                    ? <p className='notice-p'>Please provide your name and quiz length to continue.</p>
                    : <p className='notice-p'>Hello <strong>{name}</strong> 👋, now choose your quiz type below.</p>
                }
                {!enableButoons && <fieldset>
                    <legend><VscAccount />Info</legend>
                    <div className="user-input-box">
                        <form action={handleForm}>
                            <input
                                type="text"
                                name='name'
                                required
                                minLength={3}
                                maxLength={10}
                                placeholder='Enter your name....' />
                            <input type="number"
                                name='length'
                                min={5}
                                max={10}
                                required
                                placeholder='Enter quiz length (5-10)' />
                            <button
                                className='btn-logo'
                            >Submit
                                <FaFileArrowUp />
                            </button>
                        </form>
                    </div>
                </fieldset>}
                <div className="button-box">
                    <button
                        ref={localQuizBtn}
                        id='local-q-btn'
                        className='btn-logo'
                        onClick={() => {
                            if (enableButoons)
                                navigate('/quiz', { state: { status: 'local', username: name, quizLength: quizLength } })
                        }}>Local Quiz
                        <FaCoins />
                    </button>
                    <button
                        ref={apiQuizBtn}
                        id='api-q-btn'
                        className='btn-logo'
                        onClick={() => {
                            if (enableButoons)
                                navigate('/category', { state: { status: 'api', username: name, quizLength: quizLength } })
                        }}>API-Based Quiz
                        <FaEarthAmericas />
                    </button>
                </div>
            </section>
            <div className='back-user-box'>
                <button
                    onClick={() => navigate('/')}
                    id='back-home-btn'
                    className='btn-logo'
                >Go to Home Page
                    <VscHome />
                </button>
            </div>
        </>
    )

}
export default UserPage