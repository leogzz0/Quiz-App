// variables form html that we are gonna need
const question = document.querySelector('#question');
const choices = document.querySelectorAll('.choice-text');
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const startingMinutes = 10;
const countdownEl = document.getElementById('timeOn')

let currentQuestion = {}
let acceptinAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []
let time = startingMinutes*60;

// constructor of the game questions, choices and answer
let questions = [
    {
        question: 'What is 2 + 2',
        choice1: '2',
        choice2: '3',
        choice3: '4',
        choice4: '0',
        answer: 3,
    },
    {
        question: 'What is 2 + 3',
        choice1: '5',
        choice2: '3',
        choice3: '4',
        choice4: '0',
        answer: 1,
    },
    {
        question: 'What is 2 + 7',
        choice1: '2',
        choice2: '3',
        choice3: '4',
        choice4: '9',
        answer: 4,
    },
    {
        question: 'What is 5 + 2',
        choice1: '2',
        choice2: '3',
        choice3: '7',
        choice4: '0',
        answer: 3,
    },
]

setInterval(updateCountdown, 1000);

function updateCountdown(){
    const minutes = Math.floor(time/60);
    let seconds = time%60;

    seconds = seconds<10 ? '0' +seconds : seconds;

    countdownEl.innerHTML = `${minutes}: ${seconds}`;
    time--;
}

const score_points = 100
const max_questions = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion();
}

getNewQuestion = () => {
    // local storage your result
    if(availableQuestions.length === 0 || questionCounter > max_questions) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }  
    // the game tell you where are you on the progress of the game
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${max_questions}`
    progressBarFull.style.width = `${(questionCounter/max_questions) * 100}%`
    // value of the question index
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(score_points)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()