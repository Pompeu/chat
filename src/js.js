var socket = io(),
    input = document.querySelector("#message"),
    button = document.querySelector("#btn"),
    ul = document.querySelector("#messages"),
    user = document.querySelector("#user"),
    msg = document.querySelector("#message");

input.addEventListener("keyup",function(ev) {
  'use strict';
  if(ev.keyCode == 13){
    return sendMsg();
  }
});
user.addEventListener("keyup",function(ev) {
  'use strict';
  if(ev.keyCode == 13){
    return sendMsg();
  }
});

button.addEventListener("click",sendMsg);

function sendMsg () {
  'use strict';
  var date = Date.now();  
  socket.emit('chat message',JSON.stringify({
    msg : msg.value,
    date : date,
    user : user.value
  }));               
  msg.value = ''; 
  user.value = '';
};

socket.on('chat message',chatMsg);

function chatMsg(msg) {
  'use strict';
  var li = document.createElement("li");
  var msgNode = document.createTextNode(msg.user +' Say : '+msg.msg +' at: '+new Date(msg.date));
  li.appendChild(msgNode);  
  ul.appendChild(li);
};