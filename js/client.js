function Client() {}

Client.prototype.openConnection = function() {

    var name = prompt("Please enter your name", "Anonymous");

    this.ws = new WebSocket("ws://luizotavioapi.herokuapp.com", name);
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
        myText.setText("Players on: "+ msg.players.length);

        for(var i in multi_players){
            multi_players[i].changed = false;
        }

        msg.players.forEach( function( player ){
            if( player.id != id){
                if( !loaded_ids.includes(player.id) ){
                    multi_players.push({
                        id: player.id,
                        player: game.add.sprite(player.x, player.y, 'adler'),
                        text: game.add.text( player.x, player.y - 50, player.name,
                            { font: "14px Arial", fill: "#ff0044"}),
                        changed: true
                    });
                    multi_players[multi_players.length-1].player.scale.setTo(2, 2);
                    multi_players[multi_players.length-1].player.anchor.setTo(.5,.5);
                    multi_players[multi_players.length-1].player.animations.add('anim', null, 10);

                    multi_players[multi_players.length-1].text.anchor.setTo(.5,.5);
                    loaded_ids.push(player.id);
                }else{
                    for( i in multi_players ){
                        if( multi_players.hasOwnProperty(i) && multi_players[i].id == player.id ){


                            /*  Multi Players animation  */
                            if( player.x != multi_players[i].player.x ) {
                                if( player.x < multi_players[i].player.x ){
                                    /*  Move to the left */
                                    if(multi_players[i].player.scale.x > 0){
                                        multi_players[i].player.scale.x *= -1;
                                    }
                                } else {
                                    /*  Move to the right */
                                    if(multi_players[i].player.scale.x < 0){
                                        multi_players[i].player.scale.x *= -1;
                                    }
                                }
                                multi_players[i].player.animations.play('anim');
                                multi_players[i].player.x = player.x;
                                multi_players[i].text.x = player.x;
                            } else {
                                multi_players[i].player.animations.stop();
                                multi_players[i].player.frame = 0;
                            }

                            multi_players[i].text.y = player.y -50;
                            multi_players[i].player.y = player.y;
                            multi_players[i].changed = true;
                        }
                    }

                }
            }
        });
        for( i in multi_players ){
            if(multi_players.hasOwnProperty(i) && !multi_players[i].changed) {
                multi_players[i].player.kill();
                multi_players[i].text.destroy();
                loaded_ids.splice(loaded_ids.indexOf(multi_players[i].id), 1);
                multi_players.splice(i, 1);
            }
        }
    }
};

Client.prototype.displayError = function(err) {
    console.error('Web Socket Error: ', err);
};

Client.prototype.connectionClose = function(id){
    console.log("on close:", id);
//    loaded_ids.splice(id, 1);
};