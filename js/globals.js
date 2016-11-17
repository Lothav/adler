var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update },  null, false, false);

var player;
var devil;
var platforms;
var cursors;

var stars;
var score = 0;
var scoreText;

function collectStar (player, star) {
    star.kill();
    score += 10;
    scoreText.text = 'Score: ' + score;
}