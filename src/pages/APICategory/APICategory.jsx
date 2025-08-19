import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './APICategory.css'

const APICategory = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    console.log(location);


    useEffect(() => {
        fetch("https://opentdb.com/api_category.php")
            .then((res) => res.json())
            .then((data) => setCategories(data.trivia_categories));
    }, []);

    useEffect(() => {
        localStorage.setItem("selectedCategory", selectedCategory);
    }, [selectedCategory])


    return (
        <>
            <section className='section-box'>
                <h2>Quiz Category</h2>
                <hr />
                <div className="category-container">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="" disabled>-- Select Category --</option>
                        <option value="any">Any</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    <button onClick={() => navigate('/quiz', { state: { status: location.state.status, username: location.state.username, quizLength: location.state.quizLength } })}>Go to Quiz Page</button>
                </div>
            </section>
        </>
    )
}

export default APICategory