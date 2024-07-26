var level = 0;
$(document).keypress(function(){
    if(level===0){
        nextSequence();
    }
})

var highScore = 0;

function playSound(x){
switch(x){
    case 0:
        var audio = new Audio("sounds/green.mp3");
        audio.play();
        break;
    
    case 1:
        var audio = new Audio("sounds/red.mp3");
        audio.play();
        break;
    case 2:
        var audio = new Audio("sounds/yellow.mp3");
        audio.play();
        break;
    
    case 3:
        var audio = new Audio("sounds/blue.mp3");
        audio.play();
        break;
}};

var buttoncolors = ["green","red","yellow","blue"];
var gamePattern = [];
var userClickedPattern = [];
function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttoncolors[randomNumber];
    gamePattern.push(randomChosenColor);
    level++;
    $("#level-title").text("Level "+level);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomNumber);
}
$(".btn").click(function(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    $("#"+userChosenColor).addClass("pressed");
    setTimeout(function(){
        $("#"+userChosenColor).removeClass("pressed");
    },100)
    playSound(buttoncolors.indexOf(userChosenColor));
    checkAnswer();
})

function checkAnswer(){
    if(userClickedPattern[userClickedPattern.length-1]===gamePattern[userClickedPattern.length-1]){
        if(userClickedPattern.length===gamePattern.length){
            userClickedPattern =[]
            setTimeout(function(){
                nextSequence()
            },500-level)
        }

    }
    else{
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over")
        $("h1").text("Game Over!");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        if(level>highScore){
            highScore = level-1;
            $("#high-score").text("High Score : "+highScore);
        }
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
    }

}




