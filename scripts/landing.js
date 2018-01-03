
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












/* below are just test exploration - delete later */
/*
 $(window).load(function() {
   console.log('bbbbbbboooo');
   console.log("testing one");
   var arr = ['Joe', 'George', 'Booo']
   var domElement = document.querySelectorAll('.point-title');
   var $newDomElement = $(domElement);
   // console.log('$newDomElement = ',  $newDomElement.html());
   //console.log('domElement = ',  domElement.innerText)
   for (var i = 0; i < domElement.length; i++ ) {
     domElement[i].innerHTML = '<H2>Testing ' + arr[i] + '!</H2>'
     domElement[i].style.color = 'yellow';
   }

   var $newDomElement2 = $('.point-title')
   console.log($newDomElement2[0].innerHTML)
   console.log($newDomElement2[0])
   $.each($newDomElement2, function(index, value) {
     // $newDomElement2[index].text() = 'zoooo'
     console.log(index + ' : ' + value.innerText);
     value.innerHTML = '<H2>Testing ' + arr[index] + '!</H2>';
   })

   // $.each([ 52, 97 ], function( index, value ) {
   //   console.log( index + ": " + value );
   // });


 })
*/

/*
var domElement = document.getElementsByClassName('point-title');
var $newDomElement = $(domElement)
var arr = ['one', 'two', 'three']
console.log(domElement.length);
console.log($newDomElement.length);
$(window).load(function() {
   console.log('testing again!!!');
  for (var i = 0; i < domElement.length; i++) {
    // console.log(i)
    // domElement[i].innerHTML = '<h1>' + 'Testing ' + arr[i] + '</h1>'
    // console.log($newDomElement[i].innerText);
    $newDomElement[i].innerHTML = '<h1>' + 'Testing ' + arr[i] + '</h1>';
    // $newDomElement[i].style.color = 'yellow';
    $($newDomElement[i]).css("color","blue"); // same as above
  }
})
*/

/*
$(window).load(function() {
  var arr = ['one', 'two', 'three'];
  // console.log('test')
  // console.log($('.point-title').length);
  $('.point-title').each(function(i,value) {
    // console.log('testing jquery')
    // console.log(i + ' : ' + value.innerText);
    value.innerHTML = '<h1>' + 'jQuery Test ' + arr[i] +  '</h1>'
    $(value).css({'color':'green','fontFamily': 'cursive'});
  //  $(value).css('fontFamily', 'cursive');
  })
})
*/
