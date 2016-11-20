
Adler.Game.Client = function (h) {
    this.player_id = h.player_id;
    this.connected = false;
    this.multi_players = [];
    this.ws = null;
    this.prototype = h;
};

Adler.Game.Client.prototype.constructor = Adler.Game.Client;

Adler.Game.Client.prototype.openConnection = function() {

    // prod:  ws://luizotavioapi.herokuapp.com
    // dev:  ws://localhost:3000
    this.ws = new WebSocket("ws://localhost:3000");
    this.ws.onmessage = Adler.Game.Devil.prototype.wsMessage.bind(this);
    this.ws.onerror = this.displayError.bind(this);
    this.ws.onopen = this.connectionOpen.bind(this);
    // this.ws.onclose = this.connectionClose.bind(this);
};

Adler.Game.Client.prototype.connectionOpen = function() {
    this.connected = true;
    var name = prompt("Digite um nome:", "Adlerito");

    //this.player_name.setText(name);
    this.ws.send( JSON.stringify({ name: name }) );
};

Adler.Game.Client.prototype.displayError = function(err) {
    console.error('Web Socket Error: ', err);
};

/*Adler.Client.prototype.connectionClose = function(id){
    console.log("on close:", id);
//    loaded_ids.splice(id, 1);
};*/

