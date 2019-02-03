var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var Moniker = require('moniker');
let nameGen = Moniker.generator([Moniker.adjective, Moniker.noun]);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  let name = nameGen.choose();
  socket.on('chat message', function(msg){
    io.emit('chat message', {user: name, message: msg});
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
