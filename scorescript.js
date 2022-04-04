// var clear = document.querySelector("#clear");
// var scoreboard = document.querySelector("#scoreboard")

// clear.addEventListener("click", function() {
//     console.log("hello")
//     scoreboard.textContent = '';
// })

// addToScoreboard();

// function addToScoreboard () {
//     var lastInitials = localStorage.getItem("initials");
//     var lastScore = localStorage.getItem("score");
//     var scoreSet = `${lastInitials} - ${lastScore}`

// console.log(lastInitials);
// console.log(lastScore);
// console.log(scoreSet);

// var newScore = document.createElement("li");
// newScore.textContent = scoreSet;
// scoreboard.appendChild(newScore);

// }

var scores = [
    {
        user: 'Haley', 
        score: 12
    },
    {
        user: 'Toby',
        score: 45
    },
    {
        user: 'dad', 
        score: 77
    },
    {
        user: 'brenda',
        score: 5
    }
    
];
console.log(scores);

var sorted = scores.sort(function(a,b) {
    return b.score - a.score;
});

console.log(sorted)