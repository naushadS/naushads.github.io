var buttonColorArray = ["red", "green", "blue", "yellow"];
var level = 0;
var gameStarted = false;
var buttonPressed = [];
var randomSequence = [];


$(document).keypress(function (e) {
  if (!gameStarted && e.which === 13) { //Accept Keypress only if game has not already started. And only respond when the enter button is pressed
    gameStarted = true;
    $("h1").text("Level 1");
    setTimeout(() => {nextColor();}, 500);
  }
});

$("button").on("click",function () {
  if (gameStarted) {
    if (buttonPressed.length < randomSequence.length) {
      buttonPressed.push(this.id);
      isCorrect = checkAnswer(buttonPressed.length-1)
      if (!isCorrect) {
        gameEnd();
        return;
      }
      if (buttonPressed.length == randomSequence.length) {
        nextColor();
      }
    } else {
      nextColor();
    }
  } else {
    return false;
  }
});

function nextColor() {
  resetButtonPressed();
  levelUp()
  randomNumber = generateRandomNumber();
  addColorToRandomSequence(randomNumber);
  playSound(isNumber = true, randomNumber)
  animateButton(randomNumber)
}

function levelUp() {
  level = level + 1;
  $("h1").text("Level " + level);
}

function checkAnswer(index) {
  if (buttonPressed[index] === randomSequence[index]) {
    return true;
  } else {
    return false;
  }
}

// function which will lead to end of game
function gameEnd() {
  playSound(isNumber = false)

  $("body").addClass("game-over");
  $("#h1").text("Game Over, Press Any Key to Restart");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 1500);

  resetVars();

  document.activeElement.blur()
}

function playSound(isNumber=true, randomNumber) {
  if (isNumber) {
    var audio = new Audio("sounds/" + buttonColorArray[randomNumber] + ".mp3");
  } else {
    var audio = new Audio("sounds/wrong.mp3");
  }
  audio.play();
}

function animateButton(randomNumber) {
  $("#" + buttonColorArray[randomNumber]).fadeIn(2000).fadeOut(2000).fadeIn(2000)

  //color inside the button becomes white
  $("#" + buttonColorArray[randomNumber]).addClass("pressed");
  setTimeout(function () {
    $("#" + buttonColorArray[randomNumber]).removeClass("pressed");
  }, 150);
}

function generateRandomNumber() {
  var randomNumber = Math.floor(Math.random() * 4);
  return randomNumber
}

function resetButtonPressed(){
  buttonPressed = [];
}

function addColorToRandomSequence(randomNumber){
  randomSequence.push(buttonColorArray[randomNumber]);
}

function resetVars(){
  level = 0;
  gameStarted = false;
  buttonPressed = [];
  randomSequence = [];
}