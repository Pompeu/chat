var socket = io();
var input = document.querySelector("#message");
var button = document.querySelector("#btn");
var ul = document.querySelector("#messages");

input.addEventListener("keyup",function(ev) {
  'use strict';
  if(ev.keyCode == 13){
    return sendMsg();
  }
});

button.addEventListener("click",sendMsg);

function sendMsg () {
  'use strict';
  var msg = document.querySelector("#message");
  socket.emit('chat message',msg.value);               
  msg.value = ''; 
};

socket.on('chat message',chatMsg);

function chatMsg(msg) {
  'use strict';
  if(/^\w+(\w+ ?)*$/.test(msg)){
    var li = document.createElement("li");
    var msgNode = document.createTextNode(msg.trim());
    li.appendChild(msgNode);  
    ul.appendChild(li);
  } 
};