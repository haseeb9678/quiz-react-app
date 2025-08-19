import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { VscArrowRight } from "react-icons/vsc";
import './APICategory.css'

const APICategory = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedCategoryName, setSelectedCategoryName] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetch("https://opentdb.com/api_category.php")
            .then((res) => res.json())
            .then((data) => setCategories(data.trivia_categories));
        setSelectedCategory(0);
        setSelectedCategoryName("Any");
    }, []);

    useEffect(() => {
        localStorage.setItem("selectedCategory", selectedCategory);
        localStorage.setItem("selectedCategoryName", selectedCategoryName);
    }, [selectedCategory, selectedCategoryName])


    return (
        <>
            <section className='section-box'>
                <h2>Quiz Category</h2>
                <hr />
                <div className="category-container">
                    <select
                        value={selectedCategory}
                        onChange={(e) => {
                            const selectedId = e.target.value;
                            const selectedName = selectedId == 0 ? "Any" :
                                categories.find((cat) => cat.id == selectedId)?.name || "";
                            setSelectedCategory(selectedId);
                            setSelectedCategoryName(selectedName);
                        }}>
                        <option value={0}>Any</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    <button
                        className='btn-logo'
                        onClick={() => navigate('/quiz',
                            {
                                state: {
                                    status: location.state.status,
                                    username: location.state.username, quizLength: location.state.quizLength
                                }
                            })}>Go to Quiz Page
                        <VscArrowRight />
                    </button>
                </div>
            </section>
        </>
    )
}

export default APICategory