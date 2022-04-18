var buttonColorArray = ["red", "green", "blue", "yellow"];

// Game Session Variables
var gameStarted = false;
var level = 0;
var bestScore = 0;

var buttonPressed = [];
var randomSequence = [];

$(document).keypress(function (e) { // Invoked when user presses any key
  if (!gameStarted && e.which === 13) { // Accept Keypress only if game has not already started. And only respond when the enter button is pressed
    gameStarted = true;
    $("h1").text("Level 1");
    setTimeout(() => { nextColor(); }, 500); // Wait for 500ms, then generate the next color sequence
  }
});

$("button").on("click", function () { // Invoked when the user clicks the mouse button
  if (gameStarted) { // Accept Click from the user only if game has already started.
    if (buttonPressed.length < randomSequence.length) { // If the user is not done clicking all the button in the randomSequence
      buttonPressed.push(this.id); // Register the user clicked button
      isCorrect = checkAnswer(buttonPressed.length - 1) // Check if the most recently clicked button by the user matches with the corresponding button in the randomSequence
      if (!isCorrect) { // If the most recently clicked button by the user doesnt match with the expected button
        return gameEnd(); // End the game
      }
      if (buttonPressed.length == randomSequence.length) { // If the user is done clicking all the buttons in sequence required to pass the current level 
        nextColor(); // Generate the next color and add in the randomSequence
      }
    }
  }
});

function nextColor() { // Generating the next color to be added in the random sequence
  resetButtonPressed(); // Before generating the next color to be added in the random sequence, reset the user entered sequence
  levelUp() // Increment the level
  randomNumber = generateRandomNumber(); // Generating a random number between 0 and 3 (inclusive)
  addColorToRandomSequence(randomNumber); // Adding the color corresponding to the <randomNumber> position in the buttonColorArray
  playSound(isNumber = true, randomNumber) // Play the sound corresponding to the button color
  animateButton(randomNumber) // Animate the button which is next in the randomSequence for user to see clearly 
}

function levelUp() {
  level = level + 1;
  $("h1").text("Level " + level); // Setting H1 text to show the current level
  if (level > bestScore) { // Update the best score of the user if its the new high score
    bestScore = level
    displayUpdatedBestScore()
  }
}

function displayUpdatedBestScore() {
  $("h2").text("Best Score : " + bestScore); // Setting H2 text to show the best score by the user
}

function checkAnswer(index) {
  if (buttonPressed[index] === randomSequence[index]) { // Check if the most recently clicked button by the user matches with the corresponding button in the randomSequence
    return true;
  } else {
    return false;
  }
}

// function which will lead to end of game
function gameEnd() {
  playSound(isNumber = false) // Play "Game End" Sound.

  $("body").addClass("game-over");
  $("#h1").text("Game Over, Press Any Key to Restart");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 1000);

  resetVars(); // Reset the Game Session Variables

  document.activeElement.blur() // After a game, the focus is on the last clicked button. So, when the user presses Enter Key to restart the game, it causes the invocation of the onClick Function of that button. this line removes the focus from the any active element after the end of a game. 
}

function playSound(isNumber = true, randomNumber) {
  if (isNumber) {
    var audio = new Audio("sounds/" + buttonColorArray[randomNumber] + ".mp3");
  } else {
    var audio = new Audio("sounds/wrong.mp3");
  }
  audio.play();
}

function animateButton(randomNumber) {
  // The whole color button disappears and appears back again 
  $("#" + buttonColorArray[randomNumber]).fadeIn(150).fadeOut(150).fadeIn(150)

  // Color inside the button changes from <color> to white and back to <color> all within 150ms
  $("#" + buttonColorArray[randomNumber]).addClass("pressed");
  setTimeout(function () {
    $("#" + buttonColorArray[randomNumber]).removeClass("pressed");
  }, 150);
}

function generateRandomNumber() {
  var randomNumber = Math.floor(Math.random() * 4);
  return randomNumber
}

function resetButtonPressed() {
  buttonPressed = [];
}

function addColorToRandomSequence(randomNumber) {
  randomSequence.push(buttonColorArray[randomNumber]);
}

function resetVars() {
  level = 0;
  gameStarted = false;
  buttonPressed = [];
  randomSequence = [];
}