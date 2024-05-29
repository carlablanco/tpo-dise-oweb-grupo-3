const questions = [
    {
        question: "El comercio ilegal de animales exóticos contribuye a la extinción de muchas especies.",
        answer: true,
        explanation: "El comercio ilegal de animales es una de las mayores amenazas para muchas especies, ya que reduce sus poblaciones y destruye sus hábitats naturales."
    },
    {
        question: "Reciclar y reducir el consumo de plásticos no tiene ningún efecto en la conservación de la vida marina.",
        answer: false,
        explanation: "Reciclar y reducir el consumo de plásticos ayuda a disminuir la contaminación en los océanos, protegiendo la vida marina y sus hábitats."
    },
    {
        question: "La deforestación es una de las principales causas de la extinción de animales en la selva amazónica.",
        answer: true,
        explanation: "La deforestación destruye los hábitats naturales de muchos animales en la selva amazónica, llevándolos al borde de la extinción."
    },
    {
        question: "Las áreas protegidas y los parques nacionales no ayudan a conservar la biodiversidad.",
        answer: false,
        explanation: "Las áreas protegidas y los parques nacionales son esenciales para conservar la biodiversidad, ya que proporcionan refugios seguros para muchas especies."
    },
    {
        question: "Donar a organizaciones de conservación puede ayudar a proteger especies en peligro de extinción.",
        answer: true,
        explanation: "Donar a organizaciones de conservación permite financiar proyectos y acciones directas para proteger especies en peligro de extinción y sus hábitats."
    }
];

let currentQuestionIndex = 0;
let score = 0;

document.addEventListener("DOMContentLoaded", () => {
    showQuestion();

    document.getElementById("true-btn").addEventListener("click", () => checkAnswer(true));
    document.getElementById("false-btn").addEventListener("click", () => checkAnswer(false));
    document.getElementById("next-btn").addEventListener("click", nextQuestion);
    document.getElementById("restart-btn").addEventListener("click", restartGame);
});

function showQuestion() {
    const questionContainer = document.getElementById("question");
    questionContainer.textContent = questions[currentQuestionIndex].question;
    document.getElementById("result").textContent = "";
    document.getElementById("explanation").textContent = "";
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("buttons-container").style.display = "block";
}

function checkAnswer(answer) {
    const resultContainer = document.getElementById("result");
    const explanationContainer = document.getElementById("explanation");
    if (answer === questions[currentQuestionIndex].answer) {
        resultContainer.textContent = "¡Correcto!";
        resultContainer.style.color = "#28a745";
        score++;
    } else {
        resultContainer.textContent = "Incorrecto.";
        resultContainer.style.color = "#dc3545";
    }
    explanationContainer.textContent = questions[currentQuestionIndex].explanation;
    document.getElementById("next-btn").style.display = "block";
    document.getElementById("buttons-container").style.display = "none";
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    const scoreContainer = document.getElementById("score-container");
    const finalScoreContainer = document.getElementById("final-score");
    const finalMessageContainer = document.getElementById("final-message");

    finalScoreContainer.textContent = `Puntaje final: ${score} de ${questions.length}`;
    if (score === questions.length) {
        finalMessageContainer.textContent = "¡Excelente! Conocés muy bien cómo proteger a los animales.";
    } else if (score >= questions.length / 2) {
        finalMessageContainer.textContent = "¡Bien! Pero hay más que podés aprender sobre la protección de los animales.";
    } else {
        finalMessageContainer.textContent = "¡Seguí aprendiendo! Cada acción cuenta para proteger a los animales.";
    }

    document.getElementById("question-container").style.display = "none";
    document.getElementById("result-container").style.display = "none";
    document.getElementById("score-container").style.display = "block";
}

function restartGame() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("question-container").style.display = "block";
    document.getElementById("result-container").style.display = "block";
    document.getElementById("score-container").style.display = "none";
    showQuestion();
}
