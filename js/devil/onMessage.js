Adler.Game.Devil.prototype.onMessage = function(message) {
    var msg = JSON.parse(message.data), i;

    if (msg.devil !== undefined) {
        if (this.devil === null) this.addDevil(msg.devil);
        else {
            /*  to left */
            if (this.devil.x > msg.devil.x) {
                /*  to left */
                if (this.devil.scale.x < 0) {
                    this.devil.scale.x *= -1;
                }
            } else {
                if (this.devil.scale.x > 0) {
                    this.devil.scale.x *= -1;
                }
            }
            // console.log(id, msg.devil.follow_id);
            if (this.player_id == msg.devil.follow_id) {
                /*if (this.player.y < this.devil.y && this.devil.body.touching.down)
                 this.devil.body.velocity.y = -500;*/
            } else
                this.multi_players.forEach(function (p, indx) {
                    if (p.id == msg.devil.follow_id && p.player.y > this.devil.y && this.devil.body.touching.down)
                        this.devil.body.velocity.y = -500;
                }.bind(this));
            this.devil.x = msg.devil.x;
            this.devil.y = msg.devil.y;
        }
    }

    if (msg.devil_slimes !== undefined) {

        this.devil_slimes.forEach(function (ds, index) {
            this.devil_slimes[index].changed = false;
        }.bind(this));

        msg.devil_slimes.forEach(function (backend_ds) {

            var is_new_record = true;
            for (var i in this.devil_slimes) {
                if (backend_ds.id == this.devil_slimes[i].id) {
                    this.devil_slimes[i].devil_slime.x = backend_ds.x;
                    this.devil_slimes[i].devil_slime.y = backend_ds.y;
                    this.devil_slimes[i].devil_slime.animations.play('anim');
                    this.devil_slimes[i].changed = true;
                    is_new_record = false;
                    break;
                }
            }
            if (is_new_record) {
                var devil_slime = this.instance.add.sprite( backend_ds.x, backend_ds.y, 'devil_slime' );
                devil_slime.scale.setTo(2, 2);
                this.instance.physics.arcade.enable( devil_slime );
                devil_slime.body.bounce.y = 0.3;
                devil_slime.anchor.setTo(.5, .5);
                devil_slime.animations.add('anim', null, 5, true);
                this.devil_slimes.unshift({
                    devil_slime: devil_slime,
                    id: backend_ds.id,
                    changed: true
                });
            }


        }.bind(this));

        for (i in this.devil_slimes) {
            if (!this.devil_slimes[i].changed) {
                this.devil_slimes[i].devil_slime.animations.stop('anim');
                this.devil_slimes[i].devil_slime.kill();
                this.devil_slimes.splice(i,1);
            }
        }
    }

    if (msg.id !== undefined) this.player_id = msg.id;

    if (msg.online_players !== undefined)
        for (i in this.multi_players)
            this.multi_players[i].online = msg.online_players.includes(this.multi_players[i].id);
    else
        for (i in this.multi_players) this.multi_players[i].online = false;

    if (undefined !== msg.players && null !== this.player_id) {
        msg.players.forEach(function (p) {
            if (p.id != this.player_id) {
                if (!this.loaded_ids.includes(p.id)) {
                    this.multi_players.push(
                        new Adler.Game.MultiPlayers(
                            p.id, p.name, p.player_type, p.life_perc, this)
                    );
                    this.loaded_ids.push(p.id);
                } else {
                    this.multi_players.forEach(function (player) {
                        player.updateAnimation(p);
                    });
                }
            }
        }.bind(this));
    }

    // @TODO FIX this
    if(msg.online_players !== undefined){
        for( i in this.multi_players ){
            if( this.multi_players.hasOwnProperty(i) && !this.multi_players[i].online ) {
                this.multi_players[i].destroy();
                this.loaded_ids.splice(this.loaded_ids.indexOf(this.multi_players[i].id), 1);
                this.multi_players.splice(i, 1);
            }
        }
    }
};