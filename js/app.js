var Game = function() {
    this.gameOver = false;
};



// Enemies our player must avoid

var Enemy = function(x,y,z) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    
    
    this.sprite = humans[z];
    
    this.x = x;
    this.y = y;
    
    this.multiplier = Math.floor((Math.random() * 4) + 1);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 550) {
        this.x = Math.floor(Math.random() * -1000);
	    this.y = yVals[Math.floor(Math.random() * 6)];
        this.multiplier = Math.floor((Math.random() * 4) + 1);
    } else {
       this.x = this.x + 101 * dt * this.multiplier; 
    }
    
    if (this.y === player.y && (this.x > player.x - 40 && this.x < player.x + 40)) {
        player.lives--;
        $(".right").html("Lives: " + player.lives);
        
        
        if (player.lives === 0) {
            game.gameOver = true;
        }
        player.x = 202;
        player.y = 640;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    
    this.sprite = 'images/enemy-bug-pink.png';
    
    this.x = 202;
    this.y = 640;
    
    this.lives = 3;
    
};

Player.prototype.handleInput = function(dir) {

	// Change the player's position based on the user keyboard input
	if (dir == 'up') {
		this.y = this.y - 83;
	} else if (dir == 'down') {
		this.y = this.y + 83;
	} else if (dir == 'left') {
		this.x = this.x - 101;
	} else if (dir == 'right') {
		this.x = this.x + 101;
	}
    
    if (this.x < 0) {
		// Player is off to the left side of the board, move the player
		// back to zero
		this.x = 0;
    } else if (this.x > 404) {
		// Player is off to the right side of the board, move the player
		// back to the right-most square (606)
		this.x = 404;
    } else if (this.y > 640) {
        this.y = 640;
    } else if (this.y < 0) {
        this.y = 640;
        this.x = 202;
        score++;
        $(".left").html("Score: " + score);
        heart.x = (Math.floor(Math.random() * 5)) * 101;
        heart.y = yVals[Math.floor(Math.random() * 6)];
    }
    
    if (this.y === heart.y && this.x === heart.x) {
        player.lives++;
        $(".right").html("Lives: " + player.lives);
        heart.x = -200;
        heart.y = -200;
    }
    
};

Player.prototype.update = function() {
	this.x = this.x;
	this.y = this.y;
};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Heart = function() {
    this.sprite = 'images/Heart.png';
    
    this.x = (Math.floor(Math.random() * 5)) * 101
    this.y = yVals[Math.floor(Math.random() * 6)];
};


Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var humans = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'];

var allEnemies = [];

var yVals = [557, 474, 391, 225, 142, 59];

var heart = new Heart();


for (var i = 0; i < 17; i++) {
    // Set a starting x-position based on a random value
	var x = Math.floor(Math.random() * -1000);

	// Set a starting y-position based on a random selection
	// of the 3 possible values
	var y = yVals[Math.floor(Math.random() * 6)];
    
    var z = Math.floor(Math.random() * 5);

	// Create the new enemy object
	var enemy = new Enemy(x, y, z);

	// Push the enemy into the array
	allEnemies.push(enemy);
}

var player = new Player();
var score = 0;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var game = new Game();