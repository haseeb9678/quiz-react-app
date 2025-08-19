import React, { useEffect, useRef, useState, useId } from 'react'
import { useNavigate } from 'react-router-dom'
import { VscAccount } from "react-icons/vsc";
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
                            <button>Submit</button>
                        </form>
                    </div>
                </fieldset>}
                <div className="button-box">
                    <button
                        ref={localQuizBtn}
                        id='local-q-btn'
                        onClick={() => {
                            if (enableButoons)
                                navigate('/quiz', { state: { status: 'local', username: name, quizLength: quizLength } })
                        }}>Local Quiz</button>
                    <button
                        ref={apiQuizBtn}
                        id='api-q-btn'
                        onClick={() => {
                            if (enableButoons)
                                navigate('/category', { state: { status: 'api', username: name, quizLength: quizLength } })
                        }}>API-Based Quiz</button>
                </div>
            </section>
            <div className='back-user-box'>
                <button
                    onClick={() => navigate('/')}
                    id='back-home-btn'
                >Go to Home Page</button>
            </div>
        </>
    )

}
export default UserPage