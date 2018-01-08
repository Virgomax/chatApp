//path library documentation: https://nodejs.org/api/path.html

//IT IS BETTER TO USE "const webSockets = require('ws')"  https://stackoverflow.com/a/38558531/7491858

const path = require('path');

const publicPath = path.join(__dirname,'/../public');
const express = require('express');

const http=require('http');
const socketIO=require('socket.io');
var app = express();

var server=http.createServer(app);
var io = socketIO(server); 

app.use(express.static(publicPath));

io.on('connection',(socket)=>{    //on new connection
  console.log('new user connected');



  socket.emit('newMessage',{
    from: 'pobres@pechukas.com',
    text: 'Hey. this is the email',
    createdAt: 123
  }); //on connect

  socket.on('createMessage',(createdMessage)=>{
    console.log('create Message ',createdMessage);
  }); //on connect

  socket.on('disconnect',()=>{
    console.log('user disconnected');
  }); //on connect
}); 



server.listen(3000,()=>{   //this uses the "server" variable because 
  console.log('Server is up on port 3000');
});

console.log(publicPath);
console.log();