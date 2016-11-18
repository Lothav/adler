function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0, 0, 800*3, 600);
    for(i = 0; i < 3; i++){
        game.add.sprite(i*800, 0, 'sky');
    }
    platforms = game.add.group();
    platforms.enableBody = true;
    for(i = 0; i < 3; i++){
        var ground = platforms.create(i*800, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
    }
    
    platforms.create( 13*(80) , 430, 'ground').body.immovable = true;
    platforms.create( 4*(80) , 320, 'ground').body.immovable = true;

    player = game.add.sprite(800, game.world.height - 200, 'adler');
    player.scale.setTo(2,2);
    
    devil = game.add.sprite(64, game.world.height - 250, 'devil');
    devil.scale.setTo(2,2);

    game.physics.arcade.enable([player,devil]);

    player.body.bounce.y = 0.2;
    player.body.gravity.y = 800;
    player.body.collideWorldBounds = true;
    player.anchor.setTo(.5,.5);

    devil.body.bounce.y = 0.2;
    devil.body.gravity.y = 300;
    devil.body.collideWorldBounds = true;
    devil.anchor.setTo(.5,.5);

    player.animations.add('anim', null, 10)
        .onComplete.add(function(){
        if(player.key == 'adler_hit') {
            player.loadTexture('adler');
        }
    }, this);

    devil.animations.add('anim',null, 5, true);
    devil.animations.play('anim');
    
    /* Keyboard keys */
    cursors = game.input.keyboard.createCursorKeys();
    key_q = game.input.keyboard.addKey(Phaser.KeyCode.Q);

    /* Screen Set */
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignVertically = true;
    game.scale.pageAlignHorizontally = true;
    game.input.onDown.add(gofull, this);

    /* Adler Weapon set */
    adler_weapon = this.add.weapon(10, 'adler_weapon_projectile');
    adler_weapon.addBulletAnimation("explode", [5,6,7,8,9,10,11,12,13]);
    adler_weapon.addBulletAnimation("fire", [0,1,2,3,4], 10, true);
    adler_weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

    adler_weapon.bulletSpeed = 500;
    adler_weapon.fireRate = 500;
    adler_weapon.fireAngle = 0;


    /* Client Web Socket */
    this.client = new Client();
    this.client.openConnection();
    myText = game.add.text(0, 0, "started (not yet connected)", { font: "14px Arial", fill: "#ff0044"});
    game.stage.disableVisibilityChange = true;
}