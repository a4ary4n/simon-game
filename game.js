const buttonColors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let playerLevel = 0;
let gameStarted = false;

const body = $("body");

const playSound = (color) => {
  const audio = new Audio(`sounds/${color}.mp3`);
  audio.play();
};

const animatePress = (currentColor) => {
  const chosenButton = $(`#${currentColor}`);
  // console.log(chosenButton);
  chosenButton.addClass("pressed");
  setTimeout(() => {
    chosenButton.removeClass("pressed");
  }, 100);
};

const nextSequence = () => {
  $("#level-title").text(`Level ${level}`);
  level++;

  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  animatePress(randomChosenColor);

  playSound(randomChosenColor);
};

const checkAnswer = (currentLevel) => {
  for (let i = 0; i < currentLevel; i++) {
    if (userClickedPattern[i] !== gamePattern[i]) {
      // alert("wrong");
      // console.log("wrong");
      return false;
      break;
    }
  }
  console.log("success");
  return true;
};

const nextLevel = () => {
  userClickedPattern = [];
  playerLevel = 0;
  setTimeout(() => {
    gameStarted = true;
    nextSequence();
  }, 1000);
};

const resetGame = () => {
  body.addClass("game-over");
  setTimeout(() => {
    $("#level-title").text("Game Over! Press a key to start again");
    playSound("wrong");
    body.removeClass("game-over");
  }, 300);
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  playerLevel = 0;
  gameStarted = false;
};

// $(".btn").click(function() {
//   const chosenColorId = $(this).attr("id");
//   console.log(chosenColorId);
// });

$(".btn").click((event) => {
  const userClickedColor = event.currentTarget.id;
  animatePress(userClickedColor);
  if (gameStarted) {
    playSound(userClickedColor);
    userClickedPattern.push(userClickedColor);
    playerLevel++;
    if (playerLevel === level) {
      const passFail = checkAnswer(playerLevel);
      passFail ? nextLevel() : resetGame();
    }
  } else {
    body.addClass("game-over");
    setTimeout(() => {
      playSound("wrong");
      body.removeClass("game-over");
    }, 150);
  }
});

$(document).keypress((e) => {
  // console.log(e.key);
  if (!gameStarted) {
    gameStarted = true;
    nextSequence();
  }
});
