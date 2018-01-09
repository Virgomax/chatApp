const expect = require('expect');

const {Users} = require('./users');

describe('Users',()=>{

  beforeEach(()=>{
    users1=new Users();
    users1.users=[
      {
        id:1,
        name:'Maria',
        room:'Pechuka'
      },
      {
        id:2,
        name:'Pola',
        room:'Pechuka'
      },
      {
        id:3,
        name:'Juan',
        room:'Conejo'
      }
    ]
  });


  it('should add new User',()=>{
    var users1=new Users();
    var user={
      id: 123,
      name: 'Martin',
      room: 'Oroya'
    };
    var resUser = users1.addUser(user.id,user.name,user.room);
    expect(users1.users).toEqual([resUser]);
  });

  it('should return names for Pechuka group',()=>{
    var userList = users1.getUserList('Pechuka');
    expect(userList).toEqual(['Maria','Pola']);
  });

  it('should return names for Conejo group',()=>{
    var userList = users1.getUserList('Conejo');
    expect(userList).toEqual(['Juan']);
  });

  it('should remove user from Pechuka group',()=>{
    var userId=2;
    var user=users1.users[1];
    var removedUser = users1.removeUser(userId);
    expect(removedUser).toEqual(user);
  })

  it('should find user',()=>{
    var userId=2;
    var user = users1.getUser(userId);

    expect(user.id).toBe(userId);
  })

});