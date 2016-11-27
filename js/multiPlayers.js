/**
 * Object that abstract each Player in game.
 * (except the player that you are playing)
 * @constructor
 * */
Adler.Game.MultiPlayers = function (id, name, type, p, instance) {
    /**
     * @property {Number} id - Player id.
     * */
    this.id = id;

    /**
     * @property {String} name - Name that will displayed on top of his head.
     * */
    this.name = name;

    /**
     * @property {Boolean} online - If player not change on request, they are removed.
     * */
    this.online = true;


    var player_obj = new Adler.Players(instance, type, p);
    /**
     * @property {Phaser.Sprite} player - Phaser Sprite new object.
     * */
    this.player = player_obj.getSprite();

    /**
     * @property {Phaser.Weapon} weapon - Player weapon.
     * */
    this.weapon = player_obj.getWeapon();

    /**
     * @property {Phaser.Text} _text - The text that will be displayed as name head.
     * @private
     * */
    this._text = this.getText(instance);

    this._life = new Health(this, type);
};

Adler.Game.MultiPlayers.prototype = {
    /**
     * Remove player from screen.
     * @method
     * */
    destroy: function(){
        this.player.kill();
        this._text.destroy();
    },

    /**
     * Create a text (his name) in top of player head.
     * @method
     * */
    getText : function (instance) {
        var text = instance.add.text( this.player.x, this.player.y - 50, this.name,
            { font: "14px Arial", fill: "#ff0044"} );
        text.anchor.setTo(.5,.5);
        return text;
    },

    /**
     * Update text position.
     * Is called every request.
     * @method
     * */
    updateTextPos : function(){
        this._text.x = this.player.x;
        this._text.y = this.player.y - 50;
    },

    /**
     * Update player weapaon.
     * @method
     * */
    updateWeaponPos: function (to) {
        if(this.weapon !== null){
            if(to !== null){
                if(to == 'left'){
                    this.weapon.fireAngle = 180;
                }else{
                    this.weapon.fireAngle = 0;
                }
            }
            this.weapon.fireFrom.centerOn(this.player.x, this.player.y+10);
        }
    },
    /**
     * Update player animations.
     * @method
     * */
    updateAnimation: function(p){
        if( this.id == p.id ){

            /*  Multi Players animation  */
            if( p.fire && this.player.key == 'adler'){
                this.player.loadTexture('adler_hit');
                this.player.animations.play("walk");
            }
            if(this.player.key == 'adler_hit' && this.player.frame == 3 ){
                this.weapon.fire();
            }

            if( p.fire && this.player.key == 'marina'){
                this.player.loadTexture('marina_hit');
                this.player.anchor.setTo(.2,.5);
                this.player.animations.play("walk");
            }

            if( p.x !== this.player.x ) {

                if(this.player.key != 'adler_hit' && this.player.key != 'marina_hit'){
                    if( p.x < this.player.x ){
                        /*  Move to the left */
                        if(this.player.scale.x > 0){
                            this.player.scale.x *= -1;
                        }
                        this.updateWeaponPos('left');
                    } else if( p.x > this.player.x ) {
                        /*  Move to the right */
                        if(this.player.scale.x < 0){
                            this.player.scale.x *= -1;
                        }
                        this.updateWeaponPos('right');
                    }
                }else{
                    this.updateWeaponPos(null);
                }
                this.player.animations.play('walk');
                this.player.x = p.x;

            } else if(this.player.key != 'adler_hit' && this.player.key != 'marina_hit'){
                this.player.animations.stop();
                this.player.frame = 0;
                this.updateWeaponPos(null)
            } else {
                this.updateWeaponPos(null)
            }
            this.player.y = p.y;
            this.online = true;
            this.updateTextPos();
        }
    }
};

Adler.Game.MultiPlayers.prototype.constructor = Adler.Game.MultiPlayers;
