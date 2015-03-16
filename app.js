var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'app')));

app.get('/', function(req, res){
  'use strict';
  res.sendFile(__dirname + '/app/index.html');
});

io.on('connection', function(socket){
  'use strict';
  socket.on('chat message', function(msg){
    var json = JSON.parse(msg);
    io.emit('chat message',
      JSON.parse(msg));
  });//json.user + ' Say '+ json.msg + ' At '+json.date
});

http.listen(3000, function(){
  'use strict';
  console.log('listening on *:3000');
});