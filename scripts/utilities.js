// assignment for cp 23 DOM Scripting: Events
// utilities.js

// console.log("testing utilities");

// just a quick test of callbacks

/*
var callThisFunc = function() {
  console.log("calling the 'callThisFunc' function");
}

function myFunc(callback) {
  console.log("this is myFunc");
  callback()
}

myFunc(callThisFunc);

var fruits = ["banana", "avocado", "pear", "apple", "tomato"]
//console.log(fruits);
fruits.forEach(function(fruit) {
  console.log(fruit.toUpperCase() + "'s length is " + fruit.length + " characters. ");
})

var printMessage = function() {
  console.log("I clicked it!!!");
}

// class ion-music-note
document.getElementsByClassName('ion-music-note')[0].addEventListener('click', printMessage);

*/

var forEach = function(points, callback) {
  for (var i = 0; i < points.length; i++) {
    //callback(i);
    callback(points[i]);
  }

}



//
