function Client() {}

Client.prototype.openConnection = function() {
    this.ws = new WebSocket("ws://localhost:8080");
    this.connected = false;
    this.ws.onmessage = this.onMessage.bind(this);
    this.ws.onerror = this.displayError.bind(this);
    this.ws.onopen = this.connectionOpen.bind(this);
};

Client.prototype.connectionOpen = function() {
    this.connected = true;
    console.log('Web Socket Connected');
};

Client.prototype.onMessage = function(message) {
    //myText.text = myText.text + message.data;
    var msg = JSON.parse(message.data);
    sprite.x = msg.x;
    sprite.y = msg.y;
    console.log(msg.y, msg.x);

};

Client.prototype.displayError = function(err) {
    console.error('Web Socket Error: ' + err);
};
