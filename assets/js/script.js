var mainContainer = document.getElementById("quiz-container");
var questionContainer = document.getElementById("question-container");
var resultsContainer = document.getElementById("results-container");

var questionIndex = 0;

function buildQuiz() {
  //clearing question and answers sections when starting quiz
  clearContainer("question");
  clearContainer("answers");

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

function displayResults(displayType) {
  //check if element exist, if not create one. If it does, then overwright the existing one
  var results = document.getElementById("results");
  var element;

  if(!results) {
    var createH2El = document.createElement("h3");
    createH2El.id = "results";
    element = createH2El;
  } else {
    element = results;
  }

  if (displayType === "correct") {
    element.className = "border-active";
    element.style.color = "#48a76c";
    element.textContent = "Correct!";
  } else {
    element.className = "border-active";
    element.style.color = "#a74848";
    element.textContent = "Wrong!";
  }

  resultsContainer.appendChild(element);

  startResultClearTimer();
}

var resultTimeInterval;

function startResultClearTimer() {
  clearInterval(resultTimeInterval);
  resultTimeInterval = setInterval(results, 1000);
  var resultTimer = 2;
  function results() {

    resultTimer--;

    if (resultTimer < 0) {
      clearInterval(resultTimeInterval);
      clearContainer("results");
    }
  }
}

function clearContainer(containerIdName) {
  var container = document.getElementById(containerIdName + "-container");
  switch (containerIdName) {
    case "info":
      container.innerHTML = "";

      container.className = "answers";
      container.id = "answers-container";
      break;
    default:
      container.innerHTML = "";
  }
}

function buttonClick(event) {
  var targetEl = event.target;

  //check to see if user clicked the start quiz button
  if (targetEl.matches("#start-quiz")) {
    //clearing info section when starting quiz
    clearContainer("info");
    return buildQuiz();
  }

  //check to see if user clicked an answern button to a question
  if (targetEl.matches("#answerBtn")) {
    var getClickedAnswer = targetEl.innerHTML;
    var getCorrectAnswer = questionData[questionIndex].answers[3];

    if (getClickedAnswer === getCorrectAnswer) {
      displayResults("correct");
    } else {
      displayResults("wrong");
    }

    buildQuiz();
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

mainContainer.addEventListener("click", buttonClick);
