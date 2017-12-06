
var pointsArray = document.getElementsByClassName('point'); // changed var points to pointsArray
  var animatePoints = function(points) {
// var animatePoints = function() {
//   var points = document.getElementsByClassName('point');

  var revealPoint = function(i) {
    points[i].style.opacity = 1;
    points[i].style.transform = "scaleX(1) translateY(0)";
    points[i].style.msTransform = "scaleX(1) translateY(i)";
    points[i].style.WebkitTransform = "scaleX(1) translaieY(0)";
  }

  for (var i = 0; i < points.length; i++) {
    revealPoint(i);
  }
}
// animatePoints();
// setTimeout(animatePoints, 1000);


// notes on window.onload
// onload is a window property
// we can pass a function to onload
// this function executes automatically after the window is finished loading
// window.onload = function() {
//   console.log("window is now loaded!!!")
//   var insideFunc = function(go){
//     console.log("running insideFunc ****  " + go)
//   }
//   insideFunc("goooo booo");
// }

// console.log(this.onload === window.onload);
// console.log(onload === this.onload);
// onload(); you can run onload manually

// function bingo() // does not execute automatically like onload
// window.bingo = function() {
//   console.log("bingo")
// }
// bingo();



////////////////////

window.onload = function() {
  //alert("The window has loaded!");

  // var sellingPoints = document.getElementsByClassName('selling-points'); // sellingPoints is a nodelist
  // A NodeList is collection of DOM elements. It's like an array (but it isn't).
  // To work with it, you must turn it into a regular JavaScript array.
  // https://stackoverflow.com/questions/5501433/nodelist-object-in-javascript
  var sellingPoints = document.getElementsByClassName('selling-points')[0]; // first and only element in the nodelist
  // console.log(sellingPoints); //

// add this   to be able to trigger animatePoints if the screen is tall enough that it does not need to scroll
// otherwise it will not animate
  if (window.innerHeight > 950) {
    animatePoints(pointsArray);
  }

  // console.log(sellingPoints.getBoundingClientRect())
  // Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
  //console.log('sellingPoints.getBoundingClientRect().top = ' +  sellingPoints.getBoundingClientRect().top)
  window.addEventListener('scroll', function(event) {
    //console.log(event)
    //console.log(sellingPoints.getBoundingClientRect().bottom);
    //console.log(sellingPoints.getBoundingClientRect().top);
    console.log("Current offset from the top is " + sellingPoints.getBoundingClientRect().top + " pixels");
    // Current offset or distance from the window top to the top of the sellingPoints

    // console.log('window.innerHeight = ' +  window.innerHeight); // changes reference to the window size
    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 400; // you can adjust this number to adjust the animatePoints trigger position; it's not very consistent w/ different screen sizes
    console.log('scrollDistance = ' + scrollDistance);
    //console.log(document.documentElement.scrollTop);
    //console.log(document.body.scrollTop);
    //var scrollDista23nce = sellingPoints.getBoundingClientRect().top - window.innerHeight;
    //console.log(scrollDistance);
    // if (sellingPoints.getBoundingClientRect().top < 400) {
    //console.log('document.documentElement.scrollTop = ' +  document.documentElement.scrollTop);
    //console.log('document.body.scrollTop = ' +  document.documentElement.scrollTop);

    if (document.documentElement.scrollTop >= scrollDistance || document.body.scrollTop >= scrollDistance) {
      console.log(scrollDistance, document.documentElement.scrollTop); // this will show when their equal
      animatePoints(pointsArray);                                     // this is when it triggers the animatePoints
    }



  }); /* window.addEventListener */

//this just shows the mouse click position (coords) in the console
// var showCoords = function(event) {
//   var x = event.clientX;
//   var y = event.clientY;
//   console.log("x = " + x + " y = " + y);
// }
// window.addEventListener('click', showCoords );


 }  /* window.onload */
