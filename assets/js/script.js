
// array of objects with quiz questions, 
let quizContent = [
  {
    question: "Commonly used data types DO Not include:",
    answers: ["strings", "booleans", "alerts", "numbers"],
    correct: 3
  },
  {
    question: "The condition in an if / else statement is inclosed with __________.",
    answers: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    correct: 3
  },
  {
    question: "Arrays in JavaScript can be used to store ___________.",
    answers: [ "numbers and strings", "other arrays", "booleans", "all of the above"],
    correct: 4
  },
  {
    question: "String values must be enclosed within _______ when being assigned to variables.",
    answers: [ "commas", "curly brackets", "quotes", "parenthesis",],
    correct: 3
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: [ "JavaScript", "terminal/bash", "for loops", "console log" ],
    correct: 4
  }
];

// pointers to CSS variables
let viewScores = document.querySelector("#viewScores"); // upper left link to view the scores
let timer = document.querySelector("#timer"); // string with the timer value
let title = document.querySelector("#title"); // first title on the page
let button1 = document.querySelector("#button1"); // 4 buttons with the quiz answers
let button2 = document.querySelector("#button2");
let button3 = document.querySelector("#button3");
let button4 = document.querySelector("#button4");
let box2 = document.querySelector("#box2");
let box3 = document.querySelector("#box3");
let box4 = document.querySelector("#box4");
let box8 = document.querySelector("#box8");
let trueResult = document.querySelector("#trueResult"); // Wrong / correct status message
let buttonStart = document.querySelector("#buttonStart"); // button to start the quiz
let message1 = document.querySelector("#message1"); // your final score message
let input1 = document.querySelector("#input1"); // your initials input
let buttonSubmit = document.querySelector("#buttonSubmit"); // button to submit the input1 initials
let scores = document.querySelector("#scores"); // list with the highest scores
let buttonGoBack = document.querySelector("buttonGoBack");
let buttonClearScores = document.querySelector("buttonClearScores");
let secondsLeft = 100; // seconds for the timer
let questionId = 0; // current question number

// timer function, secondsLeft is the integer for how many seconds to run
let runTimer = function (secondsLeft) {
  // Sets interval in variable
  let timerInterval = setInterval(function () {
    secondsLeft--;
    timer.textContent = "Time: " + secondsLeft; // updates timer on the page
    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      // Calls function to display the quiz score - end of game

      return;
    }
  }, 1000);
}

// function to run the quiz questions
let displayQuizQuestion = function (i) {
  title.textContent = quizContent[i].question; // display the question
  button1.textContent = quizContent[i].answers[0]; // update buttons
  button2.textContent = quizContent[i].answers[1];
  button3.textContent = quizContent[i].answers[2];
  button4.textContent = quizContent[i].answers[3];
}

// This function is being called below and will run when the page loads.
let init = function () {

  // Add event listener to start the quiz and timer once user presses the button
  buttonStart.addEventListener("click", function () {
    // starts the timer and calls another function to display quiz 
    secondsLeft = 20;
    runTimer(secondsLeft);
    trueResult.setAttribute("style", "display: none"); //hide correct/wrong header
    box3.setAttribute("style", "display: none"); // hide the box3
    box2.setAttribute("style","display: flex"); // display the box2

    displayQuizQuestion(questionId); // display the question by Id

    button1.addEventListener("click", function () { // listen for the button click
      button1.setAttribute("style", "background-color: var(--viewScoresTextColor)"); // change button background
      if (quizContent[questionId].correct === 1) { // correct answer
        trueResult.textContent = "Correct!"; // set the message value      
      } else { // incorrect answer
        trueResult.textContent = "Wrong!";
        secondsLeft = secondsLeft - 10; // decrease the timer
      }
      trueResult.setAttribute("style","display: flex"); // display the message
      questionId --;
      if (questionId < 0) {return;} // end of the quiz
    }); // end of button1 listener

  }); // end of button start listener
}

// Calls init to retrieve data and render it to the page on load
init();