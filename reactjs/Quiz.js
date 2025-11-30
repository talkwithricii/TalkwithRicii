// ===== QUIZ DATA =====
const questions = [
  {
    question: "1. What is the purpose of importing React in a component file?",
    options: [
      "To make the page colorful",
      "To enable building user interfaces",
      "To add CSS styles",
      "To store data in a database"
    ],
    answer: "To enable building user interfaces"
  },
  {
    question: "2. What does { useState } allow you to do in a React component?",
    options: [
      "Delete a component",
      "Store and update data within the component",
      "Apply CSS styles dynamically",
      "Import other components"
    ],
    answer: "Store and update data within the component"
  },
  {
    question: "3. Why do we import \"./Register.css\" in the component?",
    options: [
      "To connect to the database",
      "To make the page interactive",
      "To add design/styles to the page",
      "To enable routing"
    ],
    answer: "To add design/styles to the page"
  },
  {
    question: "4. In import React from \"react\";, what does the capital React represent?",
    options: [
      "The folder name",
      "The variable holding everything exported from the library",
      "A built-in HTML element",
      "A CSS class"
    ],
    answer: "The variable holding everything exported from the library"
  },
  {
    question: "5. True or False: You can rename React to any other variable name when importing.",
    options: ["True", "False"],
    answer: "True"
  },
  {
    question: "6. What does the function Register() represent in React?",
    options: [
      "A CSS file",
      "A mini-app or component for the registration page",
      "A JavaScript variable",
      "A database table"
    ],
    answer: "A mini-app or component for the registration page"
  },
  {
    question: "7. Which two items are returned when using useState in React?",
    options: [
      "state and setState",
      "formData and setFormData",
      "data and updateData",
      "useState and useEffect"
    ],
    answer: "formData and setFormData"
  },
  {
    question: "8. What is the initial value of the formData object in your example?",
    options: [
      "null",
      "0",
      "An object with all empty strings",
      "An empty array"
    ],
    answer: "An object with all empty strings"
  },
  {
    question: "9. How do you update the value of formData?",
    options: [
      "By directly changing formData.name = 'John'",
      "By using the function setFormData()",
      "By importing another library",
      "By using useEffect()"
    ],
    answer: "By using the function setFormData()"
  },
  {
    question: "10. Why is it important to have initial values in useState for a form?",
    options: [
      "To make the page load faster",
      "To ensure the form can remember user inputs",
      "To connect the component to CSS",
      "To enable animations"
    ],
    answer: "To ensure the form can remember user inputs"
  }
];

let current = 0;
let score = 0;
let tries = 0;
let answered = false;

// ===== CREATE QUIZ CONTAINER =====
const body = document.body;
body.style.background = "#0b0c10";
body.style.fontFamily = "'Consolas', 'Courier New', monospace";
body.style.color = "#c5c6c7";

const quizContainer = document.createElement("div");
quizContainer.style.maxWidth = "700px";
quizContainer.style.margin = "50px auto";
quizContainer.style.background = "#1f2833";
quizContainer.style.padding = "30px";
quizContainer.style.borderRadius = "15px";
quizContainer.style.boxShadow = "0 0 20px #66fcf1";
body.appendChild(quizContainer);

// ===== CREATE QUESTION ELEMENTS =====
const questionEl = document.createElement("h2");
questionEl.style.color = "#66fcf1";
questionEl.style.textShadow = "0 0 5px #45a29e";
quizContainer.appendChild(questionEl);

const optionsEl = document.createElement("ul");
optionsEl.style.listStyle = "none";
optionsEl.style.padding = "0";
quizContainer.appendChild(optionsEl);

const nextBtn = document.createElement("button");
nextBtn.textContent = "Next";
nextBtn.style.marginTop = "20px";
nextBtn.style.padding = "12px 25px";
nextBtn.style.border = "none";
nextBtn.style.borderRadius = "8px";
nextBtn.style.background = "#45a29e";
nextBtn.style.color = "#0b0c10";
nextBtn.style.fontWeight = "700";
nextBtn.style.fontSize = "1rem";
nextBtn.style.cursor = "pointer";
nextBtn.style.transition = "0.3s";
nextBtn.disabled = true;
quizContainer.appendChild(nextBtn);

// ===== MODAL POPUP =====
const modal = document.createElement("div");
modal.style.display = "none";
modal.style.position = "fixed";
modal.style.zIndex = "1000";
modal.style.left = "0";
modal.style.top = "0";
modal.style.width = "100%";
modal.style.height = "100%";
modal.style.backgroundColor = "rgba(0,0,0,0.8)";
modal.style.justifyContent = "center";
modal.style.alignItems = "center";

const modalContent = document.createElement("div");
modalContent.style.background = "#1f2833";
modalContent.style.color = "#c5c6c7";
modalContent.style.padding = "35px 30px";
modalContent.style.borderRadius = "12px";
modalContent.style.textAlign = "center";
modalContent.style.maxWidth = "450px";
modalContent.style.position = "relative";
modalContent.style.boxShadow = "0 0 20px #66fcf1";
modal.appendChild(modalContent);

const closeModal = document.createElement("span");
closeModal.innerHTML = "&times;";
closeModal.style.position = "absolute";
closeModal.style.top = "10px";
closeModal.style.right = "15px";
closeModal.style.fontSize = "1.8rem";
closeModal.style.color = "#66fcf1";
closeModal.style.cursor = "pointer";
modalContent.appendChild(closeModal);

const finalScoreEl = document.createElement("p");
finalScoreEl.style.marginTop = "20px";
finalScoreEl.style.fontSize = "1.2rem";
finalScoreEl.style.color = "#66fcf1";
modalContent.appendChild(finalScoreEl);

const retryBtn = document.createElement("button");
retryBtn.textContent = "Try Again";
retryBtn.style.marginTop = "15px";
retryBtn.style.padding = "12px 20px";
retryBtn.style.borderRadius = "8px";
retryBtn.style.border = "1px solid #66fcf1";
retryBtn.style.background = "#0b0c10";
retryBtn.style.color = "#66fcf1";
retryBtn.style.fontWeight = "600";
retryBtn.style.cursor = "pointer";
retryBtn.style.transition = "0.3s";
modalContent.appendChild(retryBtn);

body.appendChild(modal);

// ===== FUNCTIONS =====
function loadQuestion() {
  tries = 0;
  answered = false;
  nextBtn.disabled = true;

  const q = questions[current];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(opt => {
    const li = document.createElement("li");
    li.textContent = opt;
    li.style.padding = "10px 15px";
    li.style.marginBottom = "10px";
    li.style.background = "#0c0d0f";
    li.style.borderRadius = "8px";
    li.style.cursor = "pointer";
    li.style.transition = "0.3s";
    li.style.boxShadow = "0 0 5px #45a29e inset";

    li.addEventListener("mouseenter", () => li.style.background = "#1f2833");
    li.addEventListener("mouseleave", () => li.style.background = "#0c0d0f");

    li.addEventListener("click", () => checkAnswer(li, q.answer));
    optionsEl.appendChild(li);
  });
}

function checkAnswer(li, correct) {
  if (answered) return;
  answered = true;
  nextBtn.disabled = false;

  if (li.textContent === correct) {
    li.style.background = "#00ff00"; // bright green
    li.style.color = "#f0f0f0ff";
    li.style.boxShadow = "0 0 10px #00ff00";
    score++;
    disableOptions();
  } else {
    tries++;
    li.style.background = "#ff4d4d"; // red for wrong
    li.style.color = "#0b0c10";
    li.style.boxShadow = "0 0 10px #ff4d4d";

    if (tries < 2) {
      setTimeout(() => {
        li.style.background = "#0c0d0f";
        li.style.color = "#c5c6c7";
        li.style.boxShadow = "0 0 5px #45a29e inset";
        answered = false;
      }, 800);
    } else {
      disableOptions();
    }
  }
}


function disableOptions() {
  Array.from(optionsEl.children).forEach(li => li.style.pointerEvents = "none");
}

// ===== NEXT BUTTON =====
nextBtn.addEventListener("click", () => {
  if (!answered) return;
  current++;
  if (current >= questions.length) {
    finalScoreEl.textContent = `💻 Your Score: ${score} / ${questions.length}`;
    modal.style.display = "flex";
  } else {
    loadQuestion();
  }
});

// ===== MODAL EVENTS =====
closeModal.addEventListener("click", () => modal.style.display = "none");
retryBtn.addEventListener("click", () => {
  modal.style.display = "none";
  current = 0;
  score = 0;
  loadQuestion();
});
window.addEventListener("click", (e) => { if (e.target === modal) modal.style.display = "none"; });

// ===== INIT QUIZ =====
loadQuestion();
