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
/* =============================
   8. SIGNAL SIM GAME LOGIC
   ============================= */

// État du jeu
let gameState = {
    signal: 'red',      // 'red' ou 'green'
    switch: 'top',      // 'top' (voie 1) ou 'bottom' (voie 2)
    trainMoving: false,
    trainX: 50          // Position de départ
};

// Initialisation via le menu
const gameBtn = document.getElementById('btn-game');
if (gameBtn) {
    gameBtn.addEventListener('click', () => {
        setActiveMenu('btn-game');
        initGame();
    });
}

function initGame() {
    setActiveMenu('btn-game');
    cardIcon.className = "fa-solid fa-traffic-light";
    titleEl.innerText = "Signal Simulator";
    subEl.innerText = "Mission: Guide the train to Track 2 safely.";

    // On injecte le SVG (Dessin des rails)
    // C'est un dessin vectoriel simple : Lignes grises + Aiguillage bleu + Feu
    dynamicArea.innerHTML = `
        <div class="status-text" id="game-status">SYSTEM READY. WAITING FOR COMMAND.</div>
        
        <div class="game-board" id="board">
            <svg width="100%" height="100%" viewBox="0 0 600 300">
                <!-- RAIL PRINCIPAL (Gauche) -->
                <line x1="0" y1="150" x2="200" y2="150" class="track-line" />
                
                <!-- VOIE 1 (Haut) -->
                <line x1="200" y1="150" x2="600" y2="100" class="track-line" opacity="0.5" />
                <text x="550" y="90" fill="#555" font-family="monospace" font-size="12">TRACK 1</text>

                <!-- VOIE 2 (Bas - Destination) -->
                <line x1="200" y1="150" x2="600" y2="200" class="track-line" opacity="0.5" />
                <text x="550" y="230" fill="#555" font-family="monospace" font-size="12">TRACK 2</text>

                <!-- AIGUILLAGE (Switch) - ID: game-switch -->
                <line id="game-switch" x1="200" y1="150" x2="300" y2="135" class="switch-line" onclick="toggleSwitch()" />

                <!-- SIGNAL (Feu) - ID: game-signal -->
                <line x1="180" y1="120" x2="180" y2="150" stroke="#333" stroke-width="2" />
                <circle id="game-signal" cx="180" cy="120" r="8" fill="#ef4444" class="signal-light" onclick="toggleSignal()" />

                <!-- LE TRAIN -->
                <rect id="game-train" x="20" y="144" width="40" height="12" rx="2" fill="white" />
            </svg>
        </div>

        <div class="game-controls">
            <button class="action-btn" onclick="startTrain()">START TRAIN</button>
            <button class="action-btn secondary" onclick="resetGame()">RESET</button>
        </div>
        
        <div style="font-size: 0.9rem; color: #94a3b8; margin-top: 15px;">
            <i class="fa-solid fa-computer-mouse"></i> Click the <b>Blue Line</b> (Switch) and the <b>Red Light</b> (Signal).
        </div>
    `;

    // Réinitialiser les variables
    gameState = { signal: 'red', switch: 'top', trainMoving: false, trainX: 20 };
}

/* --- LOGIQUE DU JEU --- */

function toggleSignal() {
    if (gameState.trainMoving) return; // Interdit de toucher pendant que ça roule

    const signalEl = document.getElementById('game-signal');
    if (gameState.signal === 'red') {
        gameState.signal = 'green';
        signalEl.setAttribute('fill', '#22c55e'); // Vert
    } else {
        gameState.signal = 'red';
        signalEl.setAttribute('fill', '#ef4444'); // Rouge
    }
}

function toggleSwitch() {
    if (gameState.trainMoving) return;

    const switchEl = document.getElementById('game-switch');
    if (gameState.switch === 'top') {
        gameState.switch = 'bottom';
        // Animation visuelle de l'aiguillage vers le bas
        switchEl.setAttribute('x2', '300');
        switchEl.setAttribute('y2', '165'); // Descend
    } else {
        gameState.switch = 'top';
        // Animation visuelle vers le haut
        switchEl.setAttribute('x2', '300');
        switchEl.setAttribute('y2', '135'); // Monte
    }
}

function startTrain() {
    if (gameState.trainMoving) return;
    
    gameState.trainMoving = true;
    const statusEl = document.getElementById('game-status');
    const trainEl = document.getElementById('game-train');
    
    statusEl.innerText = "TRAIN DEPARTING...";
    statusEl.style.color = "#fbbf24"; // Jaune

    let position = 20;
    let speed = 2; // Vitesse du train

    const interval = setInterval(() => {
        position += speed;
        
        // 1. Calcul de la position Y (Haut/Bas) selon l'avancement
        let currentY = 144; // Y de départ
        
        // Si on dépasse l'aiguillage (x > 200)
        if (position > 200) {
            if (gameState.switch === 'top') {
                // Monte progressivement
                currentY = 144 - (position - 200) * 0.12; 
            } else {
                // Descend progressivement
                currentY = 144 + (position - 200) * 0.12;
            }
        }
        
        // Mise à jour visuelle
        trainEl.setAttribute('x', position);
        trainEl.setAttribute('y', currentY);

        // --- CONDITIONS DE DÉFAITE / VICTOIRE ---

        // Cas 1 : Le feu est rouge et le train arrive au feu (x=140 environ)
        if (gameState.signal === 'red' && position > 140 && position < 150) {
            clearInterval(interval);
            statusEl.innerText = "ALARM: SPAD (Signal Passed at Danger)! GAME OVER.";
            statusEl.style.color = "#ef4444";
            trainEl.setAttribute('fill', '#ef4444'); // Train devient rouge
            gameState.trainMoving = false;
        }

        // Cas 2 : Le train est allé sur la Voie 1 (Mauvaise voie)
        if (position > 580 && gameState.switch === 'top') {
            clearInterval(interval);
            statusEl.innerText = "WRONG DESTINATION: Train arrived at Track 1.";
            statusEl.style.color = "#fbbf24"; // Orange
            gameState.trainMoving = false;
        }

        // Cas 3 : VICTOIRE (Voie 2 atteinte)
        if (position > 580 && gameState.switch === 'bottom') {
            clearInterval(interval);
            statusEl.innerText = "SUCCESS: Train arrived safely at Track 2.";
            statusEl.style.color = "#22c55e"; // Vert
            trainEl.setAttribute('fill', '#22c55e');
            gameState.trainMoving = false;
        }

    }, 16); // 60 FPS environ
}

function resetGame() {
    initGame(); // Recharge tout
}
