function Deck() {
  this.cards = [];
  this.count = function() {
    return (this.cards.length);
  }
  this.init = function() {
    for (s = 0; s <= 3; s++) {
      for (r = 0; r <= 12; r++) { 
        this.cards.push(new Card(r, s))
      }
    }
  }
  this.shuffle = function() {
    var m = this.cards.length, temp, rand;
    while (m > 0) {
      rand = Math.floor(Math.random() * m--);
      temp = this.cards[m];
      this.cards[m] = this.cards[rand];
      this.cards[rand] = temp;
    }
  }
}

function Card(rank, suit) {
  this.rank = rank;
  this.suit = suit;
  this.show = function() {
    var r = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "Ace"];
    var s = ["Hearts", "Diamonds", "Spades", "Clubs"];
    return (r[this.rank] + " of " + s[this.suit]);
  }   
}

function Player() {
  this.name = "";
  this.topCardRank = 0;
  this.pile = [];
}

function CardGame(numPlayers) {
  this.player = [];
  this.deck = new Deck();
  this.numPlayers = numPlayers;
  this.init = function() {
    this.deck.init();
    //loop that initiates the player array numPlayers passed 
    for (j = 0; j < numPlayers; j++) {
      this.player.push(new Player());
      this.player[j].name = ("Player " + (j + 1));
    }
  }
  this.deal = function() {
    var x = 0;
    for (i = this.deck.cards.length; i > 0; i--) {
      if (x < (this.player.length)) {
        this.player[x].pile.push(this.deck.cards.pop());
        x++;
      } else {
        x = 0
        this.player[x].pile.push(this.deck.cards.pop());
        x++;
      }
    }
  }
  this.play = function() {   
    var txt1, txt2, txt3;   
    
    txt1 = "HIGH CARD GAME";
    txt2 = "<p>--------------------------------------------------------------------------</p>";

    $("h1").append(txt1, txt2); 

    for (i = 0; i < this.player.length; i++) {
      //Gets each players top pile card
      this.player[i].topCardRank = this.player[i].pile[this.player[i].pile.length - 1].rank
      //Displays each players top pilecard
      $("#play").append(this.player[i].name + " has the " + this.player[i].pile[this.player[i].pile.length - 1].show() + "</br>");
    }
    //Sorts players by their top card
    this.player.sort(function(a, b){return b.topCardRank - a.topCardRank});
    //displays the winner or a tie 
    if (this.player[0].topCardRank != this.player[1].topCardRank) {
      txt3 = $("<h2></h2>").append(this.player[0].name + " is the winner!");
      } else {
      txt3 = $("<h2></h2>").append(" There's a tie!");
    }
    $("#results").append(txt3);
  }   
}

highCardGame = new CardGame(prompt("Welcome to High Card.  Select the number of players between 2 - 52"));
highCardGame.init();
highCardGame.deck.shuffle();
highCardGame.deal();
highCardGame.play();

