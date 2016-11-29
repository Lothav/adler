var Health = function(adler_inheritance, type, life_perc){
    this.prototype = adler_inheritance;
    this.widthLife = null;
    this.life = null;
    this.total = null;
    this.type = type;
    this._life_perc = life_perc;
    this._clear = false;
};

Health.prototype.cropLife = function(){

    if( this._life_perc <= 0 && this.type != 'devil' ){
        this.prototype.devil = null;
        this._clear = true;
        this.prototype.ws.close();
        this._life_perc = 1;
        this.prototype.changeStage("menu");
    } else {
        var life = Math.round(this.total * this._life_perc);
        if( this._life_perc <= 0.01 ){
            var fatal = this.prototype.instance.add.text(130, 43, "Fatal", { font: "11px Arial", fill: "#ff0044", align: "center" });
            fatal.fixedToCamera = true;
            life = 1;
            setInterval(function(){
                if(this._clear) return;
                fatal.visible = !fatal.visible;
            }.bind(this),200);
        }
        this.prototype.instance.add.tween(this.widthLife).to( { width: life }, 1000, "Quint", true);
    }
};


Health.prototype.createHealthBar = function(x, y, w, h, flip){
    var bmd = this.prototype.instance.add.bitmapData(w, h); //300 40
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, 300, 80);
    bmd.ctx.fillStyle = '#333333';
    bmd.ctx.fill();

    var bglife = this.prototype.instance.add.sprite(0, 0, bmd);
    bglife.anchor.set(0.5);

    bmd = this.prototype.instance.add.bitmapData(w - (h/2), h - (h/4)); // 280 30
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, 300, 80);
    var grad = bmd.ctx.createLinearGradient(0,0,200,0);
    grad.addColorStop(0, "red");
    grad.addColorStop(0.5, "yellow");
    grad.addColorStop(1, "green");
    bmd.ctx.fillStyle = grad;
    bmd.ctx.fill();

    this.widthLife = new Phaser.Rectangle(0, 0, bmd.width, bmd.height);
    this.total = bmd.width;

    var life = this.prototype.instance.add.sprite(0, 0, bmd);
    life.anchor.y = 0.5;

    life.cropEnabled = true;
    life.crop(this.widthLife);

    bglife.fixedToCamera = true;

    if( flip ){
        life.scale.x *= -1;
        bglife.anchor.x = -0.5;
        bglife.scale.x *= -1;
        bglife.cameraOffset.setTo(x + 160, y);
    } else {
        bglife.cameraOffset.setTo(x + (w/2) - (h/4), y);
    }
    life.fixedToCamera = true;
    life.cameraOffset.setTo(x, y);

    this.life = life;
};

Health.prototype.doDamage = function () {
    this._life_perc -= 0.1;
};

Health.prototype.updateLifePerc = function(life_perc){
    this._life_perc = life_perc;
};

Health.prototype.getLifePerc = function(){
    return this._life_perc;
};

Health.prototype.constructor = Health;