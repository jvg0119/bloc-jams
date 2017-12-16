
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


////////////////////

window.onload = function() {

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


 }  /* window.onload */
