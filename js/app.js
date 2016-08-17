// Sets the game status class and is initial values to false.
var Game = function() {
    this.gameOver = false;
    this.gameWin = false;
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
    // Checks for collisions between the player and the enemies.
    if (this.y === player.y && (this.x > player.x - 40 && this.x < player.x + 40)) {
        // Subtracts a life.
        player.lives--;
        // Update life score.
        $(".right").html("Lives: " + player.lives);
        // Shows game over if lives get to 0.
        if (player.lives === 0) {
            game.gameOver = true;
        }
        // Resets player after each collision.
        player.x = 202;
        player.y = 640;
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
    this.y = 640;
    // Initial lives = 3.
    this.lives = 3;
};
// HandleInput method to deal with different player positions and keyboard inputs.
Player.prototype.handleInput = function(dir) {
    // Change the player's position based on the user keyboard input.
    if (dir == "up") {
        this.y = this.y - 83;
    } else if (dir == "down") {
        this.y = this.y + 83;
    } else if (dir == "left") {
        this.x = this.x - 101;
    } else if (dir == "right") {
        this.x = this.x + 101;
    }
    if (this.x < 0) {
        // Player is off to the left side of the board, move the player
        // back to zero.
        this.x = 0;
    } else if (this.x > 404) {
        // Player is off to the right side of the board, move the player
        // back to the right-most square (404).
        this.x = 404;
    } else if (this.y > 640) {
        // Player is off to the bottom side of the board, move the player
        // back to the bottom of the screen.
        this.y = 640;
    } else if (this.y < 0) {
        // Player reached the top and thus must be restarted and score updated.
        this.y = 640;
        this.x = 202;
        score++;
        // Updates html with actual score.
        $(".left").html("Score: " + score);
        heart.x = (Math.floor(Math.random() * 5)) * 101;
        heart.y = yVals[Math.floor(Math.random() * 6)];
        // Renders gameWin image.
        game.gameWin = true;
    }
    // Checks if the player catched a heart and adds a life if so.
    if (this.y === heart.y && this.x === heart.x) {
        player.lives++;
        $(".right").html("Lives: " + player.lives);
        // Makes the heart disappear from the screen.
        heart.x = -200;
        heart.y = -200;
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
// Now instantiate your objects.
// Create humans array with the enemies sprites.
var humans = ["images/char-boy.png", "images/char-cat-girl.png", "images/char-horn-girl.png", "images/char-pink-girl.png", "images/char-princess-girl.png"];
// Array with the possible y coordinates for the enemies and hearts.
var yVals = [557, 474, 391, 225, 142, 59];
// Place all enemy objects in an array called allEnemies.
var allEnemies = [];
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