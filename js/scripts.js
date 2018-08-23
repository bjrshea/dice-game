// Business logic

function dieRoll() {
  var rand = Math.floor((Math.random() * 6) + 1);
  return rand;
};

var playerOne = {
  name: "Player One",
  currentRd: 0,
  gameTotal: 0,
  computerPlayer: false
};

var playerTwo = {
  name: "Player Two",
  currentRd: 0,
  gameTotal: 0,
  computerPlayer: false
};

function Player(name, cpu) {
  this.name = name;
  this.currentRd = 0;
  this.gameTotal = 0;
  this.computerPlayer = cpu;
}

function switchCurrentPlayer(player1, player2, activePlayer) {
  if (activePlayer === player1) {
    return player2;
  } else if (activePlayer === player2) {
    return player1;
  }
};








// User interface logic

function changePlayerDisplay(player1, player2, activePlayer) {
  // $("#active-player-arrow").text("");
  if (activePlayer === player1) {
    $("#active-player-arrow").html("<img src='img/arrow-left.png'>");
    $("#active-player-name").text(playerOne.name);
  } else if (activePlayer === player2) {
    $("#active-player-arrow").html("<img src='img/arrow-right.png'>");
    $("#active-player-name").text(playerTwo.name);
  }
};

$(document).ready(function() {
  $("#enter-name").submit(function(event) {
    event.preventDefault();

    var player1Name = $("#player1-name").val();
    var player2Name = $("#player2-name").val();
    playerOne.name = player1Name;
    playerTwo.name = player2Name;
    var player1cpu = $("input[type=checkbox][name=player-1-cpu]:checked").val();
    var player2cpu = $("input[type=checkbox][name=player-2-cpu]:checked").val();
    if (player1cpu === "true") {
      playerOne.computerPlayer = true;
    }
    if (player2cpu === "true") {
      playerTwo.computerPlayer = true;
    }
    console.log(playerOne.computerPlayer, playerTwo.computerPlayer);
    $("#player-1-name").text(playerOne.name);
    $("#active-player-name").text(playerOne.name);
    $("#player-2-name").text(playerTwo.name);
    $("#pig-dice").toggleClass("hide");
    $("#enter-name").toggleClass("hide");
  })

  var currentPlayer = playerOne;
  changePlayerDisplay(playerOne, playerTwo, currentPlayer);

  $("#player-1-game-total").text(playerOne.gameTotal);
  $("#player-2-game-total").text(playerTwo.gameTotal);
  $("#die-roll-button").click(function() {
    $("#die-image").text("");
    var newDieRoll = dieRoll();
    $("#die-roll-result").text(newDieRoll);
    if (newDieRoll === 1) {
      $("#die-image").fadeOut();
      $("#die-image").append("<img src='img/die1.png'>");
      $("#die-image").fadeIn();
      currentPlayer.currentRd = 0;
      if (currentPlayer === playerOne) {
        $("#player-1-round-score").text(currentPlayer.currentRd);
      } else if (currentPlayer === playerTwo) {
        $("#player-2-round-score").text(currentPlayer.currentRd);
      }
      currentPlayer = switchCurrentPlayer(playerOne, playerTwo, currentPlayer);
      changePlayerDisplay(playerOne, playerTwo, currentPlayer);
    } else {
      currentPlayer.currentRd = currentPlayer.currentRd + newDieRoll;
      if (currentPlayer === playerOne) {
        $("#player-1-round-score").text(currentPlayer.currentRd);
      } else if (currentPlayer === playerTwo) {
        $("#player-2-round-score").text(currentPlayer.currentRd);
      }
      if (newDieRoll === 2) {
        $("#die-image").fadeOut();
        $("#die-image").append("<img src='img/die2.png'>");
        $("#die-image").fadeIn();
      } else if (newDieRoll === 3) {
        $("#die-image").fadeOut();
        $("#die-image").append("<img src='img/die3.png'>");
        $("#die-image").fadeIn();
      } else if (newDieRoll === 4) {
        $("#die-image").fadeOut();
        $("#die-image").append("<img src='img/die4.png'>");
        $("#die-image").fadeIn();
      } else if (newDieRoll === 5) {
        $("#die-image").fadeOut();
        $("#die-image").append("<img src='img/die5.png'>");
        $("#die-image").fadeIn();
      } else if (newDieRoll === 6) {
        $("#die-image").fadeOut();
        $("#die-image").append("<img src='img/die6.png'>");
        $("#die-image").fadeIn();
      }
    }
  })
  $("#die-hold-button").click(function() {
    currentPlayer.gameTotal = currentPlayer.gameTotal + currentPlayer.currentRd;
    if (currentPlayer === playerOne) {
      $("#player-1-game-total").text(currentPlayer.gameTotal);
      $("#player-1-round-score").text(0);
    } else if (currentPlayer === playerTwo) {
      $("#player-2-game-total").text(currentPlayer.gameTotal);
      $("#player-2-round-score").text(0);
    }
    currentPlayer.currentRd = 0;

    if (currentPlayer.gameTotal >= 100) {
      $("#winner-name").text(currentPlayer.name);
      $("#winner").show();
      $("#die-roll-button").hide();
      $("#die-hold-button").hide();
    }

    currentPlayer = switchCurrentPlayer(playerOne, playerTwo, currentPlayer);
    changePlayerDisplay(playerOne, playerTwo, currentPlayer);
  })
  $("#play-again-button").click(function() {
    playerOne.currentRd = playerTwo.currentRd = 0;
    playerOne.gameTotal = playerTwo.gameTotal = 0;
    currentPlayer = playerOne;
    changePlayerDisplay(playerOne, playerTwo, currentPlayer);
    $("#die-roll-button").show();
    $("#die-hold-button").show();
    $("#player-1-game-total").text("0");
    $("#player-2-game-total").text("0");
    $("#winner").hide();
  })
})
