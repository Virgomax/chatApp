//path library documentation: https://nodejs.org/api/path.html

//IT IS BETTER TO USE "const webSockets = require('ws')"  https://stackoverflow.com/a/38558531/7491858

//Broadcasting is emitting an event to everydoby but one especific user.

//io.emit                   //sends message to everybody
//socket.broadcast.emit     //sends message to everybody but the user in this socket
//socket.emit               // sends message only to the user in this socket
//io.to('groupName').emit   //sends to everybody in the group "groupName"
//socket.broadcast.to('groupName').emit  //sends to everybody in the group "groupName" but the user in this socket


const path = require('path');

const publicPath = path.join(__dirname,'/../public');
const express = require('express');

const http=require('http');
const socketIO=require('socket.io');  //PLEASE USE VERSION 1.7.4 BECAUSE VERION 2.0.4 HAS A BUG (IT TAKES TOO LONG IN COMMUNICATION) https://www.udemy.com/the-complete-nodejs-developer-course-2/learn/v4/questions/3321042
const {isRealString}=require('./utils/validation');
const {Users} = require('./utils/users');
var app = express();
var users= new Users();

var server=http.createServer(app);
var io = socketIO(server); 

const {generateMessage,generateLocationMessage} = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection',(socket)=>{    //on new connection
  console.log('new user connected');

 
  socket.on('join',(params,callback)=>{

    if(!isRealString(params.name)||!isRealString(params.room))
    {callback('Name and room name are required.');}

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id,params.name,params.room);
    io.to(params.room).emit('updateUserList',users.getUserList(params.room));
    //socket.leave(params.room);

    socket.emit("newMessage",generateMessage("Admin","Welcome to Chat App!")); //io.emit : sendind to everybody
    socket.broadcast.to(params.room).emit("newMessage",generateMessage("Admin",params.name + " has joined!")); //socket.broadcast.emit : sendind to everybody but this socket
    
    callback();
  });

  socket.on('createMessage',(createdMessage,callback)=>{
    console.log('create Message ',createdMessage);

    io.emit("newMessage",generateMessage(createdMessage.from,createdMessage.text)); //io.emit : sendind to everybody
    callback('THis is from the server');
  }); //on connect

  socket.on('createLocationMessage',(coords,callback)=>{
    io.emit('newLocationMessage',generateLocationMessage("User",coords.latitude,coords.longitude));
    callback();
  });

  socket.on('disconnect',()=>{
    //console.log('user disconnected');
    var user = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUserList',users.getUserList(user.room));
      io.to(user.room).emit('newMessage',generateMessage('Admin',user.name+' has left.'));
    }
  }); //on connect
}); 



server.listen(3000,()=>{   //this uses the "server" variable because 
  console.log('Server is up on port 3000');
});

console.log(publicPath);
console.log();
