var startButton = document.getElementById("start-quiz");
var questionContainer = document.getElementById("question-container");

var questionIndex = 0;

function buildQuiz() {
  //clearing info section when starting quiz
  clearContainer("info");
  //clearing question section when starting quiz
  clearContainer("question");

  var questionContainerEl = document.createElement("h1");
  questionContainerEl.textContent = getRandomQuestion();

  questionContainer.appendChild(questionContainerEl);

  var answers = getAnswers();

  var answersContainer = document.getElementById("answers-container");

  for (var i = 0; i < questionData[questionIndex].answers.length; i++) {
    var createButton = document.createElement("button");
    createButton.className = "btn";
    createButton.id = "answerBtn";
    createButton.textContent = answers[i];
    answersContainer.appendChild(createButton);
  }
  
}

function getRandomQuestion() {
  questionIndex = Math.floor(Math.random() * questionData.length);
  return questionData[questionIndex].question;
}

function getAnswers() {
  var answers = [];

  for (var i = 0; i < questionData[questionIndex].answers.length; i++) {
    answers.push(questionData[questionIndex].answers[i]);
  }

  return answers;
}

function clearContainer(containerIdName) {
  var container = document.getElementById(containerIdName + "-container");
  switch (containerIdName) {
    case "info":
      container.innerHTML = "";

      container.className = "answers";
      container.id = "answers-container";
      break;
    case "answers":
      container.innerHTML = "";
      break;
    case "question":
      container.innerHTML = "";
      break;
  }
}

var questionData = [
  {
    question: "Question 1",
    answers: ["1", "2", "3", "4"],
  },
  {
    question: "Question 2",
    answers: ["3", "4", "5", "6"],
  },
  {
    question: "Question 3",
    answers: ["7", "8", "9", "10"],
  },
  {
    question: "Question 4",
    answers: ["11", "12", "13", "14"],
  },
  {
    question: "Question 5",
    answers: ["15", "16", "17", "18"],
  },
  {
    question: "Question 6",
    answers: ["19", "20", "21", "22"],
  },
];

startButton.addEventListener("click", buildQuiz);
