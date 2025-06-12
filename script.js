const questions = [
  {
    text: "What's Lyn's favorite color?",
    options: ["Pink", "Blue", "Green"]
  },
  {
    text: "What’s her favorite animal?",
    options: ["Cat", "Dog", "Hamster"]
  },
  {
    text: "How often do you think about Lyn?",
    options: ["Always", "Sometimes", "Never"]
  },
  {
    text: "Do you think Lyn is funny?",
    options: ["Yes", "No"]
  },
  {
    text: "Would you go on a walk with Lyn?",
    options: ["Yes", "Maybe", "No"]
  },
  {
    text: "Do you find Lyn pretty?",
    options: ["Yes", "Absolutely", "She's gorgeous"]
  },
  {
    text: "Do you feel happy when Lyn texts you?",
    options: ["Yes 😊", "Kinda", "Not really"]
  },
  {
    text: "If Lyn was sad, would you cheer her up?",
    options: ["Of course", "Maybe", "No"]
  },
  {
    text: "Do you love Lyn?",
    options: ["Yes", "No"],
    dodgeNo: true
  },
  {
    text: "How do you see Lyn?",
    options: ["Friend", "Sister", "Crush"],
    final: true
  }
];

let currentQuestion = 0;
let userAnswers = [];
let userName = "";

function startQuiz() {
  const input = document.getElementById("username");
  const name = input.value.trim();

  if (!name) {
    alert("Please enter your name to begin 😊");
    return;
  }

  userName = name;

  document.querySelector(".start-screen").style.display = "none";
  document.querySelector(".quiz-container").style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question-title").textContent = q.text;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;

    if (q.dodgeNo && option === "No") {
      btn.onmouseover = () => {
        btn.style.position = "absolute";
        btn.style.top = Math.random() * 80 + "%";
        btn.style.left = Math.random() * 80 + "%";
      };
    } else {
      btn.onclick = () => handleAnswer(option);
    }

    answersDiv.appendChild(btn);
  });

  document.getElementById("next-btn").style.display = q.final ? "none" : "inline-block";
}

function handleAnswer(answer) {
  const q = questions[currentQuestion];

  userAnswers.push({ question: q.text, answer });

  if (q.final) {
    if (answer !== "Crush") {
      alert("🙅‍♂️ Nope! Try again 😉");
      return;
    } else {
      const fullResult = {
        name: userName,
        answers: userAnswers
      };

      localStorage.setItem("lynQuizAnswers", JSON.stringify(fullResult));

      document.querySelector(".quiz-container").innerHTML = `
        <h2>💖 Awww!</h2>
        <p>You see Lyn as your <strong>crush</strong> 😍</p>
        <p>She might feel the same... 💌</p>
        <p>Thanks for playing, ${userName}!</p>
      `;
      return;
    }
  }

  currentQuestion++;
  loadQuestion();
}

function nextQuestion() {
  if (currentQuestion < questions.length) {
    loadQuestion();
  }
}

// Auto-load only when quiz starts
