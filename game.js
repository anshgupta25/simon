
var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];

var userClicked = [];

var started = false;

var level = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level "+ level);
        nextSequence();
        started = true;
    }
});

// a func to add add the buttons clicked by the user and add them to an Array
$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");

    userClicked.push(userChosenColor);

    playSound(userChosenColor);

    animatePressed(userChosenColor);

    checkAnswer((userClicked.length)-1);


});

// a func to check the answer of the user

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClicked[currentLevel]){
        console.log("sucess");

        if(gamePattern.length === userClicked.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
    
}



// a func to generate the next nextSequence
function nextSequence(){
    userClicked = [];

    level++;

    $("#level-title").text("level "+ level);
    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);


//1. Use jQuery to select the button with the same id as the randomChosenColour
$("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColor);

}


//  a func to play sound
function playSound(name){
    var audioPlay = new Audio("sounds/" + name +".mp3");
    audioPlay.play();
}

// a function to set a timeout for a class
function animatePressed(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed")
    },100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
// dectecting a keypress
// $(document).keypress(nextSequence)