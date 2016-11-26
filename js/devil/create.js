Adler.Game.Devil.prototype.create = function () {
    var i;
    this.ws.onmessage = this._activeStage.onMessage.bind(this);

    this.setScreen();
    this.instance.physics.startSystem(Phaser.Physics.ARCADE);
    this.instance.world.setBounds(0, 0, 800*2, 800);

    this.background = this.instance.add.group();
//    for(i = 0; i < 2; i++){
  //  }
    this.background.create(0, 0, 'sky');

    this.ground_group = this.instance.add.group();
    this.ground_group.enableBody = true;
    for(i = 0; i < 1600/128; i++){
        var ground = this.ground_group.create(128*i, this.instance.world.height - 64, 'tile_plat_middle');
        ground.body.immovable = true;
    }

    this.platforms = this.instance.add.group();
    this.platforms.enableBody = true;

    /* Platforms */
    this.genereteTile(100, 350, 600);
    this.genereteTile(200, 400, 470);
    this.genereteTile(650, 750, 550);
    this.genereteTile(1000, 1250, 600);
    this.genereteTile(800, 1000, 430);
    this.genereteTile(1400, 1400, 450);

    this.genereteTile(500, 500, 300);
    this.genereteTile(1200, 1200, 300);


    var type = this.player_type == Adler.Players.MARINA ? "marina" : "adler";
    this.player = this.instance.add.sprite(800, this.instance.world.height - 200, type);
    this.player.scale.setTo(2,2);
   
    this.instance.physics.arcade.enable(this.player);

    this.player.body.bounce.y = 0.2;
    this.player.body.gravity.y = 800;
    this.player.body.collideWorldBounds = true;
    this.player.anchor.setTo(.5,.5);
    this.player.body.setSize(24, 48, 12, 0);



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


    this.player_name = this.instance.add.text( this.player.x, this.player.y - 50, this.name, { font: "14px Arial", fill: "#ff0044"});
    this.player_name.anchor.setTo(.5,.5);
    this.ws.send( JSON.stringify({ name: this.name, player_type: this.player_type }) );

};