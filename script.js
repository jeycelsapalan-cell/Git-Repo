const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-button");
const questionText = document.getElementById("question-text");
const currentQuestion = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-question");
const scoreSpan = document.getElementById("score");
const answerContainer = document.getElementById("answer-container");
const progress = document.getElementById("progress");
const finalScore = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-button");

const quizQuestion = [
    {
        question: "What is the capital of the Philippines?",
        answers: [
            {text: "London", correct: false},
            {text: "Bangkok", correct: false},
            {text: "Manila", correct: true},
            {text: "Paris", correct: false},
        ],
    },
    {
        question: "What is HTML?",
        answers: [
                {text: "HyperText Markup Language", correct: true},
                {text: "Javascript", correct: false},
                {text: "Python", correct: false},
                {text: "Java", correct: false},
        ],
    },
    {
        question: "What is my Graphics Card?",
        answers: [
                {text: "RX 6600", correct: false},
                {text: "GTX 1080", correct: true},
                {text: "RX 580", correct: false},
                {text: "GTX 1660", correct: false},
        ],
    },
];

let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionSpan.textContent = quizQuestion.length;
maxScoreSpan.textContent = quizQuestion.length;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = score;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}

function showQuestion(){
    answerDisabled = false;
    const currentQuestion = quizQuestion[currentQuestionIndex];

    currentQuestion.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex / quizQuestion.length) * 100;
    progress.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question;

    answerContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-button");

        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);

        answerContainer.appendChild(button);
    })
}

function selectAnswer(event){
    if (answerDisabled) return

    answerDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answerContainer.children).forEach(button => {
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        }else {
            button.classList.add("incorrect");
        }
    });

    if(isCorrect){
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;

        if(currentQuestionIndex < quizQuestion.length){
            showQuestion()
        }
        else{
            showResult()
        }
    }, 1000)
}

function showResult(){
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScore.textContent = score;

    const percentage = (score/quizQuestion.length) * 100;

    if(percentage == 100){
        resultMessage.textContent = "You're a genuis!";
    }else if(percentage == 80){
        resultMessage.textContent = "Good Job you almost got a perfect score.";
    }else if(percentage == 60){
        resultMessage.textContent = "Great Effor!";
    }else if(percentage == 40){
        resultMessage.textContent = "Keep Learning!";
    }else{
        resultMessage.textContent = "Keep studying dumbass."
    }
}

function restartQuiz(){
    resultScreen.classList.remove("active");

    startQuiz();
}