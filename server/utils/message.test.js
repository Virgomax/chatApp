const expect =require('expect');
const {generateMessage,generateLocationMessage} = require('./message');

describe('Message.js',()=>{
  it('should return a message',()=>{
    var text1='Holy';
    var from1='Loly';
    var newMessage = generateMessage(from1,text1);
    expect(newMessage).toInclude({text: text1});
    expect(newMessage.from).toBe(from1);
    expect(newMessage.createdAt).toBeA('number');
  });

  it('should generate correct location object',()=>{
    var from1="Admin";
    var lat1=12;
    var long1=-34;
    var newLocation=generateLocationMessage(from1,lat1,long1);
    expect(newLocation).toInclude({
      url: "https://www.google.com/maps?q="+lat1+','+long1
    });
    expect(newLocation.from).toBe(from1);
    expect(newLocation.latitude).toBeA('number');
    expect(newLocation.longitude).toBeA('number');
  });
})
