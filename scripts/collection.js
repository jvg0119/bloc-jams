// collection.js
// console.log('collection.js')


var buildCollectionItemTemplate = function() {
  var template =
    '<div class="collection-album-container column fourth">'
  +    '<img src="assets/images/album_covers/01.png"/>'
  +    '<div class="collection-album-info caption">'
  +      '<p>'
  +        '<a class="album-name" href="album.html">The Colors</a>'
  +        '<br/>'
  +        '<a href="album.html">Pablo Picasso</a>'
  +        '<br/>'
  +        'X songs'
  +        '<br/>'
  +      '</p>'
  +    '</div>'
  +  '</div>'
  ;

  return $(template);

}


// var collectionItemTemplate =
//   '<div class="collection-album-container column fourth">'
// +    '<img src="assets/images/album_covers/01.png"/>'
// +    '<div class="collection-album-info caption">'
// +      '<p>'
// +        '<a class="album-name" href="album.html">The Colors</a>'
// +        '<br/>'
// +        '<a href="album.html">Pablo Picasso</a>'
// +        '<br/>'
// +        'X songs'
// +        '<br/>'
// +      '</p>'
// +    '</div>'
// +  '</div>'
// ;

// refactor to jQuery
//console.log(collectionItemTemplate);
// window.onload = function() {
//   var collectionContainer = document.getElementsByClassName('album-covers')[0];
//   collectionContainer.innerHTML = '';
//
//   for (var i = 0; i < 10; i++) {
//     collectionContainer.innerHTML += collectionItemTemplate;
//   }
// }

// $(document).ready(function() {
//   console.log('refactoring to jQuery using document.ready function!')
// })

$(window).load(function() {
  console.log('refactoring to jQuery using window.load function!');
  var $collectionContainer = $('.album-covers');
  $collectionContainer.empty();

  // $collectionContainer.html(buildCollectionItemTemplate());
  // $collectionContainer = $collectionContainer.html(buildCollectionItemTemplate());
  // $collectionContainer.append(buildCollectionItemTemplate());

  for (var i = 0; i < 10; i++) {
    var $newThumbnail = buildCollectionItemTemplate();
    $collectionContainer.append($newThumbnail);
  }


});







//
