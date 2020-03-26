patter =["green","red","yellow","blue"];

gamePattern=[];
myPattern=[];

var started=false;
var level=0;

$(document).keypress(function(event){
  if (!started) {
    nextSequence();
    started="true";
  }
});

$(".btn").click(function(event){
  if (started) {
    var mio=$(this).attr("id");
    myPattern.push(mio);
    mySequence(myPattern.length-1);
    soundColor(mio);
  }
});

function soundColor(mio){
  var audio=new Audio("sounds/"+mio+".mp3");
  audio.play();
  $("#"+mio).addClass("pressed");
  setTimeout(function(){$("#"+mio).removeClass("pressed");},200);
};

function mySequence(currentLevel){
  if (gamePattern[currentLevel]===myPattern[currentLevel]) {
    if (gamePattern.length===myPattern.length) {
        setTimeout(function(){nextSequence();},800);
    }
  } else {
    gameOver();
  }
};

function gameOver(){
  $("body").addClass("game-over");
  setTimeout(function(){$("body").removeClass("game-over");},300);
  var audio=new Audio("sounds/wrong.mp3");
  audio.play();
  gamePattern=[];
  myPattern=[];
  started=false;
  level=0;
  $("h1").text("Game Over, Press any key to start the game");
}

function nextSequence(){
  level++;
  $("h1").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var color=patter[randomNumber];
  gamePattern.push(color);
  $("#"+color).fadeOut().fadeIn();
  var audio = new Audio("sounds/"+color+".mp3");
  audio.play();
  myPattern=[];
}
