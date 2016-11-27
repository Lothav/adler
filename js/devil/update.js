Adler.Game.Devil.prototype.update = function () {

    var fired = false;

    //this.instance.physics.arcade.collide([this.adler_weapon.bullets, this.player, this.devil], this.platforms);


    this.instance.world.sendToBack(this.decors);
    this.instance.world.sendToBack(this.platforms);
    this.instance.world.sendToBack(this.background);

    this.devil_slimes.forEach(function (ds, index) {
        this.devil_slimes[index].devil_slime.animations.play('anim');
        this.instance.physics.arcade.overlap(this.devil_slimes[index].devil_slime, this.player, function(slime, player){
            slime.kill();
            this.player_life.cropLife();
        }.bind(this));
    }.bind(this));

    this.devil_life.life.updateCrop();
    this.player_life.life.updateCrop();


    this.instance.physics.arcade.overlap(this.player, [this.platforms, this.ground_group], function(player, platform){
        if(player.y + 45 < platform.y){
            this.instance.physics.arcade.collide(player, platform);
            if (this.cursors.up.isDown) {
                this.player.body.velocity.y = -500;
            }
        }
    }.bind(this));

    this.instance.physics.arcade.overlap( this.devil, this.adler_weapon.bullets, function(devil, bullet){
        bullet.animations.play('explode');
    });

    for(var mp in this.multi_players){
        if(this.multi_players[mp].weapon != null){
            this.instance.physics.arcade.overlap( this.devil, this.multi_players[mp].weapon.bullets, function(devil, bullet){
                bullet.animations.play('explode');
            });
            this.instance.physics.arcade.collide( this.platforms, this.multi_players[mp].weapon.bullets, function(devil, bullet){
                bullet.animations.play('explode');
            });
        }
    }



    this.instance.physics.arcade.collide( this.platforms, this.adler_weapon.bullets, function(devil, bullet){
        bullet.animations.play('explode');
    });

    this.instance.camera.follow(this.player);
    this.player.body.velocity.x = 0;

    if(this.player.key == 'adler_hit' && this.player.frame == 2){
        this.adler_weapon.fireFrom.centerOn(this.player.x, this.player.y+10);
        this.adler_weapon.fire();
    }


    if (this.cursors.left.isDown) {
        /*  Move to the left */
        if(!this.key_q.isDown && (this.player.key != 'adler_hit')  && (this.player.key != 'marina_hit')) {
            if (this.player.scale.x > 0) {
                this.player.scale.x *= -1;
            }
            this.adler_weapon.fireAngle = 180;
        }
        this.player.body.velocity.x = -150;
        this.player.animations.play('walk');
    } else if (this.cursors.right.isDown) {
        /*  Move to the right */
        if(!this.key_q.isDown && (this.player.key != 'adler_hit')  && (this.player.key != 'marina_hit')) {
            if(this.player.scale.x < 0){
                this.player.scale.x *= -1;
            }
            this.adler_weapon.fireAngle = 0;
        }
        this.player.body.velocity.x = 150;
        this.player.animations.play('walk');
    } else {
        if(!this.key_q.isDown && (this.player.key != 'adler_hit')  && (this.player.key != 'marina_hit')) {
            this.player.animations.stop();
            this.player.frame = 0;
        }
    }

    this.player_name.x = this.player.x;
    this.player_name.y = this.player.y - 50;

    if(this.key_q.isDown){
        if(this.player.key == 'adler'){
            this.player.loadTexture('adler_hit');
        }
        if(this.player.key == 'marina'){
            this.player.loadTexture('marina_hit');
            this.player.anchor.setTo(.2,.5);
        }
        this.player.animations.frameRate = 120;
        this.player.animations.play('walk');
        fired = true;
    }


    if ( this.ws.readyState == WebSocket.OPEN )
        this.ws.send(
            JSON.stringify({
                id: this.player_id,
                x: this.player.x,
                y: this.player.y,
                player_type: this.player_type,
                fire: fired
            })
        );
};
