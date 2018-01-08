var socket = io();
socket.on('connect',function(){
  console.log('connected to server');
  socket.emit('createMessage',{
    to: "conejo@gmail.com",
    text: "hey Conejo"
  })
}); //on connect

socket.on('disconnect',function(){
  console.log('disconnected from server');
}); //on disconnect

socket.on('newMessage',function(from){
  console.log('new Message! ',from);
}); //on disconnect