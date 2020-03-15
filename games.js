buttonColors = ["red", "blue", "green", "yellow"];

gamePattern = [];
myPattern = [];

var started=false;
var level = 0;

$(document).keypress(function(event) {
  if(!started){
    nextSequence()
    started=true;
  }
  });

$(".btn").click(function() {
  if(started){
    var userChosenColor = $(this).attr("id");
    playsound(userChosenColor);
    animatePress(userChosenColor);
    myPattern.push(userChosenColor);
    checkAnswer(myPattern.length-1);
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel]===myPattern[currentLevel]) {
    if (gamePattern.length===myPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 600);
    }
  }else{
    playsound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    gameOver();
    $("h1").text("Game Over, Press Any Key to Restart");

    }

}


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playsound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function nextSequence() {

    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

    var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
    audio.play();

    myPattern = [];

}

function gameOver(){
  started=false;
  level=0;
  gamePattern=[];
}
