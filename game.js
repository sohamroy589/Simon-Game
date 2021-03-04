
var buttonColors = ["red", "blue", "green", "yellow"];


var userChosenColor;
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var idx;

$(document).keypress(function () {
  if (level === 0) {
    nextSequence();
  }
});

$(".btn").on("click", function (event) {
  userChosenColor = event.currentTarget.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  if (idx < gamePattern.length && checkAnswer(idx)) {
    console.log("Success!");
    if (idx == gamePattern.length-1) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
    else idx++;
  }
  else {
    console.log("Failure!");
  }
});






// console.log(randomChosenColor);


function nextSequence() {
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  userClickedPattern = [];
  idx = 0;
  playSound(randomChosenColor);
  gamePattern.push(randomChosenColor);
  var button = $("#" + randomChosenColor);
  button.fadeOut(100).fadeIn(100);
  level++;
}

function playSound(key) {
  var audio = new Audio("sounds/" + key + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(idx) {
  if (gamePattern[idx] === userClickedPattern[idx]) {
    return true;
  }
  return false;
}
