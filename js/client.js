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
    console.log(msg.players);

    if(undefined !== msg.players && null !== id){
        console.log(msg.players);
        msg.players.forEach( function( player ){
            if( player.id != id){
                if( !loaded_ids.includes(player.id) ){
                    multi_players.push({
                        player: game.add.sprite(player.x, player.y, 'adler'),
                        id: player.id
                    });
                    multi_players[multi_players.length-1].player.scale.setTo(2, 2);
                    loaded_ids.push(player.id);
                }else{
                    for(var i in multi_players){
                        console.log(multi_players[i]);
                        if(multi_players.hasOwnProperty(i) && multi_players[i].id == player.id){
                            multi_players[i].player.x = player.x;
                            multi_players[i].player.y = player.y;
                        }
                    }
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