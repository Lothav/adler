function update() {

    var has_to_update = false;
    

    game.physics.arcade.collide([adler_weapon.bullets,player, devil], platforms);
    //game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.overlap( player, devil, function(){
       // game.state.restart();
    });
    game.physics.arcade.overlap(adler_weapon.bullets, devil, function(devil, bullet){
        bullet.frame = 14;//animationName = 'explode';
        setTimeout(function(){
            bullet.kill();
            adler_weapon.bulletAnimation = 'fire';
        },1800);
    });

    game.physics.arcade.collide( devil, adler_weapon.bullets, function(player, bullet){
        //@TODO change colision bullet
    });

    game.camera.follow(player);
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
    player.body.velocity.x = 0;

    if(player.frame == 2 && player.key == 'adler_hit'){
        adler_weapon.fireFrom.centerOn(player.x, player.y+10);
        adler_weapon.fire();
    }

    if(key_q.isDown){
        has_to_update = true;
        if(player.key == 'adler'){
            player.loadTexture('adler_hit');
        }
        player.animations.frameRate = 120;
        player.animations.play('anim');
    }
    if (cursors.left.isDown) {
        has_to_update = true;
        /*  Move to the left */
        if(player.scale.x > 0){
            player.scale.x *= -1;
        }
        player.body.velocity.x = -150;
        adler_weapon.fireAngle = 180;
        player.animations.play('anim');
    } else if (cursors.right.isDown) {
        has_to_update = true;
        /*  Move to the right */
        player.body.velocity.x = 150;
        if(player.scale.x < 0){
            player.scale.x *= -1;
        }
        adler_weapon.fireAngle = 0;
        player.animations.play('anim');
    } else {
        if(!key_q.isDown && (player.key != 'adler_hit') ) {
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

    if ( this.client.connected && (has_to_update || !player.body.touching.down) )
        this.client.ws.send(JSON.stringify({ id: id, x: player.x, y: player.y  }));

}
