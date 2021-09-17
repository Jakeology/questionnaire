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

startButton.addEventListener("click", buildQuiz);
