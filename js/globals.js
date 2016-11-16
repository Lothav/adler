var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update },  null, false, false);

var player;
var platforms;
var cursors;

var stars;
var score = 0;
var scoreText;

function collectStar (player, star) {
    // Removes the star from the screen
    star.kill();
    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;
}