const data = [
    {
        question: 'What is the capital of Pakistan?',
        option1: 'Lahore',
        option2: 'Karachi',
        option3: 'Islamabad',
        option4: 'Peshawar',
        answer: 3
    },
    {
        question: 'What is the currency of the USA?',
        option1: 'Dollar',
        option2: 'Euro',
        option3: 'Pound',
        option4: 'Yen',
        answer: 1
    },
    {
        question: 'Which planet is known as the Red Planet?',
        option1: 'Earth',
        option2: 'Mars',
        option3: 'Jupiter',
        option4: 'Venus',
        answer: 2
    },
    {
        question: 'What is the largest ocean on Earth?',
        option1: 'Atlantic Ocean',
        option2: 'Indian Ocean',
        option3: 'Arctic Ocean',
        option4: 'Pacific Ocean',
        answer: 4
    },
    {
        question: 'Who wrote the play "Romeo and Juliet"?',
        option1: 'William Wordsworth',
        option2: 'William Shakespeare',
        option3: 'Charles Dickens',
        option4: 'Jane Austen',
        answer: 2
    },
    {
        question: 'Which gas do plants absorb from the atmosphere?',
        option1: 'Oxygen',
        option2: 'Nitrogen',
        option3: 'Carbon Dioxide',
        option4: 'Hydrogen',
        answer: 3
    },
    {
        question: 'What is the capital of Japan?',
        option1: 'Kyoto',
        option2: 'Tokyo',
        option3: 'Osaka',
        option4: 'Nagoya',
        answer: 2
    },
    {
        question: 'How many continents are there in the world?',
        option1: '5',
        option2: '6',
        option3: '7',
        option4: '8',
        answer: 3
    },
    {
        question: 'Which is the largest mammal in the world?',
        option1: 'Elephant',
        option2: 'Blue Whale',
        option3: 'Giraffe',
        option4: 'Shark',
        answer: 2
    },
    {
        question: 'What is the boiling point of water at sea level?',
        option1: '90°C',
        option2: '100°C',
        option3: '110°C',
        option4: '120°C',
        answer: 2
    },
    {
        question: 'What is the national language of Pakistan?',
        option1: 'Urdu',
        option2: 'Punjabi',
        option3: 'Sindhi',
        option4: 'Pashto',
        answer: 1
    },
    {
        question: 'Which is the smallest planet in our solar system?',
        option1: 'Mercury',
        option2: 'Mars',
        option3: 'Venus',
        option4: 'Pluto',
        answer: 1
    },
    {
        question: 'What is the capital of France?',
        option1: 'London',
        option2: 'Berlin',
        option3: 'Paris',
        option4: 'Rome',
        answer: 3
    },
    {
        question: 'Which animal is known as the King of the Jungle?',
        option1: 'Tiger',
        option2: 'Lion',
        option3: 'Elephant',
        option4: 'Leopard',
        answer: 2
    },
    {
        question: 'How many players are there in a cricket team?',
        option1: '9',
        option2: '10',
        option3: '11',
        option4: '12',
        answer: 3
    },
    {
        question: 'Which organ in the human body purifies blood?',
        option1: 'Heart',
        option2: 'Liver',
        option3: 'Kidneys',
        option4: 'Lungs',
        answer: 3
    },
    {
        question: 'In which continent is the Sahara Desert located?',
        option1: 'Asia',
        option2: 'Africa',
        option3: 'Australia',
        option4: 'South America',
        answer: 2
    },
    {
        question: 'Who invented the electric bulb?',
        option1: 'Alexander Graham Bell',
        option2: 'Nikola Tesla',
        option3: 'Thomas Edison',
        option4: 'Albert Einstein',
        answer: 3
    },
    {
        question: 'What is the largest planet in our solar system?',
        option1: 'Earth',
        option2: 'Jupiter',
        option3: 'Saturn',
        option4: 'Neptune',
        answer: 2
    },
    {
        question: 'Which day is celebrated as Pakistan’s Independence Day?',
        option1: '23rd March',
        option2: '14th August',
        option3: '25th December',
        option4: '1st May',
        answer: 2
    }
];

// Fisher–Yates Shuffle
function shuffleData(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

const newData = shuffleData(data);

export default newData;


