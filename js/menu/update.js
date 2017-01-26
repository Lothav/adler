Adler.Game.Menu.prototype.update = function () {
    if(this.player_type == Adler.Players.ADLER) {
        this.marina.frame = 0;
        this.adler.animations.play('walk');
        this.select_player.clear();
        this.select_player.beginFill(0xE22612, 1);
        this.select_player.drawCircle(350, 450, 100);
    }
    else {
        this.adler.frame = 0;
        this.marina.animations.play('walk');
        this.select_player.clear();
        this.select_player.beginFill(0xE22612, 1);
        this.select_player.drawCircle(500, 450, 100);
    }


    if(this.ws.readyState == WebSocket.OPEN){
        this.start_button.inputEnabled = true;
        this.start_button.addColor('#0f0',0);
    } else {
        if(this.ws.readyState == WebSocket.CLOSED) this.openConnection();
    }
};
