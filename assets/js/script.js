
// 2-dimensional array with quiz questions, 
//last integer alternative is the correct answer key
let quizContent =
  ["Commonly used data types DO Not include:",
    [
      "strings",
      "booleans",
      "alerts",
      "numbers",
      3
    ],

    "The condition in an if / else statement is inclosed with __________.",
    [
      "quotes",
      "curly brackets",
      "parenthesis",
      "square brackets",
      3
    ],
    "Arrays in JavaScript can be used to store ___________.",
    [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
      4
    ],
    "String values must be enclosed within _______ when being assigned to variables.",
    [
      "commas",
      "curly brackets",
      "quotes",
      "parenthesis",
      3
    ],
    "A very useful tool used during development and debugging for printing content to the debugger is:",
    [
      "JavaScript",
      "terminal/bash",
      "for loops",
      "console log",
      4
    ]
  ];

// pointers to CSS variables
let viewScores = document.querySelector("#viewScores"); // upper left link to view the scores
let timer = document.querySelector("#timer"); // string with the timer value
let title = document.querySelector("#title"); // first title on the page
let button1 = document.querySelector("#button1"); // 4 buttons with the quiz answers
let button2 = document.querySelector("#button2");
let button3 = document.querySelector("#button3");
let button4 = document.querySelector("#button4");
let trueResult = document.querySelector("#trueResult"); // Wrong / correct status message
let buttonStart = document.querySelector("#buttonStart"); // button to start the quiz
let message1 = document.querySelector("#message1"); // your final score message
let input1 = document.querySelector("#input1"); // your initials input
let buttonSubmit = document.querySelector("#buttonSubmit"); // button to submit the input1 initials
let scores = document.querySelector("#scores"); // list with the highest scores
let buttonGoBack = document.querySelector("buttonGoBack");
let buttonClearScores = document.querySelector("buttonClearScores");

// timer function, secondsLeft is the integer for how many seconds to run
let runTimer = function (secondsLeft) {
  // Sets interval in variable
  let timerInterval = setInterval(function () {
    secondsLeft--;
    timer.textContent = "Time: " + secondsLeft; // updates timer on the page
    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      // Calls function to display the quiz score
      return;
    }

  }, 1000);
}

// This function is being called below and will run when the page loads.
let init = function () {
  runTimer(20);
}

// Calls init to retrieve data and render it to the page on load
init();