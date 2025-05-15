var colors = ["green", "red", "blue", "yellow"];
var gamePattern = [];
var usersClickedPattern = [];
var level = 0;
var started = false;

$("#start-btn").on("click", function () {
    if (!started) {
        started = true;
        level = 0;
        gamePattern = [];
        usersClickedPattern = [];
        nextSequence();
        $("#level-title").text("Level " + level);
    }
});

$("#restart-btn").on("click", function () {
    startOver();
    $("#level-title").text("Press Start to Begin");
});

function nextSequence() {
    usersClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomIndex = Math.floor(Math.random() * 4);
    var randomColorChosen = colors[randomIndex];
    gamePattern.push(randomColorChosen);

    $("#" + randomColorChosen).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColorChosen);
    animatePressed(randomColorChosen);
}

$(".btn").on("click", function () {
    if (!started) return; // prevent clicking before start

    var userChosenColor = $(this).attr("id");
    usersClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePressed(userChosenColor);
    checkAnswer(usersClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === usersClickedPattern[currentLevel]) {
        if (usersClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over! Press Restart");
        started = false;
    }
}

function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
    usersClickedPattern = [];
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePressed(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function () {
        $("#" + color).removeClass("pressed");
    }, 100);
}
