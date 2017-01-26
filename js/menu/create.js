Adler.Game.Menu.prototype.create = function () {

    /* Plugins */
    this.instance.add.plugin(Fabrique.Plugins.InputField);

    this.ws.onmessage = this._activeStage.onMessage.bind(this);

    /* Screen Set */
    this.setScreen();

    this.select_player = this.instance.add.graphics();
    this.select_player.beginFill(0xFF0000, 1);

    var arrow_keys = this.instance.add.sprite(50, 480, 'arrow_keys');
    this.instance.add.text(75,560,"^ Movimentação", {fill : "#fff", font: "12px Arial"});

    var key_Q = this.instance.add.sprite(200, 510, 'key_Q');
    this.instance.add.text(210,560,"^ Ataque", {fill : "#fff", font: "12px Arial"});


    this.adler = this.instance.add.sprite(300, 400, 'adler');
    this.adler.scale.setTo(2);
    this.adler.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8], 10);

    this.adler.inputEnabled = true;
    this.adler.events.onInputDown.add(function(){
        this.player_type = Adler.Players.ADLER;

    }.bind(this));


    this.marina = this.instance.add.sprite(450, 400, 'marina');
    this.marina.scale.setTo(2);
    this.marina.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8], 10);

    this.marina.inputEnabled = true;
    this.marina.events.onInputDown.add(function(){
        this.player_type = Adler.Players.MARINA;

    }.bind(this));

    this.instance.add.text(100,300,"Nome:", {fill : "#fff", font:"35px Monaco"});
    this.instance.add.text(380,510,"Selecione", {fill : "#fff", font: "20px Arial"});

    var input = this.instance.add.inputField(250, 300, {
        font: '18px Arial',
        fill: '#212121',
        fontWeight: 'bold',
        width: 300,
        padding: 8,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 6,
        placeHolder: 'Adlerito'
    });
    input.value = "Adlerito";

    this.start_button = this.instance.add.text(650,400,"Start >", { font:"25px Monaco", fill : "#E22612"});
    this.start_button.inputEnabled = false;

    this.start_button.events.onInputDown.add(function(){
        this.marina.destroy();
        this.adler.destroy();
        delete this.marina;
        delete this.adler;
        this.changeStage("devil");
        this.name = input.value;
    }.bind(this));


    this.instance.stage.disableVisibilityChange = true;
};
