var colors = ["green" , "red" , "blue" , "yellow"] ;
var gamePattern = [] ;
var usersClickedPattern = [];
var level = 0 ;
var started = false ;


$(document).on("keydown" , function () {
    if (!started) {
        started = true ;
        nextSequence ();
        $("#level-title").html("Level " + level) ;
    }
})



function nextSequence () {
    usersClickedPattern = [] ;
    level++ ;
    $("#level-title").html("Level " + level) ;
    var randomIndex = Math.floor(Math.random() * 4 ) ;
    var randomColorChosen = colors[randomIndex] ;
    gamePattern.push(randomColorChosen) ;
    $("#" + randomColorChosen).fadeIn(100).fadeOut(100).fadeIn(100) ;
    playSound(randomColorChosen) ;
    animatePressed(randomColorChosen) ;
}

$(".btn").on("click" , function () {
    var usersChosenColor = $(this).attr("id") ;
    usersClickedPattern.push(usersChosenColor) ;
    playSound(usersChosenColor) ;
    animatePressed(usersChosenColor) ;
    checkAnswer(usersClickedPattern.length-1) ; 
})

function checkAnswer (currentLevel) {
    if (gamePattern[currentLevel] === usersClickedPattern[currentLevel]) {
        console.log("succeed") ;

        if(gamePattern.length === usersClickedPattern.length) {
            setTimeout(function () {
                nextSequence ()
            } ,1000 ) ;
        }
    } else {
        var lostAudio = new Audio('sounds/wrong.mp3') ;
        lostAudio.play () ;

        $("body").addClass("game-over") ;
        setTimeout(function () {
            $("body").removeClass("game-over") ;
        } , 200) ;

        $("#level-title").html("Game Over, Press Any Key To Restart")
         
        startOver () ;
    }

}


function startOver () {
    level = 0 ;
    gamePattern = [] ;
    started = false ;
}

function playSound (name) {
    var audio = new Audio("sounds/" + name + ".mp3") ;
    audio.play() ;
}

function animatePressed (currentColor) {
    $("#" + currentColor).addClass("pressed") ;
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed") ;        
    }, 100);
}


