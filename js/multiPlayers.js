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
     * @property {Boolean} changed - If player not change on request, they are removed.
     * */
    this.changed = true;


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
     *
     * */
    updateWeaponPos: function (to) {
        if(this.weapon !== null){
            if(to == 'left'){
                this.weapon.fireAngle = 180;
            }else{
                this.weapon.fireAngle = 0;
            }
            this.weapon.fireFrom.centerOn(this.player.x, this.player.y+10);
        }
    }
};

Adler.Game.MultiPlayers.prototype.constructor = Adler.Game.MultiPlayers;


/**
 * Players
 * Class that have all information about playable players.
 * Implemented by Adler.Game.MultiPlayers.
 * @class
 * */
Adler.Players = function (instance, type, p) {
    /**
     * Player Phaser.Sprite.
     * @property
     * @private
     * */
    this._sprite = this.setSprite(instance, type, p);

    /**
     * Player Phaser.Weapon.
     * @property
     * @private
     * */
    this._weapon = this.setWeapon(instance, type);
};

/**
 * @const
 * */
Adler.Players.ADLER = 0;
Adler.Players.MARINA = 1;

Adler.Players.prototype = {

    /**
     * Set playable players sprite by type.
     * @method
     * */
    setSprite : function (instance, type, p) {
        switch (type){
            case Adler.Players.MARINA:
                var marina = instance.add.sprite(p.x, p.y, 'marina');
                marina.scale.setTo(2, 2);
                marina.anchor.setTo(.5, .5);
                marina.animations.add('walk', null, 10);
                return marina;
            default:
                var adler = instance.add.sprite(p.x, p.y, 'adler');
                adler.scale.setTo(2, 2);
                adler.anchor.setTo(.5, .5);
                adler.animations.add('walk', null, 10).onComplete.add(function(sprite){
                    console.log(sprite);
                    if(sprite.key == 'adler_hit') {
                        sprite.loadTexture('adler');
                    }
                });
                return adler;
        }
    },

    /**
     * Set playable players weapon by type.
     * @method
     * */
    setWeapon: function (instance, type) {
        switch (type){
            case Adler.Players.MARINA:
                return null;
            default:

                var weapon = instance.add.weapon(10, 'adler_weapon_projectile');
                weapon = instance.add.weapon(10, 'adler_weapon_projectile');
                weapon.addBulletAnimation("explode", [5,6,7,8,9,10,11,12,13]);

                weapon.bullets.children.forEach(function(bullet){
                    bullet.scale.setTo(2,2);
                    bullet.animations._anims.explode.onComplete.add( function( sprite, animation ){
                        sprite.kill();
                    }, this);
                });

                weapon.addBulletAnimation("fire", [0,1,2,3,4], 10, true);
                weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
                weapon.bulletSpeed = 500;
                weapon.fireRate = 500;
                weapon.fireAngle = 0;

                return weapon;
        }
    },

    getWeapon:function(){
        return this._weapon;
    },

    getSprite:function(){
        return this._sprite;
    }
};

Adler.Players.prototype.constructor = Adler.Players;