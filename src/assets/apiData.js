export async function getQuizData() {
    const res = await fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple");
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