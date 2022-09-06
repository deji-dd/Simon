var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []
var started = false
var level = 0


$(document).keypress(function() {
  if (!started) {
    $("h1").text("Level " + level)
    nextSequence()
    started = true
  } else {}
})

$(".btn").click(function(event) {
  var userChosenColour = this.id
  animatePress(userChosenColour)
  userClickedPattern.push(userChosenColour)
  playSound(userChosenColour)
  checkAnswer(userClickedPattern[-1])
})

function checkAnswer(currentLevel) {
  if (gamePattern.length !== userClickedPattern.length) {} else if (JSON.stringify(gamePattern) == JSON.stringify(userClickedPattern)) {
    console.log("success")
    setTimeout(nextSequence, 1000)
    userClickedPattern = []
  } else {
    playSound("wrong")
    console.log("wrong")
    $("body").addClass("game-over")
    $("h1").text("Game Over, Press Any Key to Restart")
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver()
  }
}


function nextSequence() {
  userClickedPattern = []
  $("h1").text("Level " + level)
  level += 1
  var randomNumber = Math.floor(Math.random() * 4)
  var randomChosenColour = buttonColours[randomNumber]
  gamePattern.push(randomChosenColour)
  $("#" + randomChosenColour).fadeTo(100, 0.3, function() {
    $(this).fadeTo(100, 1.0);
  })
  playSound(randomChosenColour)
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed").delay(100).queue(function(next) {
    $("." + currentColour).removeClass("pressed");
    next();
  })
}

function playSound(name) {
  new Audio("sounds/" + name + ".mp3").play();
}

function startOver() {
  level = 0
  gamePattern = []
  started = false
}
