// Object Oriented Guessing Game
function GuessingGame() {
  this.playersGuess = 0,
  this.winningNumber = Math.floor(Math.random() * 100 + 1),
  this.guessesRemaining = 10,
  this.previousGuesses = [];
}

// Fetch the Players Guess

GuessingGame.prototype.getPlayersGuess = function() {
  this.playersGuess = +document.getElementById("guessInput").value;
}

// Check if the number has been guessed already

GuessingGame.prototype.catchRepeat = function() {
  return this.previousGuesses.indexOf(this.playersGuess) > -1;
}

// Check if the input is valid

GuessingGame.prototype.numIsValid = function() {
  return this.playersGuess >= 1 && this.playersGuess <= 100 && this.playersGuess % 1 === 0;
}

// Determine if the next guess should be a lower or higher number

GuessingGame.prototype.lowerOrHigher = function() {
    if (this.playersGuess < this.winningNumber) {
      return this.playersGuess + " is too small";
    } else if (this.playersGuess > this.winningNumber) {
      return this.playersGuess + " is too large";
    } else if (this.playersGuess === this.winningNumber) {
      return this.playersGuess + " is perfect!";
    }
}

// Check if the Player's Guess is the winning number 

GuessingGame.prototype.checkGuess = function(){
  if (this.playersGuess === this.winningNumber) {
    this.previousGuesses.push(this.playersGuess);
    return "You win the grand prize! Reset to play again.";
  } else if (this.catchRepeat()) {
    return "You already guessed " + this.playersGuess.toString() + "!";
  } else if (!this.numIsValid()) {
    return "No no no, I only accept whole numbers between 1 and 100!";
  } else {
    this.guessesRemaining--;
    this.previousGuesses.push(this.playersGuess);
    if (this.guessesRemaining === 0) {
      return "The curtain remains shut! Reset to play again."
    }
    return this.lowerOrHigher() + "...Try Again";
  }
}

GuessingGame.prototype.gameOver = function() {
  return this.playersGuess === this.winningNumber || this.guessesRemaining === 0;
}

// Create a provide hint button that provides additional clues to the "Player"

GuessingGame.prototype.hint = function() {
  if (this.playersGuess === 0) {
    return "C'mon, guess at least once!"
  } else {
    var range = Math.ceil(Math.abs(this.playersGuess - this.winningNumber) / 10) * 10;
    return "Victory is within " + range + " steps!";
  }
}

// Randomly generate a prize

GuessingGame.prototype.prize = function() {
  var prizes = [["Painting", "jesus"], ["Chair", "chair"], ["Hoodie", "hoodie"], ["Peach Pits", "pits"], ["Red Cup", "redcup"], ["VHS", "topdog"], ["Meat", "unicorn"], ["Jello", "jello"], ["Machine", "petter"]];
  return prizes[Math.floor(Math.random() * prizes.length)];
}

/* **** Event Listeners/Handlers ****  */

$(document).ready(function() {
  // Initialize
  var gg = new GuessingGame;
  
  // Give Return same functionality as Click
  $("#guessInput").on("keypress", function(e) {
    if (e.which == 13) {
      $("#guessSubmit").click();
    }
  });

  $("#guessSubmit").on("click", function() {
    gg.getPlayersGuess();
    if (!gg.catchRepeat() && gg.numIsValid()) {
      $("#guessList").prepend("<p>" + gg.lowerOrHigher() + "</p>");
    }
    $("#checkMessage").html("<h1 class='center'>" + gg.checkGuess() + "</h1>");
    $("#guessCount").text("Guesses Remaining: " + gg.guessesRemaining);    
    $("#guessInput").val("");
    if (gg.gameOver()) {
      $("#guessSubmit").prop("disabled", true);
      $("#guessInput").prop("disabled", true);
      if (gg.guessesRemaining > 0) {
        var prize = gg.prize();
        $("#prizeImg").html("<img src='images/" + prize[1] + ".jpg'>");
        $("#prize h3").text("The World's Greatest " + prize[0])
      }
    }
  });

  // Hint
  $("#hint").on("click", function() {
    $("#checkMessage").html("<h1 class='center'>" + gg.hint() + "</h1>");
  });

  // Reset
  $("#playAgain").on("click", function() {
    gg = new GuessingGame;
    $("#guessSubmit").prop("disabled", false);
    $("#guessInput").prop("disabled", false);
    $("#checkMessage").html("");
    $("#guessCount").text("Guesses Remaining: 10");
    $("#guessList").html("");
    $("#prizeImg").html("<img src='images/mystery.jpg'>");
    $("#prize h3").text("The World's Greatest Prize")
  });

});