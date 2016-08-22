// Sets the game status class and is initial values to false.
var Game = function() {
    this.gameOver = false;
    this.gameWin = false;
};
// Shows game over or game win image.
Game.prototype.statusCheck = function(player, heart) {
    if (player.y < 0) {
        // Player reached the top and thus must be restarted and score updated.
        player.y = 557;
        player.x = 202;
        score++;
        // Updates html with actual score.
        $(".score").html("Score: " + score);
        heart.x = (Math.floor(Math.random() * 5)) * 101;
        heart.y = yVals[Math.floor(Math.random() * 6)];
        // Renders gameWin image.
        game.gameWin = true;
    }
    // Shows game over if lives get to 0.
    if (player.lives === 0) {
            game.gameOver = true;
        }
};
// Checks for collisions between the player and the enemies.
Game.prototype.checkCollision = function(enemy, player) {
    for (var i = 0; i<enemy.length; i++) {
        if (enemy[i].y === player.y && (enemy[i].x > player.x - 40 && enemy[i].x < player.x + 40)) {
        // Subtracts a life.
        player.lives--;
        // Update life score.
        $(".lives").html("Lives: " + player.lives);
        // Resets player after each collision.
        player.x = 202;
        player.y = 557;
        } 
    }  
};
// Enemies our player must avoid.
var Enemy = function(x, y, z) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images.
    // The sprite uses an array and the variable z to randomly select an enemy image.
    this.sprite = humans[z];
    // The position coordinates.
    this.x = x;
    this.y = y;
    // A multiplier to set different speeds to the enemies.
    this.multiplier = Math.floor((Math.random() * 4) + 1);
};
// Update the enemy's position, required method for game.
// Parameter: dt, a time delta between ticks.
Enemy.prototype.update = function(dt) {
    // If enemies go out of the screen they get reset to a random row, position and speed.
    if (this.x > 550) {
        this.x = Math.floor(Math.random() * -1000);
        this.y = yVals[Math.floor(Math.random() * 6)];
        this.multiplier = Math.floor((Math.random() * 4) + 1);
    } else {
        this.x = this.x + 101 * dt * this.multiplier;
    }
};
// Draw the enemy on the screen, required method for game.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = "images/char-bug-pink.png";
    this.x = 202;
    this.y = 557;
    // Initial lives = 3.
    this.lives = 3;
};
// HandleInput method to deal with different player positions and keyboard inputs.
Player.prototype.handleInput = function(dir) {
    var ydir = 83;
    var xdir = 101;
    // Change the player's position based on the user keyboard input.
    if (dir == "up") {
        this.y = this.y - ydir;
    } else if (dir == "down") {
        this.y = this.y + ydir;
    } else if (dir == "left") {
        this.x = this.x - xdir;
    } else if (dir == "right") {
        this.x = this.x + xdir;
    }
    if (this.x < 0) {
        // Player is off to the left side of the board, move the player
        // back to zero.
        this.x = 0;
    } else if (this.x > 404) {
        // Player is off to the right side of the board, move the player
        // back to the right-most square (404).
        this.x = 404;
    } else if (this.y > 557) {
        // Player is off to the bottom side of the board, move the player
        // back to the bottom of the screen.
        this.y = 557;
    }
};
// Update player method.
Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;
};
// Player render method.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Heart class.
var Heart = function() {
    this.sprite = "images/Heart.png";
    //randomly generates a heart on the screen.
    this.x = (Math.floor(Math.random() * 5)) * 101
    this.y = yVals[Math.floor(Math.random() * 6)];
};
// Heart render method.
Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Checks if the player catched a heart and adds a life if so.
Heart.prototype.isCatch = function(player) {
    if (this.y === player.y && this.x === player.x) {
        player.lives++;
        $(".lives").html("Lives: " + player.lives);
        // Makes the heart disappear from the screen.
        this.x = -200;
        this.y = -200;
    } 
};
// Now instantiate your objects.
// Create humans array with the enemies sprites.
var humans = ["images/char-boy.png", "images/char-cat-girl.png", "images/char-horn-girl.png", "images/char-pink-girl.png", "images/char-princess-girl.png"];
// Array with the possible y coordinates for the enemies and hearts.
var yVals = [474, 391, 308, 225, 142, 59];
// Place all enemy objects in an array called allEnemies.
var allEnemies = [];
// Initial function to create enemies.
var createEnemies = function() {
    for (var i = 0; i < 17; i++) {
        // Set a starting x-position based on a random value.
        var x = Math.floor(Math.random() * -1000);
        // Set a starting y-position based on a random selection
        // of the 6 possible values.
        var y = yVals[Math.floor(Math.random() * 6)];
        var z = Math.floor(Math.random() * 5);
        // Create the new enemy object.
        var enemy = new Enemy(x, y, z);
        // Push the enemy into the array.
        allEnemies.push(enemy);
    }
};
// Place the player object in a variable called player.
var player = new Player();
// Place the heart object in a variable called heart.
var heart = new Heart();
// Place the game object in a variable called game.
var game = new Game();
// Sets initial score = 0.
var score = 0;
// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener("keyup", function(e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        87: "up",
        65: "left",
        83: "down",
        68: "right"
    };
    player.handleInput(allowedKeys[e.keyCode]);
});