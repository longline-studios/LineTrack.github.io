const facts = [
  "The UK uses AWS (Automatic Warning System) to inform drivers of upcoming signals.",
  "Some railways use ETCS Level 2 for fully digital signalling.",
  "Most trains use electric or pneumatic brakes depending on the region."
];

const quiz = {
  question: "What does a red signal mean?",
  answers: ["Proceed", "Warning", "Stop"],
  correct: 2
};

function loadFact() {
  const random = Math.floor(Math.random() * facts.length);
  document.getElementById("fact-text").textContent = facts[random];
}

function loadQuiz() {
  document.getElementById("question").textContent = quiz.question;
  const box = document.getElementById("answers");
  box.innerHTML = "";
  quiz.answers.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.onclick = () => alert(i === quiz.correct ? "Correct!" : "Wrong!");
    box.appendChild(btn);
  });
}

loadFact();
loadQuiz();
