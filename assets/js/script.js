var startButton = document.getElementById("start-quiz");

function buildQuiz() {
  clearInfoContainer();

}

function clearInfoContainer() {
  var infoContainer = document.getElementById("info-container");

  infoContainer.innerHTML = "";

  infoContainer.className = "";
  infoContainer.id = "answers-container";
}

startButton.addEventListener("click", buildQuiz);