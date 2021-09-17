var startButton = document.getElementById("start-quiz");

function buildQuiz() {
  clearContainer("info");

}

function clearContainer(containerIdName) {
  var container = document.getElementById(containerIdName + "-container");
  switch (containerIdName) {
    case "info":
      container.innerHTML = "";

      container.className = "";
      container.id = "answers-container";
      break;
    case "answers":
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
