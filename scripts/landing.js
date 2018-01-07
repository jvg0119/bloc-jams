
// refactor animatePoints
/*
var pointsArray = document.getElementsByClassName('point'); // changed var points to pointsArray
//var pointsArray = $('.point');
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
*/

////////////////////
// var pointsArray = $('point');

var animatePoints = function() {
  // console.log('pointsArray function running!!!');
  // console.log('this in animatePoints = ',  $(this)); // this   is in the context of the window

  var revealPoint = function() {
    // console.log('this in revealPoint = ', $(this)); // this    is in the context of the revealPoint
    // $(this).css('opacity', 1);
    // $(this).css('transform', 'scaleX(1) translateY(0)')
    $(this).css({'opacity': 1, 'transform' : 'scaleX(1) translateY(0)'}); // shorter form
    // console.log(this.innerText)
  }

  // revealPoint();
  // var $point = $('.point');
  // $.each($('.point'), revealPoint);
  $.each($('.point'), revealPoint);

}


////////////////////
//window.onload = function() {
$(window).load(function() {

  // refactor to jQuery
  // add this   to be able to trigger animatePoints if the screen is tall enough that it does not need to scroll
  // otherwise it will not animate
  // if (window.innerHeight > 950) {
  //   animatePoints(pointsArray);
  // }
  if ($(window).height() > 950) {
    animatePoints();
  }

  // refactor to jQuery
  // var sellingPoints = document.getElementsByClassName('selling-points')[0];
  // var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 400;
  var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;

  //refactor to jQuery
  // window.addEventListener('scroll', function(event) {
  // if (document.documentElement.scrollTop >= scrollDistance || document.body.scrollTop >= scrollDistance) {
  //   console.log(scrollDistance, document.documentElement.scrollTop); // this will show when their equal
  //   animatePoints(pointsArray);                                     // this is when it triggers the animatePoints
  // }
  $(window).scroll(function(event) {
    // console.log('testing scroll!!!')
    // console.log('bhmmm =',  $(window) === document.documentElement)
    // console.log('window = ', $(window));
    // console.log('document.documentElement = ', document)
    // console.log($(window).scrollTop() === document.documentElement.scrollTop )
    // console.log('scrollTop() = ', $(window).scrollTop(), ' scrollDistance = ', scrollDistance)
    //if (document.documentElement.scrollTop >= scrollDistance || document.body.scrollTop >= scrollDistance) {
    if ($(window).scrollTop() >= scrollDistance) { // scrollTop returns vertical scrollbar position
    //   //console.log(scrollDistance, + ' : ' + document.documentElement.scrollTop()); // this will show when their equal
    //  animatePoints(pointsArray);                                     // this is when it triggers the animatePoints
      animatePoints();
      //console.log('boooooahhh!!! @@@')
    }
  });
});


  // $(window).scroll(function(event) {
  //   console.log('test = ');
  // });
    // if (document.documentElement.scrollTop >= scrollDistance || document.body.scrollTop >= scrollDistance) {
    //   console.log(scrollDistance, document.documentElement.scrollTop); // this will show when their equal
    //   animatePoints(pointsArray);                                     // this is when it triggers the animatePoints
    // }
    //console.log('test boooo' + event.target);
    //console.log(document.documentElement)
    //console.log($(document.documentElement.scrollTop >= scrollDistance));
    // if ($(document.documentElement.scrollTop >= scrollDistance)) { // scrollTop returns vertical scrollbar position
//     if ($(document.documentElement.scrollTop >= scrollDistance)) {
//       if ($(window).scrollTop() >= scrollDistance) {
//         console.log('myboooo');
//         //animatePoints();
//     //if ($(document.documentElement.scrollTop >= scrollDistance)) {
//
//       };
//
//   //
//   //}); /* window.addEventListener */
//   }
//   /* window.onload */
// };

 //  $(window).
 //
 //
 //
 // }); /* $(window).load(function() { }*/
