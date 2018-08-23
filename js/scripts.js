// Business logic

// Get a random number between 1 and 6
function dieRoll() {
  var rand = Math.floor((Math.random() * 6) + 1);
  return rand;
};

// Initialize players
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

// Constructor function for Player objects, not used.
function Player(name, cpu) {
  this.name = name;
  this.currentRd = 0;
  this.gameTotal = 0;
  this.computerPlayer = cpu;
}

// Function to change designated player from player 1 to player 2, and vice versa.
function switchCurrentPlayer(player1, player2, activePlayer) {
  if (activePlayer === player1) {
    return player2;
  } else if (activePlayer === player2) {
    return player1;
  }
};








// User interface logic

// Change direction of Active Player arrow after switching the current player
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

  // Roll a die, add total to player's total if result is 2-6, end round, zero out score and pass turn to next player if the result is 1.
  function rollADie() {
    $("#die-image").text("");
    var newDieRoll = dieRoll();
    $("#die-roll-result").text(newDieRoll);
    if (currentPlayer === playerOne) {
      $("#player-1-rolls").append(" " + newDieRoll + " ");
    } else if (currentPlayer === playerTwo) {
      $("#player-2-rolls").append(" " + newDieRoll + " ");
    }
    if (newDieRoll === 1) {
      $("#die-image").fadeOut();
      $("#die-image").append("<img src='img/die1.png'>");
      $("#die-image").fadeIn();
      currentPlayer.currentRd = 0;
      passToNextPlayer();
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
    return newDieRoll;
  }

  // Add round total to game total, zero out round total, pass to next player, check if next player is a computer player, and execut computer logic for computer player if so.
  function passToNextPlayer() {
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
      gameEnd = true;
      $("#winner-name").text(currentPlayer.name);
      $("#winner").show();
      $("#die-roll-button").hide();
      $("#die-hold-button").hide();
    }
    currentPlayer = switchCurrentPlayer(playerOne, playerTwo, currentPlayer);
    changePlayerDisplay(playerOne, playerTwo, currentPlayer);

    if (currentPlayer === playerOne) {
      $("#player-1-rolls").text("");
    } else if (currentPlayer === playerTwo) {
      $("#player-2-rolls").text("");
    }

    if (currentPlayer.computerPlayer === true) {
      computerBehavior();
    }
  }

  // Computer logic. Computer will roll if their current round score is less than 20, and will hold if round score is 20 or better, then pass to the next player.
  function computerBehavior() {
    if (gameEnd === true) {
      return "The game is over, I quit."
    } else {
      var computerRollCount = 0;
      while (currentPlayer.currentRd < 20) {
        computerRollCount += 1
        var nextCPUroll = rollADie();
        if (nextCPUroll === 1) {
          break;
        }
      } if (currentPlayer.currentRd >= 20) {
        passToNextPlayer();
      }
    }
  }

  // Form that displays on page load that gets player names and whether the player is human or computer, then displays the rest of the page after submission.
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
    $("#player-1-name").text(playerOne.name);
    $("#active-player-name").text(playerOne.name);
    $("#player-2-name").text(playerTwo.name);
    $("#pig-dice").toggleClass("hide");
    $("#enter-name").toggleClass("hide");
    if (playerOne.computerPlayer === true) {
      computerBehavior();
    }
    if (playerOne.computerPlayer === true && playerTwo.computerPlayer === true) {
      $("#die-roll-display").hide();
    }
  })

  // Initialize the game

  var currentPlayer = playerOne;
  changePlayerDisplay(playerOne, playerTwo, currentPlayer);
  $("#player-1-game-total").text(playerOne.gameTotal);
  $("#player-2-game-total").text(playerTwo.gameTotal);
  var gameEnd = false;

  // Human player can execute the rollADie function by clicking the "Roll" button.
  $("#die-roll-button").click(function() {
    rollADie();
  });

  // Human player can pass to the next player when clicking the "Hold" button
  $("#die-hold-button").click(function() {
    passToNextPlayer();
  })

  // Button in final Winner panel that resets game totals and allows players to play another game without refreshing the page and re-entering their information.
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
    gameEnd = false;
    if (playerOne.computerPlayer === true) {
      computerBehavior();
    }
  })
})
