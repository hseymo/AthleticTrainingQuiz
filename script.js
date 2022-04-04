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
    // show  question
    nextQuestion();

    // listening for click anywhere in the ordered list
    answerEl.addEventListener("click", function(event) {
        // determine if correct or not 
        // run correct or incorrect function which includes: going to next screen; display correct or incorrect; adjusting clock
        event.preventDefault();
        let userSelection = event.target;
        let userSelectionText = event.target.innerHTML;
        // if click was within a list element
        if (userSelection.matches("li")) {
            let correctAnswer = "Incorrect";
            // if selected answer matches answer value from object
            if (userSelectionText == currentQuestion.answer) {
                // post to screen that it was correct
                correctAnswer = "Correct!"
                response.textContent = correctAnswer;
                questionPage.appendChild(response);
            // if selected answer does not match answer value from object
            } else {
                // post to screen that it was incorrect
                correctAnswer = "Incorrect";
                // subtract 10 seconds from clock
                timeLeft = timeLeft-10;
                response.textContent = correctAnswer;
                questionPage.appendChild(response);
            }
            // format response and set timer for 2 seconds
            response.setAttribute("style", "padding:15px 50px; text-align:right;")
            setTimeout(function() {
                response.textContent=''; 
            }, 2000)
            // on click, move to next question
            nextQuestion();
        }
    })
}

// create timer for 60 seconds; updating each second
let timerInterval;
let score;
var timeLeft = 60;
function startTimer () {
    timerInterval = setInterval(function() {
        timeLeft--;
        timer.textContent = `Time: ${timeLeft}`
        if (timeLeft == 0) {
            clearInterval(timerInterval);
            score = timeLeft;
            endGame();
        }
    }, 1000);
}

// create function to move through questions
let i = 0;
let currentQuestion = questions[i];
function nextQuestion() {
    // if on the last question
    if (i === questions.length) {
        // assign score of time on clock
        score = timeLeft; 
        // need to clear interval or score will turn to 0 when clock is out
        clearInterval(timerInterval);
        // run end game function
        endGame();
        // otherwise, change text to the next question
    } else {
        currentQuestion = questions[i];
        question.textContent = currentQuestion.title;
        answerOne.textContent = currentQuestion.choices[0];
        answerTwo.textContent = currentQuestion.choices[1];
        answerThree.textContent = currentQuestion.choices[2];
        answerFour.textContent = currentQuestion.choices[3];
        i++;
        }
    }

var header = document.querySelector("header");
var resultsPage = document.querySelector("#resultspage");
var finalScore = document.querySelector("#finalscore")

// at end of game (clock runs out or all questions were completed)
function endGame() {
    // turn off question page and header
    questionPage.setAttribute("style", "display:none");
    header.setAttribute("style", "display:none");
    // turn on result page
    resultsPage.setAttribute("style", "display:flex");
    // update score to page
    finalScore.textContent = `Your final score is ${score}.`
}

var submitButton = document.querySelector("#submit");
var initials = document.querySelector("#initials");
var userScore;

// on submit, create an object to store user's data
submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    initials = initials.value;
    userScore = {
        initials: initials,
        score: score,
        scoreset: `${initials} : ${score}`,
    }
    // stringify to send to local storage
    userScoreJson = JSON.stringify(userScore)
    localStorage.setItem("userScore", userScoreJson), 
    // turn off result page and turn on score page
    resultsPage.setAttribute("style", "display:none");
    scorePage.setAttribute("style", "display: flex");
    // execute function to add user to scoreboard
    addToScoreboard();
})

var highscoresButton = document.querySelector("#highscores");
var scorePage = document.querySelector("#scorepage")

// switch page correctly when selected
highscoresButton.addEventListener("click", function() {
    homePage.setAttribute("style", "display: none");
    questionPage.setAttribute("style", "display: none");
    scorePage.setAttribute("style", "display: flex");
    header.setAttribute("style", "display:none");
})

var clear = document.querySelector("#clear");
var scoreboard = document.querySelector("#scoreboard")

clear.addEventListener("click", function() {
    console.log("hello")
    scoreboard.textContent = '';
})

// building scoreboard WIP
function addToScoreboard () {
    // pull from local storage and return as object
    var savedUser = JSON.parse(localStorage.getItem("userScore"));
    let savedScores = [];
    // push object to array of savedScores
    savedScores.push(savedUser);
    if (savedScores != null) {
        // if there are objects within array, sort by high score
        var sortedScores = savedScores.sort(function(a,b) {
            return b.score - a.score;
        });
        // post scores
        for (i=0; i<sortedScores.length; i++) {
            // add new post for each item in array
            var user = sortedScores[i];
            var newScore = document.createElement("li");
            newScore.textContent = user.scoreset;
            scoreboard.appendChild(newScore);
        }
    } 
}
