const moment= require('moment'); //Documentation: http://momentjs.com/docs/#/displaying/

var date = new moment();
//date.add(100,'years').subtract(9,'months');



console.log(date.format('MMM Do, YYYY'));
console.log(date.format('h:mm a'));

var createdAt = 100;
var date2=new moment(createdAt);

console.log(date2.format('MMM Do, YYYY'));
console.log(date2.format('h:mm a'));

var date2Miliseconds= date2.valueOf();
console.log(date2Miliseconds);

/*
var date = new Date();
console.log(date.getMonth()); //months from 0 to 11
*/