var homePage = document.querySelector("#homepage")
var start = document.querySelector("#start")
var questionOne = document.querySelector("#questionOne")
var questionTwo = document.querySelector("#questionTwo")
var questionThree = document.querySelector("#questionThree")
var questionFour = document.querySelector("#questionFour")
var questionFive = document.querySelector("#questionFive")
var possibleAnswers = document.querySelectorAll(".possibleAnswer")

// correct or wrong
var CorrectOrNot = document.createElement("h3")
document.body.appendChild(CorrectOrNot);
CorrectOrNot.setAttribute("style", "font-size:20px; margin-top:20px; margin-left:50%;")

// timer
var timer = document.querySelector("#timer")
var time = 60;
function countdown() {
    var timeLeft = setInterval(function() {
        time--;
        timer.textContent = `Time: ${time}`;
        if (time === 0) {
            clearInterval(countdown);
            // move to All Done screen
        }
    }
}



// var correctAnswers = correct answers from possibleAnswers
// var incorrectAnswers = incorrect answers from possibleAnswers

start.addEventListener("click", function() {
    homePage.setAttribute("style", "display: none");
    questionOne.setAttribute("style", "display: flex");
})

// regardless of which button, if a button is clicked, go to next screen
// also display if answer was correct or not and bottom border
possibleAnswers.addEventListener("click", function() {
    // questionOne.setAttribute("style", "display:none");
    // questionTwo.setAttribute("style", "display:flex");

    if (possibleAnswers.value) {
        CorrectOrNot.textContent = "Correct!"
    } else {
        CorrectOrNot.textContent = "Wrong!"
    }
})

console.log(possibleAnswers)