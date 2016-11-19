function update() {

    game.physics.arcade.collide([adler_weapon.bullets, player, devil], platforms);
    game.physics.arcade.overlap( player, devil, function(){
        // game.state.restart();
    });

    game.physics.arcade.overlap( devil, adler_weapon.bullets, function(devil, bullet){
        bullet.animations.play('explode');
    });

    game.camera.follow(player);
    player.body.velocity.x = 0;

    if(player.frame == 2 && player.key == 'adler_hit'){
        adler_weapon.fireFrom.centerOn(player.x, player.y+10);
        adler_weapon.fire();
    }

    if(key_q.isDown){
        if(player.key == 'adler'){
            player.loadTexture('adler_hit');
        }
        player.animations.frameRate = 120;
        player.animations.play('anim');
    }
    if (cursors.left.isDown) {
        /*  Move to the left */
        if(player.scale.x > 0){
            player.scale.x *= -1;
        }
        player.body.velocity.x = -150;
        adler_weapon.fireAngle = 180;
        player.animations.play('anim');
    } else if (cursors.right.isDown) {
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

 
    /*  Allow the player to jump if they are touching the ground. */
    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -500;
    }

    player_name.x = player.x;
    player_name.y = player.y - 50;

    if ( this.client.connected /*&& (has_to_update || !player.body.touching.down) */)
        this.client.ws.send(
            JSON.stringify({
                id: id,
                x: player.x,
                y: player.y,
                devil:{
                    y: devil !== undefined ? devil.y : 80
                }
            }) 
        );
}
