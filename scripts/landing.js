
var animatePoints = function() {
  var points = document.getElementsByClassName('point')
  var revealFirstPoint = function() {
    points[0].style.opacity = 1;
    points[0].style.transform = "scaleX(1) translateY(0)";
    points[0].style.msTransform = "scaleX(1) translateY(0)";
    points[0].style.WebkitTransform = "scaleX(1) translateY(0)";
  };
  var revealSecondPoint = function() {
    points[1].style.opacity = 1;
    points[1].style.transform = "scaleX(1) translateY(0)";
    points[1].style.msTransform = "scaleX(1) translateY(0)";
    points[1].style.WebkitTransform = "scaleX(1) translateY(0)";
  };
  var revealThirdPoint = function() {
    points[2].style.opacity = 1;
    points[2].style.transform = "scaleX(1) translateY(0)";
    points[2].style.msTransform = "scaleX(1) translateY(0)";
    points[2].style.WebkitTransform = "scaleX(1) translateY(0)";
  };
  revealFirstPoint();
  revealSecondPoint();
  revealThirdPoint();
}

// setTimeout(function() {console.log("this is setTimeout")}, 1000);
// setTimeout(animatePoints, 1000);
// https://developer.mozilla.org/en-US/docs/Web/CSS/transform

//animatePoints();
