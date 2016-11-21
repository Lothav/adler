Adler.Game.Menu.prototype.update = function () {
    if(this.player_type == Adler.Players.ADLER) {
        this.marina.frame = 0;
        this.adler.animations.play('walk');
    }
    else {
        this.adler.frame = 0;
        this.marina.animations.play('walk');
    }
};
