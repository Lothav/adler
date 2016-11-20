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