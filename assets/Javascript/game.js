

// create the bank of words
var words = ["lonestar","austin","alamo", "cowboy", "maverick", "dallas"];
  //var game = {
  guessed = [];
  lives = 10;

  function start() {
    var complete = false;
    //generate random words
    var word = words[Math.floor(Math.random() * words.length)];
     //record number of wins
    var wins = document.getElementById('wins');
    // record number of losses
    var losses = document.getElementById('losses');
    // list lives left
    var lives = document.getElementById('lives');
    // replace blank space with words
    word.innerHTML = '_'.repeat(word.length);
   // console.log(wins);
  }

  // create a guess function

  function guess(letter) {
    if (this.left > 0 && this.complete !== true) {
      if (this.word.indexOf(letter) > -1 || this.guessed.indexOf(letter) > -1) {
        this.right(letter);
      } else {
        this.wrong(letter);
        //console.log(letter);
      }
    }
  }

  //a function to show the correct amount of words guessed. 
  function wins(letter) {
    for(var i = 0; i < this.word.length; i++) {
      if (this.word[i] == letter) {
        var word = wins.innerHTML.split('');
        word[i] = letter;
        wins.innerHTML = word.join('');
      }
    }
    if (wins.innerHTML.indexOf('_') < 0) {
      alert('You win!');
      this.complete = true;
    }
  }

  // a function that shows the number of incorrect words guessed. 
  function losses(letter) {
    this.guessed.push(letter);
    this.$wrong.innerHTML += ' ' + letter;
    this.left--;
    losses.innerHTML = this.left;
    if (this.left < 1) {
      alert('you lose! ' + this.word);
      this.complete = true;
    }
  }

  //};

start();

// creating an onkeyup function to start the game by pressing a key.

document.onkeyup = function(event) {
  var letter = String.fromCharCode(event.keyCode).toLowerCase();
  guess(letter);

  // replacing the html 
  var html = "<p>word</p>" + words 
  + "<p>letters_already_guessed</p>" 

// pulling the java script into the html
  document.getElementsByClassName(".game").innerHTML = html;


};
  


