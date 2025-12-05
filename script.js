/* =============================
   1. DATA DATASETS
   ============================= */

/* --- FACTS --- */
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

/* --- QUIZ (Multiple Choice) --- */
const quizData = [
    {
        q: "Which country opened the first public railway in 1825?",
        options: ["United Kingdom", "United States", "Germany", "France"],
        correct: 0 
    },
    {
        q: "What is the name of the famous high-speed train in Japan?",
        options: ["TGV", "Shinkansen", "Maglev", "ICE"],
        correct: 1
    },
    {
        q: "Which city has the oldest underground railway system?",
        options: ["New York", "Paris", "London", "Moscow"],
        correct: 2
    },
    {
        q: "What is the longest railway line in the world?",
        options: ["Orient Express", "Trans-Siberian", "Amtrak Coast", "Indian Pacific"],
        correct: 1
    },
    {
        q: "The 'Mallard' holds the speed record for what type of train?",
        options: ["Electric", "Diesel", "Steam", "Magnetic"],
        correct: 2
    },
    {
        q: "In which country is the world's longest rail tunnel (Gotthard Base)?",
        options: ["Japan", "China", "Switzerland", "Norway"],
        correct: 2
    },
    {
        q: "What technology does the Shanghai train use to float above tracks?",
        options: ["Air Cushion", "Maglev (Magnetic Levitation)", "Hydraulics", "Anti-Gravity"],
        correct: 1
    },
    {
        q: "Which station has the most platforms in the world?",
        options: ["Shinjuku Station", "Grand Central Terminal", "Gare du Nord", "Waterloo"],
        correct: 1
    },
    {
        q: "Who built the first steam locomotive in 1804?",
        options: ["James Watt", "George Stephenson", "Richard Trevithick", "Isambard Brunel"],
        correct: 2
    },
    {
        q: "What is the highest railway line in the world?",
        options: ["Swiss Alps", "Qinghai-Tibet", "Rocky Mountaineer", "Andean Explorer"],
        correct: 1
    }
];

/* --- NEWS POSTS --- */
const newsData = [
    {
        category: "Innovation",
        date: "Dec 05, 2025",
        title: "Hydrogen Trains Expand in Europe",
        content: "Germany and Italy are leading the way with new Coradia iLint trains that emit only water vapor. This marks a huge step towards green rail travel."
    },
    {
        category: "High Speed",
        date: "Nov 28, 2025",
        title: "New Speed Record Attempt Planned",
        content: "Engineers are preparing a modified Maglev prototype hoping to break the 603 km/h barrier next month in Japan."
    },
    {
        category: "History",
        date: "Nov 15, 2025",
        title: "100 Years of the Flying Scotsman",
        content: "Celebrations are taking place across the UK to honor the world's most famous steam locomotive."
    },
    {
        category: "Infrastructure",
        date: "Oct 30, 2025",
        title: "Night Trains Make a Comeback",
        content: "New sleeper services connecting Paris, Berlin, and Vienna have sold out in record time as travelers ditch planes for trains."
    }
];

/* =============================
   2. STATE MANAGEMENT
   ============================= */

let factIndex = 0;
let quizIndex = 0;
let quizScore = 0;
const POINTS_PER_Q = 100;

// DOM Elements
const titleEl = document.getElementById("main-title");
const subEl = document.getElementById("sub-title");
const dynamicArea = document.getElementById("dynamic-area");
const cardIcon = document.querySelector(".card-icon i");

// Initial Load
renderHome();

/* =============================
   3. NAVIGATION HANDLERS
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

// If you haven't added this button to HTML yet, make sure to add it, or this line will error
const newsBtn = document.getElementById('btn-news');
if (newsBtn) {
    newsBtn.addEventListener('click', () => {
        setActiveMenu('btn-news');
        initNews();
    });
}

function setActiveMenu(id) {
    document.querySelectorAll('.menu-btn').forEach(btn => btn.classList.remove('active'));
    const btn = document.getElementById(id);
    if(btn) btn.classList.add('active');
}

/* =============================
   4. HOME PAGE LOGIC
   ============================= */

function renderHome() {
    cardIcon.className = "fa-solid fa-train";
    titleEl.innerText = "Welcome Aboard";
    subEl.innerText = "Discover amazing engineering feats, read the latest news, or test your knowledge.";
    
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
   5. FACTS LOGIC
   ============================= */

function initFacts() {
    setActiveMenu('btn-fact');
    cardIcon.className = "fa-solid fa-lightbulb";
    titleEl.innerText = "Did You Know?";
    subEl.innerText = "Learn something new about railways.";
    
    factIndex = 0;
    showFact();
}

function showFact() {
    if (factIndex >= facts.length) factIndex = 0;

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
   6. QUIZ LOGIC (Multiple Choice)
   ============================= */

function initQuiz() {
    setActiveMenu('btn-quiz');
    quizIndex = 0;
    quizScore = 0;
    cardIcon.className = "fa-solid fa-circle-question";
    renderQuestion();
}

function renderQuestion() {
    // End of Quiz Check
    if (quizIndex >= quizData.length) {
        showQuizResults();
        return;
    }

    const currentQ = quizData[quizIndex];
    
    titleEl.innerText = `Question ${quizIndex + 1}`;
    subEl.innerText = currentQ.q;

    // Create Options HTML
    let optionsHTML = '<div class="quiz-options">';
    
    currentQ.options.forEach((option, index) => {
        optionsHTML += `
            <button class="option-btn" onclick="checkAnswer(${index}, this)">
                ${option}
            </button>
        `;
    });
    optionsHTML += '</div>';

    // Inject HTML
    dynamicArea.innerHTML = `
        <div class="score-badge">Points: ${quizScore}</div>
        ${optionsHTML}
        <div id="next-btn-container"></div>
    `;
}

function checkAnswer(selectedIndex, btnElement) {
    const currentQ = quizData[quizIndex];
    const allButtons = document.querySelectorAll('.option-btn');
    
    // Disable all buttons to prevent double clicking
    allButtons.forEach(btn => btn.disabled = true);

    // Check if correct
    if (selectedIndex === currentQ.correct) {
        btnElement.classList.add('correct');
        quizScore += POINTS_PER_Q;
    } else {
        btnElement.classList.add('wrong');
        // Highlight the correct one so they learn
        allButtons[currentQ.correct].classList.add('correct');
    }

    // Update Score UI immediately
    document.querySelector('.score-badge').innerText = `Points: ${quizScore}`;

    // Show Next Button
    document.getElementById('next-btn-container').innerHTML = `
        <button class="action-btn" onclick="nextQuestion()">Next Question</button>
    `;
}

function nextQuestion() {
    quizIndex++;
    renderQuestion();
}

function showQuizResults() {
    titleEl.innerText = "Quiz Complete!";
    subEl.innerText = `Final Score: ${quizScore} Points`;
    
    const maxScore = quizData.length * POINTS_PER_Q;
    let msg = "";

    if (quizScore === maxScore) msg = "🏆 Perfect Score! You are a Grand Engineer!";
    else if (quizScore >= maxScore * 0.7) msg = "🚅 Excellent! You know your tracks.";
    else msg = "🚋 Good effort! Check the Facts section to improve.";
    
    dynamicArea.innerHTML = `
        <div style="font-size: 3rem; color: #06b6d4; margin-bottom: 10px;">
            <i class="fa-solid fa-trophy"></i>
        </div>
        <div style="margin-bottom: 25px; font-weight:500; font-size: 1.2rem;">${msg}</div>
        <div class="btn-group">
            <button class="action-btn" onclick="initQuiz()">Play Again</button>
            <button class="action-btn secondary" onclick="initFacts()">Study Facts</button>
        </div>
    `;
}

/* =============================
   7. NEWS PAGE LOGIC
   ============================= */

function initNews() {
    setActiveMenu('btn-news');
    cardIcon.className = "fa-solid fa-newspaper";
    titleEl.innerText = "Rail News";
    subEl.innerText = "Latest updates from the world of railways.";

    let htmlContent = '<div class="news-container">';

    newsData.forEach(post => {
        htmlContent += `
            <div class="news-card">
                <div class="news-header">
                    <span class="news-tag">${post.category}</span>
                    <span class="news-date">${post.date}</span>
                </div>
                <div class="news-title">${post.title}</div>
                <div class="news-excerpt">${post.content}</div>
            </div>
        `;
    });

    htmlContent += '</div>';
    
    // Add a button to go back home at the bottom
    htmlContent += `
        <div style="margin-top: 20px;">
            <button class="action-btn secondary" onclick="renderHome()">Back Home</button>
        </div>
    `;

    dynamicArea.innerHTML = htmlContent;
}
