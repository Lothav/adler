function Client() {}

Client.prototype.openConnection = function() {

    var name = prompt("Please enter your name", "Anonymous");

    this.ws = new WebSocket("ws://localhost:8082", name);
    this.connected = false;
    this.ws.onmessage = this.onMessage.bind(this);
    this.ws.onerror = this.displayError.bind(this);
    this.ws.onopen = this.connectionOpen.bind(this);
};

Client.prototype.connectionOpen = function(message) {
    this.connected = true;
    console.log(message);
};

Client.prototype.onMessage = function(message) {
    //myText.text = myText.text + message.data;
    var msg = JSON.parse(message.data);
    sprite.x = msg.x;
    sprite.y = msg.y;
    console.log(msg);
};

Client.prototype.displayError = function(err) {
    console.error('Web Socket Error: ' + err);
};