function Client() {}

Client.prototype.openConnection = function() {

    var name = prompt("Please enter your name", "Anonymous");

    this.ws = new WebSocket("ws://localhost:8082", name);
    this.connected = false;
    this.ws.onmessage = this.onMessage.bind(this);
    this.ws.onerror = this.displayError.bind(this);
    this.ws.onopen = this.connectionOpen.bind(this);
   // this.ws.onclose = this.connectionClose.bind(this);

};

Client.prototype.connectionOpen = function() {
    this.connected = true;
};

Client.prototype.onMessage = function(message) {
    var msg = JSON.parse(message.data);
    if(msg.id !== undefined){
        id = msg.id;
    }
    if(undefined !== msg.players && null !== id){
        msg.players.forEach( function( player ){
            console.log(id);
            if( player.id != id && !loaded_ids.includes(player.id) ){
                multi_players.push(game.add.sprite(800, game.world.height - 200, 'adler'));
                multi_players[multi_players.length -1 ].scale.setTo(2, 2);
                loaded_ids.push(player.id);
            }else{
                if( loaded_ids.includes(player.id) ){
                    multi_players[0].x = player.x;
                    multi_players[0].y = player.y;
                }
            }
        });
    }
};

Client.prototype.displayError = function(err) {
    console.error('Web Socket Error: ' + err);
};

Client.prototype.connectionClose = function(id){
    console.log("on close:", id);
//    loaded_ids.splice(id, 1);
};