Adler.Game.Devil.prototype.preload = function () {

    this.instance.load.image('sky', 'assets/sky.png');
    this.instance.load.image('ground', 'assets/devil/platform.png');

    this.instance.load.spritesheet('adler_hit', 'assets/adler_hit.png', 48, 48);
    this.instance.load.spritesheet('adler_weapon_projectile', 'assets/adler_weapon_projectile.png', 20, 20);

    this.instance.load.spritesheet('marina_hit', 'assets/marina_hit.png', 96, 48);

    this.instance.load.spritesheet('devil', 'assets/devil/devil.png', 64, 64);
    this.instance.load.spritesheet('devil_slime', 'assets/devil/devil_slime.png', 48, 48);
};