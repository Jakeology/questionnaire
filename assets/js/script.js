var bodyContainer = document.getElementById("body-container");
var questionContainer = document.getElementById("question-container");
var resultsContainer = document.getElementById("results-container");

var startButton = document.querySelector("#start-btn");

var questionIndex = 0;
var score = 0;

var takingQuiz = false;

var viewHighscores = false;

function buildQuiz() {
  //clearing question and answers sections when starting quiz
  clearContainer("question-container");
  clearContainer("answers-container");

  takingQuiz = true;

  var questionContainerEl = document.createElement("h1");
  questionContainerEl.textContent = getRandomQuestion();

  questionContainer.appendChild(questionContainerEl);

  var answers = shuffleAnswers(getAnswers());

  var answersContainer = document.getElementById("answers-container");
  
  for (var i = 0; i < questionData[questionIndex].answers.length; i++) {
    var createButton = document.createElement("button");
    createButton.className = "btn";
    createButton.id = "answer-btn";
    createButton.textContent = answers[i];
    answersContainer.appendChild(createButton);
  }
}

function terminateQuiz() {
  //clearing question and answers sections when terminating quiz
  clearContainer("question-container");
  clearContainer("answers-container");

  takingQuiz = false;

  var questionText = document.createElement("h1");
  questionText.textContent = "The quiz is over!";

  questionContainer.appendChild(questionText);

  var questionText = document.createElement("h2");
  questionText.textContent = "Your score was " + score;

  questionContainer.appendChild(questionText);

  var inputEl = document.createElement("input");
  inputEl.type = "text";
  inputEl.placeholder = "Enter Name";
  inputEl.id = "input";

  questionContainer.appendChild(inputEl);

  var button = document.createElement("button");
  button.textContent = "Submit";
  button.className = "submit-btn";
  button.id = "submit-btn";
  questionContainer.appendChild(button);

  resetQuizTimer();
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
    score += 7;
  } else if (displayType === "wrong") {
    element.className = "border-active";
    element.style.color = "#a74848";
    element.textContent = "Wrong!";
  } else {
    element.style.color = "#a74848";
    element.className = "border-none";
    element.style.fontSize = "20px"
    element.textContent = displayType;
  }

  resultsContainer.appendChild(element);

  startResultClearTimer();
}

function shuffleAnswers(array) {
  return array.sort(() => Math.random() - 0.5);
}

var timeLeft = 5;
var timeInterval;

function startQuizTimer() {

  var getTimerEl = document.querySelector("#timer");
  getTimerEl.textContent = "Time: " + timeLeft;

  timeInterval = setInterval(function () {

    timeLeft--;
    getTimerEl.textContent = "Time: " + timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timeInterval);
      return terminateQuiz();
    }

  }, 1000);
}

function resetQuizTimer() {
  clearInterval(timeInterval);
  var getTimerEl = document.querySelector("#timer");
  getTimerEl.textContent = "Time: 0";
}

var resultTimeInterval;

function startResultClearTimer() {
  clearInterval(resultTimeInterval);
  resultTimeInterval = setInterval(results, 1000);
  var resultTimer = 3;
  function results() {

    resultTimer--;
    console.log(resultTimer);

    if (resultTimer <= 0) {
      clearInterval(resultTimeInterval);
      clearContainer("results");
    }
  }
}

function clearContainer(containerIdName) {
  var container = document.getElementById(containerIdName);

  if(!container) {
    return;
  }

  switch (containerIdName) {
    case "info-container":
      container.innerHTML = "";

      container.className = "answers";
      container.id = "answers-container";
      break;
    case "results":
      container.innerHTML = "";

      container.className = "border-none";
    default:
      container.innerHTML = "";
  }
}

function buttonClick(event) {
  var targetEl = event.target;

  //check to see if user clicked the start quiz button
  if (targetEl.matches("#start-btn")) {
    //clearing info section when starting quiz
    clearContainer("info-container");
    return buildQuiz();
  }

  //check to see if user clicked an answern button to a question
  if (targetEl.matches("#answer-btn")) {
    var getClickedAnswer = targetEl.innerHTML;
    var getCorrectAnswer = questionData[questionIndex].answers[3];

    if (getClickedAnswer === getCorrectAnswer) {
      displayResults("correct");
    } else {
      displayResults("wrong");
    }

    //removes the questions and answers from the list so user doesn't get the same question twice.
    questionData.splice(questionIndex, 1);

    if (!questionData.length) {
      return terminateQuiz();
    }

    buildQuiz();
  }

  if (targetEl.matches("#submit-btn")) {

    var input = document.getElementById("input");

    if(!input.value) {
      input.style.borderColor = "#a74848";
      return displayResults("Please enter a valid name.");
    }

    clearInterval(resultTimeInterval);
    var getInput = input.value;
    saveHighscore(getInput, score);
    displayHighscores("submit");
  }

  if (targetEl.matches("#highscores-btn")) {
    if(takingQuiz) {
      return displayResults("You can't do that while taking the quiz.");
    }
    
    if(!viewHighscores) {
      displayHighscores("view");
    }

  }

  if (targetEl.matches("#retake-btn")) {
    location.reload();
  }

  if (targetEl.matches("#clear-btn")) {
    if(localStorage.length <= 0) {
      return displayResults("You can't clear the highscores when it's already empty!");
    }
    localStorage.clear();
    clearContainer("highscore-container");
  }

}

function displayHighscores(displayType) {
  clearContainer("question-container");
  clearContainer("info-container");
  clearContainer("results-container");

  viewHighscores = true;

  var highScores = loadHighscores();

  if(!highScores) {
    return;
  }

  var changeAnswerEl = document.getElementById("answers-container");

  changeAnswerEl.className = "highscores";
  changeAnswerEl.id = "highscore-container";
  
  var questionContainerEl = document.createElement("h1");
  questionContainerEl.textContent = "Highscores";
  questionContainer.appendChild(questionContainerEl);

  var highScoresContainer = document.getElementById("highscore-container");

  var place = 1;

  for(var i = 0; i < highScores.length; i++) {
    var scoreData = document.createElement("h2");
    var getUser = highScores[i].name;
    var getScore = highScores[i].score;

    if(place < highScores.length) {
      scoreData.className = "highscores-border";
    } else {
      scoreData.className = "highscores-none";
    }

    scoreData.innerHTML = place + ". " + getUser + " - " + getScore;

    highScoresContainer.appendChild(scoreData);
    place++;
  }

  var retakeButton = document.createElement("button");
  retakeButton.className = "submit-btn";
  retakeButton.id = "retake-btn";
  if(displayType === "submit") {
    retakeButton.textContent = "Retake Quiz";
  } else if(displayType === "view") {
    retakeButton.textContent = "Go back";
  }

  resultsContainer.appendChild(retakeButton);

  var clearButton = document.createElement("button");
  clearButton.className = "submit-btn";
  clearButton.id = "clear-btn";
  clearButton.textContent = "Clear Highscores";

  resultsContainer.appendChild(clearButton);

}

function saveHighscore(user, score) {
  localStorage.setItem(user, score);
}

function loadHighscores() {

  if (!localStorage) {
    return;
  }

  var scores = [];

  for(var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i)
    var scoreDataObj = {
      name: key,
      score: localStorage.getItem(key),
    };
    scores.push(scoreDataObj);
  }

  return scores;

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

startButton.onclick = startQuizTimer;
bodyContainer.addEventListener("click", buttonClick);
