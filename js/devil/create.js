Adler.Game.Devil.prototype.create = function () {
    var i;

    this.setScreen();
    this.openConnection();
    this.instance.physics.startSystem(Phaser.Physics.ARCADE);
    this.instance.world.setBounds(0, 0, 800*3, 600);
    for(i = 0; i < 3; i++){
        this.instance.add.sprite(i*800, 0, 'sky');
    }
    this.platforms = this.instance.add.group();
    this.platforms.enableBody = true;
    for(i = 0; i < 3; i++){
        var ground = this.platforms.create(i*800, this.instance.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
    }

    this.platforms.create( 13*(80) , 430, 'ground').body.immovable = true;
    this.platforms.create( 4*(80) , 320, 'ground').body.immovable = true;

    var type = this.player_type == Adler.Players.MARINA ? "marina" : "adler";
    this.player = this.instance.add.sprite(800, this.instance.world.height - 200, type);
    this.player.scale.setTo(2,2);
   
    this.instance.physics.arcade.enable(this.player);

    this.player.body.bounce.y = 0.2;
    this.player.body.gravity.y = 800;
    this.player.body.collideWorldBounds = true;
    this.player.anchor.setTo(.5,.5);
    this.player.body.setSize(24, 48, 12, 0);

    this.player_name = this.instance.add.text( this.player.x, this.player.y - 50, this.player_name, { font: "14px Arial", fill: "#ff0044"});
    this.player_name.anchor.setTo(.5,.5);


    this.player.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8], 10)
        .onComplete.add(function(){
        if(this.player.key == 'adler_hit') {
            this.player.loadTexture('adler');
        }
        if(this.player.key == 'marina_hit'){
            this.player.loadTexture('marina');
            this.player.anchor.setTo(.5,.5);
        }
    }, this);
    
    /* Keyboard keys */
    this.cursors = this.instance.input.keyboard.createCursorKeys();
    this.key_q = this.instance.input.keyboard.addKey(Phaser.KeyCode.Q);

    /* Adler Weapon set */
    this.adler_weapon = this.instance.add.weapon(10, 'adler_weapon_projectile');
    this.adler_weapon.addBulletAnimation("explode", [5,6,7,8,9,10,11,12,13]);

    this.adler_weapon.bullets.children.forEach(function(bullet){
        bullet.scale.setTo(2,2);
        bullet.animations._anims.explode.onComplete.add( function( sprite, animation ){
            sprite.kill();
        }, this);
    });

    this.adler_weapon.addBulletAnimation("fire", [0,1,2,3,4], 10, true);
    this.adler_weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.adler_weapon.bulletSpeed = 500;
    this.adler_weapon.fireRate = 500;
    this.adler_weapon.fireAngle = 0;
    this.instance.stage.disableVisibilityChange = true;

};