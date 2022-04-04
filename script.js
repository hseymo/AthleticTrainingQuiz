// question creation
var firstQuestion = {
    title: "The patella is a _____ bone.",
    choices: ['long', 'sesamoid', 'flat', 'irregular'],
    answer: 'sesamoid',    
};

var secondQuestion = {
    title: "What is the most commonly injured ligament in the ankle?",
    choices: ['deltoid ligament', 'calcaneofibular ligament', 'anterior tibiofibular ligament', 'anterior talofibular ligament'],
    answer: 'anterior talofibular ligament'    
};

var thirdQuestion = {
    title: "Athletic Trainers are educated in all of the following domains, except:",
    choices: ['evaluating a shoulder', 'reducing a dislocated ankle', 'applying ultrasound to a pulled quadriceps muscle', 'desigining rehabilitation programs for a thumb sprain'],
    answer: 'reducing a dislocated ankle',   
};

var fourthQuestion = {
    title: "What is the function of the meniscus?",
    choices: ['prevent anterior translation of the lower leg', 'prevent posterior translation of the lower leg', 'absorb and dissipate shock passing through the joint', 'prevent lateral translation of the patella'],
    answer: 'absorb and dissipate shock passing through the joint',   
};

var fifthQuestion = {
    title: "The muscles of the rotator cuff include all of the following, except:",
    choices: ['supraspinatus', 'subscapularis', 'teres minor', 'deltoid'],
    answer: 'deltoid'    
};

questions = [firstQuestion, secondQuestion, thirdQuestion, fourthQuestion, fifthQuestion];

// declare variables and create elements
var start = document.querySelector("#start")
var homePage = document.querySelector("#homepage")
var questionPage = document.querySelector("#questionpage")
var timer = document.querySelector("#timer")
var question = document.querySelector(".askQuestion");
var answerEl = document.querySelector(".answerList");
var answerOne = document.createElement("li");
var answerTwo = document.createElement("li");
var answerThree = document.createElement("li");
var answerFour = document.createElement("li");
var response = document.querySelector("#response");

// append elements to document
answerEl.appendChild(answerOne);
answerEl.appendChild(answerTwo);
answerEl.appendChild(answerThree);
answerEl.appendChild(answerFour);

start.addEventListener("click", function() {
    startTrivia()
})

function startTrivia() {
    // hide homepage and display question page
    homePage.setAttribute("style", "display: none");
    questionPage.setAttribute("style", "display: flex");
    // start timer
    startTimer();
    // show first question
    nextQuestion();

    // listening for anywhere in the pink
    answerEl.addEventListener("click", function(event) {
        // determine if correct or not 
        // run correct or incorrect function which includes: going to next screen; display correct or incorrect; adjusting clock
        event.preventDefault();
        let userSelection = event.target.innerHTML;
        console.log(userSelection);
        let correctAnswer = "Incorrect";
        if (userSelection == currentQuestion.answer) {
            correctAnswer = "Correct!"
            response.textContent = correctAnswer;
            questionPage.appendChild(response);
            console.log("YAY!")
        } else {
            correctAnswer = "Incorrect";
            timeLeft = timeLeft-10;
            response.textContent = correctAnswer;
            questionPage.appendChild(response);
        }
        response.setAttribute("style", "padding:15px 50px; text-align:right;")
        setTimeout(function() {
            response.textContent=''
        }, 2000)

        nextQuestion();
    })
}

let score;
var timeLeft = 60;
function startTimer () {
    var timerInterval = setInterval(function() {
        timeLeft--;
        timer.textContent = `Time: ${timeLeft}`
        if (timeLeft == 0) {
            clearInterval(timerInterval);
            score = timeLeft;
            console.log(score)
            endGame()
            // end game
        }
    }, 1000);
}

let index = 0;
let currentQuestion = questions[index];
function nextQuestion() {
    if (index === 5) {
        score = timeLeft; 
        console.log(score);
        endGame();
    } else {
        currentQuestion = questions[index];
        question.textContent = currentQuestion.title;
        answerOne.textContent = currentQuestion.choices[0];
        answerTwo.textContent = currentQuestion.choices[1];
        answerThree.textContent = currentQuestion.choices[2];
        answerFour.textContent = currentQuestion.choices[3];
        index++;
        }
    }

var header = document.querySelector("header");
var resultsPage = document.querySelector("#resultspage");
var finalScore = document.querySelector("#finalscore")

function endGame() {
    questionPage.setAttribute("style", "display:none");
    header.setAttribute("style", "display:none");
    resultsPage.setAttribute("style", "display:flex");
    finalScore.textContent = `Your final score is ${score}.`
}

