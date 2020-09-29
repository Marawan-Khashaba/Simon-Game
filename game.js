
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function() {
  var userChoosenColour = $(this).attr("id");
  userClickedPattern.push(userChoosenColour);
  playSound(userChoosenColour);
  animatePress(userChoosenColour);
  //nextSequence();
  checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {


    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");


    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 300);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();

  }
}


// add random color to game pattern
function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);



  var randomNumber = Math.floor((Math.random() * 4)); // create random number from 0-3
  var randomChosenColour = buttonColours[randomNumber]; // choose random color
  gamePattern.push(randomChosenColour); //add this color to gamepattern


  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


function startOver(){
 started = false;
 level = 0;
 gamePattern = [];
}
