var socket = io();

function autoscrollToBottom(){ //lecture 120
  var messages = $("#messages");
  var newMessage = messages.children('li:last-child');
  var clientHeight= messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight= newMessage.prev().innerHeight();
  if(clientHeight + scrollTop +newMessageHeight+ lastMessageHeight >= scrollHeight){
    //console.log('Should Scroll');
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect',function(){
  console.log('connected to server');
  var params = $.deparam(window.location.search);
  socket.emit('join',params,function(err){ //custom event 
    if(err){
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    }
  })
}); //on connect

socket.on('disconnect',function(){
  console.log('disconnected from server');
}); //on disconnect


socket.on('updateUserList',function(users){
  console.log('users List',users);
  $('#users').html('');
  users.forEach(function(user){
    $('#users').append('<li>'+user+'</li>');
  });    
});


socket.on('newMessage',function(message){

  var formatedTime = moment(message.createdAt).format('h:mm a');
  //console.log('new Message! ',message);
  //$('#messages').append('<li>'+formatedTime + ' ' + message.from+': '+message.text+'</li>')

  var template = $('#message-template').html();
  var html = Mustache.render(template,{
    text:message.text,
    from:message.from,
    createdAt: formatedTime
  });
  $("#messages").append(html);
  autoscrollToBottom();
});
/*
socket.emit('createMessage',{
  from:"Koly",
  text:"Holy Loly!"
},function(data){  // this callback function is for the acknowledge
  console.log('Acknowledge received.',data) //confirmation that the sent data was correct.
})
*/


socket.on('newLocationMessage',function(message){
  var formatedTime = moment(message.createdAt).format('h:mm a');
  //console.log('new Location! ',message);
  //$('#messages').append('<li>'+formatedTime + ' ' + message.from+': In Location <a target="_blank" href="'+message.url+'">'+message.latitude+', '+message.longitude +'</a></div></li>');

  var template = $('#location-message-template').html();
  var html = Mustache.render(template,{
    url:message.url,
    from:message.from,
    latitude: message.latitude,
    longitude: message.longitude,
    createdAt: formatedTime
  });
  $("#messages").append(html);
  autoscrollToBottom();
});



$('#message-form').on('submit',function(e){
  e.preventDefault();
  socket.emit('createMessage',{
    from: 'User',
    text: $('#txtMessage').val()
  },function(data){
    //console.log('Callbackk FFFunction');
    $('#txtMessage').val('');
  });
});








var locationButton = $('#btnSendLocation')

function sendLocation(){
  navigator.geolocation.getCurrentPosition(function(position){
    //console.log(position);
    locationButton.prop('disabled',true).text('Sending...');
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    },function(){
      locationButton.prop('disabled',false).text('Send Location');
    });
  },function(){
    alert('Unable to fetch location');
  });
}

locationButton.on('click',function(){
  if(!navigator.geolocation)
  {
    return alert('Geolocation Not supported in this browser!');
  }
  sendLocation();
})