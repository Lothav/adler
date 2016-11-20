Adler.Game.MultiPlayers = function (id, name, type, p, instance) {
    /**
     * @property {Boolean} connected - Web Socket is connect or not.
     * */
    this.id = id;
    /**
     * @property {Boolean} connected - Web Socket is connect or not.
     * @private
     * */
    this._text = false;
    /**
     * @property {Boolean} connected - Web Socket is connect or not.
     * */
    this.player = Adler.Players.prototype.getSprite(instance, type, p);
    /**
     * @property {Boolean} connected - Web Socket is connect or not.
     * */
    this.changed = true;
    /**
     * @property {Boolean} connected - Web Socket is connect or not.
     * */
    this.name = name;
};

Adler.Game.MultiPlayers.prototype = {
    setText : function (instance) {
        this._text = instance.add.text( this.player.x, this.player.y - 50, this.name, { font: "14px Arial", fill: "#ff0044"});
        this._text.anchor.setTo(.5,.5);

    },
    updateTextPos : function(){
        this._text.x = this.player.x;
        this._text.y = this.player.y - 50;
    },
    textDestroy : function(){
        this._text.destroy();
    }
};