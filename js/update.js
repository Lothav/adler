function update() {

    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide([player, devil], platforms);
    game.physics.arcade.collide(stars, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(player, stars, collectStar, null, this);

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if(key_q.isDown){
        if(player.key == 'adler'){
            player.loadTexture('adler_hit');
        }
        player.animations.frameRate = 120;
        player.animations.play('anim');
    } else {
        if(player.key == 'adler_hit') {
            player.loadTexture('adler');
        }
    }
    if (cursors.left.isDown) {
        /*  Move to the left */
        if(player.scale.x > 0){
            player.scale.x *= -1;
        }
        player.body.velocity.x = -150;

        player.animations.play('anim');
        devil.animations.play('anim');
    } else if (cursors.right.isDown) {
        /*  Move to the right */
        player.body.velocity.x = 150;
        if(player.scale.x < 0){
            player.scale.x *= -1;
        }
        player.animations.play('anim');
        devil.animations.play('anim');
    } else {
        if(!key_q.isDown) {
            player.animations.stop();
            player.frame = 0;
        }
    }

    /*  Devil update  */
    if( devil.x < player.x ) {
        devil.body.velocity.x = +80;
        if(devil.scale.x > 0){
            devil.scale.x *= -1;
        }
    } else {
        devil.body.velocity.x = -80;
        if(devil.scale.x < 0){
            devil.scale.x *= -1;
        }
    }
    if( devil.y > player.y && devil.body.touching.down ) {
        devil.body.velocity.y = -350;
    }

    /*  Allow the player to jump if they are touching the ground. */
    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -500;
    }
}
