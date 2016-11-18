function Client() {}

Client.prototype.openConnection = function() {

    name = prompt("Digite um nome:", "Adlerito");

    this.ws = new WebSocket("ws://localhost:3000");
    this.connected = false;
    this.ws.onmessage = this.onMessage.bind(this);
    this.ws.onerror = this.displayError.bind(this);
    this.ws.onopen = this.connectionOpen.bind(this);
    // this.ws.onclose = this.connectionClose.bind(this);
};

Client.prototype.connectionOpen = function() {
    this.connected = true;
    player_name.setText(name);
    this.ws.send( JSON.stringify({ name: name }) );
};

Client.prototype.onMessage = function(message) {
    var msg = JSON.parse(message.data);
    if(msg.id !== undefined){
        id = msg.id;
    }

    if(undefined !== msg.players && null !== id){
        myText.setText("Players on: "+ msg.players.length);

        for(var i in multi_players) {
            multi_players[i].changed = false;
        }

        msg.players.forEach( function( p ){
            if( p.id != id){
                if( !loaded_ids.includes(p.id) ){
                    multi_players.push({
                        id: p.id,
                        player: game.add.sprite(p.x, p.y, 'adler'),
                        text: game.add.text( p.x, p.y - 50, p.name, { font: "14px Arial", fill: "#ff0044"}),
                        changed: true
                    });
                    multi_players[multi_players.length-1].player.scale.setTo(2, 2);
                    multi_players[multi_players.length-1].player.anchor.setTo(.5,.5);
                    multi_players[multi_players.length-1].player.animations.add('anim', null, 10);

                    multi_players[multi_players.length-1].text.anchor.setTo(.5,.5);
                    loaded_ids.push(p.id);
                }else{
                    for( i in multi_players ){
                        if( multi_players.hasOwnProperty(i) && multi_players[i].id == p.id ){

                            console.log(p.x != multi_players[i].player.x );
                            /*  Multi Players animation  */
                            if( p.x != multi_players[i].player.x ) {
                                if( p.x < multi_players[i].player.x ){
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
                                multi_players[i].player.x = p.x;
                                multi_players[i].text.x = p.x;
                            } else {
                                multi_players[i].player.animations.stop();
                                multi_players[i].player.frame = 0;
                            }

                            multi_players[i].text.y = p.y -50;
                            multi_players[i].player.y = p.y;
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