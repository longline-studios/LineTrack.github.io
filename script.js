/* =============================
   DATA: 15 FACTS & 10 QUESTIONS
   ============================= */

const facts = [
    "The first public railway opened in 1825 between Stockton and Darlington in the UK.",
    "The TGV set a world speed record of 574.8 km/h (357 mph) in 2007.",
    "Japanese Shinkansen (Bullet Trains) have an average annual delay of less than 1 minute.",
    "London has the oldest underground system in the world, opened in 1863.",
    "The Eurostar connects London with Paris, traveling under the English Channel.",
    "The Trans-Siberian Railway is the longest in the world, stretching 9,289 km across Russia.",
    "The 'Mallard' steam locomotive set a record of 126 mph (202 km/h) in 1938, which still stands.",
    "Switzerland's Gotthard Base Tunnel is the world's longest rail tunnel at 57 km.",
    "The Shanghai Maglev is the fastest commercial electric train, hitting 431 km/h using magnets.",
    "The Qinghai-Tibet Railway is the highest railway in the world, reaching 5,072 meters altitude.",
    "Australia has the longest straight section of railway in the world (478 km) on the Nullarbor Plain.",
    "The first steam locomotive was built by Richard Trevithick in 1804.",
    "Grand Central Terminal in New York City has the most platforms of any station (44 platforms).",
    "Indian Railways is one of the world's largest employers, with over 1.3 million employees.",
    "The Seikan Tunnel in Japan has a 23.3 km section that is under the seabed."
];

// Questions derived from the facts above
const quizData = [
    { q: "Which country opened the first public railway in 1825?", a: "uk" },
    { q: "What is the name of the famous high-speed train in Japan?", a: "shinkansen" },
    { q: "Which city has the oldest underground railway system?", a: "london" },
    { q: "What is the longest railway line in the world?", a: "trans-siberian" },
    { q: "The 'Mallard' holds the speed record for what type of train?", a: "steam" },
    { q: "In which country is the world's longest rail tunnel (Gotthard Base)?", a: "switzerland" },
    { q: "What technology does the Shanghai train use to float above tracks?", a: "maglev" },
    { q: "Which New York station has the most platforms in the world?", a: "grand central" },
    { q: "Who built the first steam locomotive in 1804?", a: "richard trevithick" },
    { q: "What is the highest railway line in the world?", a: "qinghai-tibet" }
];

/* =============================
   STATE MANAGEMENT
   ============================= */

let factIndex = 0; // Tracks which fact we are on
let quizIndex = 0;
let quizScore = 0;

// DOM Elements
const titleEl = document.getElementById("main-title");
const subEl = document.getElementById("sub-title");
const dynamicArea = document.getElementById("dynamic-area");
const cardIcon = document.querySelector(".card-icon i");

// Initial Load
renderHome();

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
    cardIcon.className = "fa-solid fa-train";
    titleEl.innerText = "Welcome Aboard";
    subEl.innerText = "Discover amazing engineering feats or test your knowledge.";
    
    // TWO BUTTONS ADDED HERE
    dynamicArea.innerHTML = `
        <div class="btn-group">
            <button class="action-btn" onclick="initFacts()">
                <i class="fa-solid fa-book-open"></i> Discover Facts
            </button>
            <button class="action-btn secondary" onclick="initQuiz()">
                <i class="fa-solid fa-brain"></i> Try the Quiz
            </button>
        </div>
    `;
}

/* =============================
   FACTS LOGIC
   ============================= */

function initFacts() {
    setActiveMenu('btn-fact');
    cardIcon.className = "fa-solid fa-lightbulb";
    titleEl.innerText = "Did You Know?";
    subEl.innerText = "Learn something new about railways.";
    
    factIndex = 0; // Reset to first fact
    showFact();
}

function showFact() {
    // Check if we reached the end
    if (factIndex >= facts.length) {
        factIndex = 0; // Loop back to start (optional)
    }

    const currentFact = facts[factIndex];
    const counterText = `Fact ${factIndex + 1} / ${facts.length}`;

    dynamicArea.innerHTML = `
        <span class="fact-counter">${counterText}</span>
        <div style="font-size: 1.3rem; margin-bottom: 30px; min-height: 80px; display:flex; align-items:center; justify-content:center;">
            "${currentFact}"
        </div>
        <div class="btn-group">
            <button class="action-btn secondary" onclick="prevFact()" ${factIndex === 0 ? 'disabled' : ''}>Previous</button>
            <button class="action-btn" onclick="nextFact()">Next Fact</button>
        </div>
    `;
}

function nextFact() {
    factIndex++;
    // If at end, loop back to 0
    if (factIndex >= facts.length) factIndex = 0;
    showFact();
}

function prevFact() {
    if (factIndex > 0) {
        factIndex--;
        showFact();
    }
}

/* =============================
   QUIZ LOGIC
   ============================= */

function initQuiz() {
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

    // Allow pressing "Enter"
    const inputField = document.getElementById("userAnswer");
    inputField.focus();
    inputField.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });
}

function checkAnswer() {
    const input = document.getElementById("userAnswer");
    const userVal = input.value.trim().toLowerCase();
    const correctVal = quizData[quizIndex].a;
    
    let feedbackHTML = "";
    let isCorrect = false;

    // We allow small flexibility (e.g. if answer is "uk" and they type "the uk")
    if (userVal === correctVal || userVal.includes(correctVal)) {
        quizScore++;
        isCorrect = true;
        feedbackHTML = `<div class="feedback-msg correct"><i class="fa-solid fa-check"></i> Correct!</div>`;
    } else {
        feedbackHTML = `<div class="feedback-msg wrong"><i class="fa-solid fa-xmark"></i> Incorrect. The answer was "${correctVal.toUpperCase()}".</div>`;
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
    titleEl.innerText = "Quiz Complete!";
    subEl.innerText = `You scored ${quizScore} out of ${quizData.length}`;
    
    let msg = "";
    if (quizScore === quizData.length) msg = "Perfect! You're a Rail Master! 🚆";
    else if (quizScore > quizData.length / 2) msg = "Great job! You know your trains.";
    else msg = "Good effort! Read the Facts section and try again.";
    
    dynamicArea.innerHTML = `
        <div style="margin-bottom: 25px; font-weight:500; font-size: 1.2rem;">${msg}</div>
        <div class="btn-group">
            <button class="action-btn" onclick="initQuiz()">Restart Quiz</button>
            <button class="action-btn secondary" onclick="initFacts()">Study Facts</button>
        </div>
    `;
}
