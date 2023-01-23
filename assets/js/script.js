
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
    answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    correct: 4
  },
  {
    question: "String values must be enclosed within _______ when being assigned to variables.",
    answers: ["commas", "curly brackets", "quotes", "parenthesis",],
    correct: 3
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: ["JavaScript", "terminal/bash", "for loops", "console log"],
    correct: 4
  }
];

//array of objects with initials and scores
let scoresContent = [
  {
    initials: "AB",
    score: -1
  }
];
scoresContent.length = 0;

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
let buttonBack = document.getElementById("buttonBack");
let buttonClearScores = document.getElementById("buttonClearScores");
let secondsLeft = 50; // seconds for the timer
let questionId = 0; // current question number
let userScore = 0; // quiz score
let timerInterval = 0; //timer interval for runTimer 

// timer, secondsLeft is the integer for how many seconds to run
let runTimer = function () { // setinterval calls this function every 1000 milliseconds
  // Sets interval in variable
  timerInterval = setInterval(function () {
    secondsLeft--;
    timer.textContent = "Time: " + secondsLeft; // updates timer on the page
    if (secondsLeft === 0) {
      clearInterval(timerInterval); // clears the timer - beware of recursive behaviour
      // Calls function to display the quiz score - end of game
      endOfQuiz ();
      return;
    }
  }, 1000);
}

// displays quiz questions
let displayQuizQuestion = function (i) {
  
  title.textContent = quizContent[i].question; // display the question
  button1.textContent = quizContent[i].answers[0]; // update buttons
  button2.textContent = quizContent[i].answers[1];
  button3.textContent = quizContent[i].answers[2];
  button4.textContent = quizContent[i].answers[3];
}

// validates questions
let quizQuestionValidate = function (button, buttonId) {
  // button - DOM button descriptor; buttonId shows the answer selection
  if (quizContent[questionId].correct === buttonId) { // correct answer
    trueResult.textContent = "Correct!"; // set the message value    
    userScore++; //increase user score  
  } else { // incorrect answer
    trueResult.textContent = "Wrong!";
    secondsLeft = secondsLeft - 10; // decrease the timer
  }
  trueResult.setAttribute("style", "display: flex"); // display the right/wrong message
  questionId++; 
  if (questionId === quizContent.length) { // end of quiz questions
    clearInterval(timerInterval); // stops the timer
    endOfQuiz();
  } else { // proceed to the next question
    displayQuizQuestion(questionId); // display the question by Id
  }
}

// prints high scores list
let viewHighScores = function(){
  userScore = 0; // reset the user score
  while (scores.children.length > 0) { // clear the list of scores in DOM
    scores.removeChild(scores.firstChild);
  }
  for (let j = 0; (j < scoresContent.length)&&(j < 5); j++) { // add first 8 list items with the scores
    let li = document.createElement("li");
    let i = j + 1;
    li.textContent = i + ". " + scoresContent[j].initials + " - " + scoresContent[j].score;
    scores.appendChild(li); // append the list of items with the initials and scores
  }
  title.textContent = "High Scores";
  box2.setAttribute("style", "display: none"); // hide box2
  box3.setAttribute("style", "display: none"); // hide box3
  box4.setAttribute("style", "display: none"); // hide box4
  box8.setAttribute("style", "display: flex"); // switch on box8
}

// takes the initials input, sort the highest scores and calls to print
let manageInput = function () {
  let i = -2; // user score position in the scores array
  if (scoresContent === []) { // this is the newly declared array
    scoresContent[0] = { initials: input1.value, score: userScore };
  } else {
    for ( let j = 0; ((j < scoresContent.length) && (i !== (j-1))); j++ ) {
      if (scoresContent[j].score < userScore) {
        scoresContent.splice(j, 0, { initials: input1.value, score: userScore });
        i = j;
      }
    }
    if (i === -2) { // the user has the lowest score, push to the end of the array
      scoresContent.push({ initials: input1.value, score: userScore });
    }
  }
  viewHighScores (); // prints the high scores in box8; resets timer and other values
}

let endOfQuiz = function () { // prints the final score
  title.textContent = "All done!";
    message1.textContent = "Your final score is " + userScore + "."; // update user score
    box2.setAttribute("style", "display: none"); // hide box2
    box4.setAttribute("style", "display: flex"); // switch on box4 - input initials and score
}

// This function is being called below and will run when the page loads.
let init = function () {

  title.textContent = "Coding Quiz Challenge"; // reset the title on a page

}

// Calls init to retrieve data and render it to the page on load
init();

buttonStart.addEventListener("click", function () { // listen to start the quiz
  clearInterval(timerInterval);
  runTimer(secondsLeft); // starts the timer, secondsLeft defined globally
  trueResult.setAttribute("style", "display: none"); //hide correct/wrong header
  box3.setAttribute("style", "display: none"); // hide the box3
  box2.setAttribute("style", "display: flex"); // display the box2
  displayQuizQuestion(questionId); // display the question by Id
}); // end of button start listener

button1.addEventListener("click", function () { // listen for the button click
  quizQuestionValidate(button1, 1); // validates the answer
}); // end of button listener

button2.addEventListener("click", function () { // listen for the button click
  quizQuestionValidate(button2, 2); // validates the answer
}); // end of button listener

button3.addEventListener("click", function () { // listen for the button click
  quizQuestionValidate(button3, 3); // validates the answer
}); // end of button listener

button4.addEventListener("click", function () { // listen for the button click
  quizQuestionValidate(button4, 4); // validates the answer
}); // end of button listener

buttonSubmit.addEventListener("click", function () { // inputs initials for scoring
  manageInput(); // captures initials and manages the highest scores
}); // enf of submit initials code

buttonClearScores.addEventListener("click", function () { //removing scores as per user request
  scoresContent.length = 0;
  userScore = 0;
  while (scores.children.length > 0) { // clear the list of scores in DOM
    scores.removeChild(scores.firstChild);
  }
}); // end of clear scores code

buttonBack.addEventListener("click", function () { // start another quiz
  questionId = 0;
  secondsLeft = 50;
  userScore = 0;
  title.textContent = "Coding Quiz Challenge";
  trueResult.setAttribute("style", "display: none"); //hide correct/wrong header
  box8.setAttribute("style", "display: none"); // hide box8
  box3.setAttribute("style", "display: flex"); // display the box3
}); // end of go back button click event code

viewScores.addEventListener("click", function() { // displays highest scores, resets timer
  
  clearInterval(timerInterval); // stops the timer
  viewHighScores(); //prints high scores

}); // end of view high scores link click event code