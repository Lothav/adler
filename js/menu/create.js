Adler.Game.Menu.prototype.create = function () {

    /* Plugins */
    this.instance.add.plugin(Fabrique.Plugins.InputField);

    /* Screen Set */
    this.setScreen();

    this.adler = this.instance.add.sprite(300, 400, 'adler');
    this.adler.scale.setTo(2);
    this.adler.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8], 10);

    this.marina = this.instance.add.sprite(500, 400, 'marina');
    this.marina.scale.setTo(2);
    this.marina.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8], 10);


    this.instance.add.text(100,300,"Nome:", {fill : "#fff"});
    this.instance.add.text(100,400,"Selecione:", {fill : "#fff"});

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

    var start = this.instance.add.text(650,350,"Start>", {fill : "#fff"});
    start.inputEnabled = true;

    start.events.onInputDown.add(function(){
        this.changeStage("devil");
        this.name = input.value;
    }.bind(this));


    this.instance.stage.disableVisibilityChange = true;
};
