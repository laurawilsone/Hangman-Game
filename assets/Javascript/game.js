
var game = {

    words: {
        lonestar:{

        },

        austin: {

        },

        alamo: {

        },

        cowboy: {

        },

        maverick: {

        },

        dallas: {

        }
    }, // word


// words
wordPlay: null,
letters: [],
matchedLetters: [],
guessedLetters: [],
guessesLeft: 0,
totalGuesses: 0,
lettersGuessed: null,
wins: 0,


setupGame: function() {

    var objKeys = Object.keys(this.words);
    this.wordPlay = objKeys[Math.floor(Math.random() * objKeys.length)];
    this.letters = this.wordPlay.split("");
    this.rebuildWordView();
    this.processUpdateTotalGuesses();
  },



 page: function(letter) {
    if (this.guessesLeft === 0) {
      this.restartGame();
    }else {
      this.updateGuesses(letter);
      this.newMatchedLetters(letter);
      this.rebuildWordView();

      if (this.updateWins() === true) {
        this.restartGame();
      }
    }

  },


  updateGuesses: function(letter) {

    if ((this.guessedLetters.indexOf(letter) === -1) && (this.letters.indexOf(letter) === -1)) {
      this.guessedLetters.push(letter);
      this.guessesLeft--;


      document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
      document.querySelector("#guessed-letters").innerHTML =
      this.guessedLetters.join(", ");
    }
  },


    processUpdateTotalGuesses: function() {

        this.totalGuesses = this.letters.length + 5;
        this.guessesLeft = this.totalGuesses;
    
        document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
      },
    

      newMatchedLetters: function(letter) {
        for (var i = 0; i < this.letters.length; i++) {
          if ((letter === this.letters[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
            this.matchedLetters.push(letter);
          }
        }
      },
    

      rebuildWordView: function() {
   
        var wordView = "";
    
      
        for (var i = 0; i < this.letters.length; i++) {
          if (this.matchedLetters.indexOf(this.letters[i]) !== -1) {
            wordView += this.letters[i];
          } else {
            wordView += "&nbsp;_&nbsp;";
          }
        }
    

        document.querySelector("#current-word").innerHTML = wordView;
      },
    
      restartGame: function() {
        document.querySelector("#guessed-letters").innerHTML = "";
        this.wordPlay = null;
        this.letters = [];
        this.matchedLetters = [];
        this.guessedLetters = [];
        this.guessesLeft = 0;
        this.totalGuesses = 0;
        this.letterGuessed = null;
        this.setupGame();
        this.rebuildWordView();
      },

      updateWins: function() {
        var win;
    
        if (this.matchedLetters.length === 0) {
          win = false;
        } else {
          win = true;
        }

        for (var i = 0; i < this.letters.length; i++) {
          if (this.matchedLetters.indexOf(this.letters[i]) === -1) {
            win = false;
          }
        }
    

        if (win) {
    
          this.wins = this.wins + 1;
    
          document.querySelector("#wins").innerHTML = this.wins;
    
          document.querySelector("#music").innerHTML = this.words[this.wordPlay].song +
          " By " + this.wordPlay;
    
          document.querySelector("#band-div").innerHTML =
            "<img class='band-image' src='assets/images/" +
            this.words[this.wordPlay].picture + "' alt='" +
            this.words[this.wordPlay].song + "'>";
    
          return true;
        }
   
        return false;
    }   

}; // game


game.setupGame();

    document.onkeyup = function(event) {

    game.letterGuessed = String.fromCharCode(event.which).toLowerCase();

    game.page(game.letterGuessed);
}


