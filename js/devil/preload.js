Adler.Game.Devil.prototype.preload = function () {

    this.instance.load.image('sky', 'assets/devil/background.png');

    this.instance.load.spritesheet('adler_hit', 'assets/adler_hit.png', 48, 48);
    this.instance.load.spritesheet('adler_weapon_projectile', 'assets/adler_weapon_projectile.png', 20, 20);

    this.instance.load.spritesheet('marina_hit', 'assets/marina_hit.png', 96, 48);

    this.instance.load.spritesheet('devil', 'assets/devil/devil.png', 64, 64);
    this.instance.load.spritesheet('devil_slime', 'assets/devil/devil_slime.png', 48, 48);

    this.instance.load.image('tile_plat_left', 'assets/devil/tiles/tile_plat_left.png');
    this.instance.load.image('tile_plat_middle', 'assets/devil/tiles/tile_plat_middle.png');
    this.instance.load.image('tile_plat_right', 'assets/devil/tiles/tile_plat_right.png');

    this.instance.load.image('bush_1', 'assets/devil/tiles/decor/bush_1.png');
    this.instance.load.image('rock_1', 'assets/devil/tiles/decor/rock_1.png');
    this.instance.load.image('rock_2', 'assets/devil/tiles/decor/rock_2.png');
    this.instance.load.image('skull_1','assets/devil/tiles/decor/skull_1.png');
    this.instance.load.image('tree_1', 'assets/devil/tiles/decor/tree_1.png');
    this.instance.load.image('tree_2', 'assets/devil/tiles/decor/tree_2.png');
    this.instance.load.image('warning_1', 'assets/devil/tiles/decor/warning_1.png');

    this.instance.time.advancedTiming = true;

};