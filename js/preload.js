function preload() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.image("rabbit", "assets/rabbit.png");

    game.load.spritesheet('adler', 'assets/adler.png', 48, 48);
    game.load.spritesheet('adler_hit', 'assets/adler_hit.png', 48, 48);
    game.load.spritesheet('adler_weapon', 'assets/coco_bullet.png', 21, 18);

    game.load.spritesheet('devil', 'assets/devil.png', 64, 64);
}