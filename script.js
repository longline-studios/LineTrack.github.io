<script>

    /* =============================
       RAIL FACTS (NO REPEAT SYSTEM)
       ============================= */

    let facts = [
        "The first railway opened in 1825 between Stockton and Darlington.",
        "The TGV set a world speed record of 574.8 km/h.",
        "Japanese Shinkansen trains have a delay average under 1 minute.",
        "London has the oldest underground system in the world.",
        "Railway semaphores are still used in several countries."
    ];

    let availableFacts = [...facts];

    function newFact() {
        // Reset if all facts used
        if (availableFacts.length === 0) {
            availableFacts = [...facts];
        }

        // Pick random fact
        const index = Math.floor(Math.random() * availableFacts.length);
        const selectedFact = availableFacts[index];

        // Remove from available list
        availableFacts.splice(index, 1);

        document.getElementById("title").innerText = "RailFact";
        document.getElementById("subtitle").innerText = "Random railway knowledge:";
        document.getElementById("output").innerText = selectedFact;
    }



    /* =============================
              RAILQUIZ SYSTEM
       ============================= */

    const quizQuestions = [
        { q: "What country invented the Shinkansen?", a: "japan" },
        { q: "What is the world’s fastest wheeled train?", a: "tgv" },
        { q: "What year did the London Underground open?", a: "1863" },
    ];

    let quizIndex = 0;
    let quizScore = 0;
    let quizActive = false;

    // Adds an input box below questions
    function addQuizInput() {
        document.getElementById("output").innerHTML = `
            ${quizQuestions[quizIndex].q}<br><br>
            <input id="quizInput" type="text" placeholder="Your answer..." 
                   style="padding:10px; width:60%; border-radius:8px; border:none;">
            <br><br>
            <button class="btn" onclick="submitAnswer()">Submit</button>
        `;
    }

    function startQuiz() {
        quizIndex = 0;
        quizScore = 0;
        quizActive = true;

        document.getElementById("title").innerText = "RailQuiz";
        document.getElementById("subtitle").innerText = "Question 1:";
        addQuizInput();
    }

    function submitAnswer() {
        if (!quizActive) return;

        const userAnswer = document.getElementById("quizInput").value.toLowerCase().trim();
        const correctAnswer = quizQuestions[quizIndex].a;

        let feedback;

        if (userAnswer === correctAnswer) {
            quizScore++;
            feedback = `✔ Correct!`;
        } else {
            feedback = `✖ Incorrect — the answer was **${correctAnswer}**.`;
        }

        document.getElementById("output").innerHTML = `
            ${feedback}<br><br>
            <button class="btn" onclick="nextQuestion()">Next</button>
        `;
    }

    function nextQuestion() {
        quizIndex++;

        if (quizIndex >= quizQuestions.length) {
            endQuiz();
            return;
        }

        document.getElementById("title").innerText = "RailQuiz";
        document.getElementById("subtitle").innerText = `Question ${quizIndex + 1}:`;
        addQuizInput();
    }

    function endQuiz() {
        quizActive = false;

        document.getElementById("title").innerText = "Quiz Complete!";
        document.getElementById("subtitle").innerText = `Your Score: ${quizScore}/${quizQuestions.length}`;

        document.getElementById("output").innerHTML = `
            <strong>Great job!</strong><br><br>
            Want to try again?<br><br>
            <button class="btn" onclick="startQuiz()">Restart Quiz</button>
        `;
    }

</script>
