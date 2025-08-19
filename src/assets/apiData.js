export async function getQuizData() {
    const categoryID = localStorage.getItem("selectedCategory");
    const URL = categoryID == 0 ?
        "https://opentdb.com/api.php?amount=10&type=multiple" :
        `https://opentdb.com/api.php?amount=10&type=multiple&category=${categoryID}`;
    const res = await fetch(URL);
    const json = await res.json();

    return json.results.map(q => {
        const options = [...q.incorrect_answers, q.correct_answer]
            .sort(() => Math.random() - 0.5);

        return {
            question: q.question,
            option1: options[0],
            option2: options[1],
            option3: options[2],
            option4: options[3],
            answer: options.indexOf(q.correct_answer) + 1
        };
    });

}