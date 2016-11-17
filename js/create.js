function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'sky');

    platforms = game.add.group();

    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height - 64, 'ground');

    ground.scale.setTo(2, 2);

    ground.body.immovable = true;

    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    player = game.add.sprite(32, game.world.height - 200, 'adler');
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


    player.animations.add('anim', null, 10, true);
    console.log(player.animations);

    devil.animations.add('anim',null, 5, true);
    devil.animations.play('anim');

    stars = game.add.group();

    stars.enableBody = true;

    for (var i = 0; i < 12; i++)
    {
        var star = stars.create(i * 70, 0, 'star');

        star.body.gravity.y = 300;

        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    cursors = game.input.keyboard.createCursorKeys();
    key_q = game.input.keyboard.addKey(Phaser.KeyCode.Q);

    /* Screen Set */
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignVertically = true;
    game.scale.pageAlignHorizontally = true;
    game.input.onDown.add(gofull, this);

}