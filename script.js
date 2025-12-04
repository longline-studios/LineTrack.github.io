/* =============================
   DATA: FACTS & QUIZ
   ============================= */

const facts = [
    "The first railway opened in 1825 between Stockton and Darlington.",
    "The TGV set a world speed record of 574.8 km/h in 2007.",
    "Japanese Shinkansen trains have an average delay of less than 1 minute.",
    "London has the oldest underground system in the world (opened 1863).",
    "The Eurostar connects London with Paris in under 2.5 hours.",
    "The Trans-Siberian Railway is the longest in the world (9,289 km).",
    "In India, trains transport roughly 23 million passengers every day.",
    "The Maglev train in Shanghai hits speeds of 431 km/h commercially."
];

const quizData = [
    { q: "Which country invented the Shinkansen?", a: "japan" },
    { q: "What is the world’s fastest wheeled train brand?", a: "tgv" },
    { q: "What year did the London Underground open?", a: "1863" },
    { q: "Which country has the longest high-speed rail network?", a: "china" },
    { q: "Name the famous luxury train connecting Paris and Istanbul.", a: "orient express" }
];

/* =============================
   STATE MANAGEMENT
   ============================= */

let currentFacts = [...facts];
let quizIndex = 0;
let quizScore = 0;
let isQuizActive = false;

// DOM Elements
const titleEl = document.getElementById("main-title");
const subEl = document.getElementById("sub-title");
const dynamicArea = document.getElementById("dynamic-area");
const cardIcon = document.querySelector(".card-icon i");

/* =============================
   NAVIGATION HANDLERS
   ============================= */

document.getElementById('btn-home').addEventListener('click', () => {
    setActiveMenu('btn-home');
    renderHome();
});

document.getElementById('btn-fact').addEventListener('click', () => {
    setActiveMenu('btn-fact');
    initFacts();
});

document.getElementById('btn-quiz').addEventListener('click', () => {
    setActiveMenu('btn-quiz');
    initQuiz();
});

function setActiveMenu(id) {
    document.querySelectorAll('.menu-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

/* =============================
   HOME LOGIC
   ============================= */

function renderHome() {
    isQuizActive = false;
    cardIcon.className = "fa-solid fa-train";
    titleEl.innerText = "Welcome Aboard";
    subEl.innerText = "Select 'Rail Facts' or 'Rail Quiz' from the menu to begin your journey.";
    dynamicArea.innerHTML = `<button class="action-btn" onclick="initFacts()">Get Started</button>`;
}

/* =============================
   FACTS LOGIC
   ============================= */

function initFacts() {
    isQuizActive = false;
    setActiveMenu('btn-fact');
    cardIcon.className = "fa-solid fa-lightbulb";
    titleEl.innerText = "Did You Know?";
    subEl.innerText = "Here is a random railway fact:";
    
    // Reset facts if empty
    if (currentFacts.length === 0) currentFacts = [...facts];
    
    showRandomFact();
}

function showRandomFact() {
    if (currentFacts.length === 0) currentFacts = [...facts];

    const randomIndex = Math.floor(Math.random() * currentFacts.length);
    const fact = currentFacts[randomIndex];
    
    // Remove used fact to avoid immediate repeats
    currentFacts.splice(randomIndex, 1);

    dynamicArea.innerHTML = `
        <div style="font-size: 1.2rem; margin-bottom: 25px; min-height: 80px; display:flex; align-items:center; justify-content:center;">
            "${fact}"
        </div>
        <button class="action-btn" onclick="showRandomFact()">Next Fact</button>
    `;
}

/* =============================
   QUIZ LOGIC
   ============================= */

function initQuiz() {
    isQuizActive = true;
    setActiveMenu('btn-quiz');
    quizIndex = 0;
    quizScore = 0;
    cardIcon.className = "fa-solid fa-circle-question";
    
    renderQuestion();
}

function renderQuestion() {
    if (quizIndex >= quizData.length) {
        showQuizResults();
        return;
    }

    const currentQ = quizData[quizIndex];
    
    titleEl.innerText = `Question ${quizIndex + 1}`;
    subEl.innerText = currentQ.q;

    dynamicArea.innerHTML = `
        <input type="text" id="userAnswer" placeholder="Type answer here..." autocomplete="off">
        <br>
        <button class="action-btn" onclick="checkAnswer()">Submit Answer</button>
    `;

    // Allow pressing "Enter" to submit
    document.getElementById("userAnswer").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });
    
    // Auto-focus input
    document.getElementById("userAnswer").focus();
}

function checkAnswer() {
    const input = document.getElementById("userAnswer");
    const userVal = input.value.trim().toLowerCase();
    const correctVal = quizData[quizIndex].a;
    
    let feedbackHTML = "";
    
    if (userVal === correctVal) {
        quizScore++;
        feedbackHTML = `<div class="feedback-msg correct"><i class="fa-solid fa-check"></i> Correct!</div>`;
    } else {
        feedbackHTML = `<div class="feedback-msg wrong"><i class="fa-solid fa-xmark"></i> Wrong! It was "${correctVal}"</div>`;
    }

    dynamicArea.innerHTML = `
        ${feedbackHTML}
        <button class="action-btn" onclick="nextQuestion()">Next Question</button>
    `;
}

function nextQuestion() {
    quizIndex++;
    renderQuestion();
}

function showQuizResults() {
    isQuizActive = false;
    titleEl.innerText = "Quiz Complete!";
    subEl.innerText = `You scored ${quizScore} out of ${quizData.length}`;
    
    let msg = quizScore === quizData.length ? "Perfect Score! 🚆" : "Good effort! Keep training!";
    
    dynamicArea.innerHTML = `
        <div style="margin-bottom: 20px; font-weight:500;">${msg}</div>
        <button class="action-btn" onclick="initQuiz()">Restart Quiz</button>
    `;
}
