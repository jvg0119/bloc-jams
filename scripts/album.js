
// console.log('album.js file test');


// Example Album
 var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };


 // Another Example Album
 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };
//console.log('albumMarconi.title = ',  albumMarconi.songs[0].title)


// this is a template to create each of the song rows
var createSongRow = function(songNumber, songName, songLength) {
  var template =
        '<tr class="album-view-song-item">'
  //    + '  <td class="song-item-number">' + songNumber + '</td>'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
                                        // added custom attribute to template
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
     return template;
 };
//console.log(createSongRow());


var setCurrentAlbum = function(album) {
  // console.log('setCurrentAlbum is now running!')

  // these variables come from album.html file
  var albumTitle = document.getElementsByClassName('album-view-title')[0];
  var albumArtist = document.getElementsByClassName('album-view-artist')[0];
  var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
  var albumImage = document.getElementsByClassName('album-cover-art')[0];
  //var albumImage = document.querySelector('.column.half img'); // works OK
  var albumSongList = document.getElementsByClassName('album-view-song-list')[0];


  // checking the contents on the console
  // console.log('albumTitle = ',  albumTitle);  // var albumTitle above
  // console.log('albumArtist = ',  albumArtist);
  // console.log('albumReleaseInfo = ',  albumReleaseInfo);
  // console.log('albumImage= ',  albumImage);
  // albumSongList.textContent = "booooo"
  // console.log('albumSongList= ',  albumSongList);


  // these are for the album title:
  albumTitle.firstChild.nodeValue = album.title;  // assigning albumTitle.firstChild.nodeValue to    album.title
                                                  // album is being passed as an paramter to function setCurrentAlbum
  // console.log('albumTitle.firstChild.nodeValue = ',  albumTitle.firstChild.nodeValue) // this is from the album.html file
                                                                                         // var albumTitle above is set assigned to document.getE  ...
  // console.log('album.title = ', album.title) // this is from the data above; album is being passed to this function

  // I'm just checking what each is on these 3 console.log below
  // console.log('boooo albumTitle = ', albumTitle)
  // console.log('boooo albumTitle.firstChild = ', albumTitle.firstChild)
  // console.log('boooo albumTitle.firstChild.nodeValue = ', albumTitle.firstChild.nodeValue)

  // these are putting (or replacing) the new values or content since album is the paramter being passed here
  albumArtist.firstChild.nodeValue = album.artist;
  albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
  albumImage.setAttribute('src', album.albumArtUrl);



  // this is for the songlist:
  albumSongList.innerHTML = ''; // start w/ an empty list

  // album is being passed to function setCurrentAlbum
  // album.songs    songs is a property of album; see above data for var albumPicasso = { ...
  // here we're cycling through the album.songs using for loop
  for (var i = 0; i < album.songs.length; i++) { // album is the object being passed to the function
    // console.log('this is i = ',  i);
    // console.log('this is album.songs' + i + ' = ' + album.songs[i].title);

    //console.log(albumTitle.firstChild.nodeValue);
    // console.log(i+1)
    // console.log(album.songs[i].title)
    // console.log(album.songs[i].duration)

    //console.log(createSongRow(i, album.title, album.duration));
    //console.log(albumSongList[i] = "testing!!!!!!!");

    //albumSongList.innerHTML = "booooo"
    albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    //console.log(albumSongList.innerHTML)
  }
}


var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
//console.log(songListContainer);
//var playButtonTemplate = "<a class=""><span class='ion-android-arrow-dropright-circle'></span></a>"
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

var songRows = document.getElementsByClassName('album-view-song-item');

// var songItemNumber = document.getElementsByClassName('song-item-number').childNodes;
// console.log('songItemNumber = ',   songItemNumber);

window.onload = function() {
  setCurrentAlbum(albumPicasso);
  // setCurrentAlbum(albumMarconi); // you can use the other data above

  songListContainer.addEventListener('mouseover', function(e) {

    //console.log(e.target); // the node target; these are the single components
    // console.log(e.target.parentNode); // parentNode is 'album-view-song-item'; this is the whole line
    // console.log(e.target.parentNode.className = "album-view-song-item"); // this will change the class to whatever you assign it to

    // if (e.target.textContent === '1') { // this is a quick manual test
    //  console.log('this is number one')

    //  e.target.innerHTML = playButtonTemplate // this will assign or change the target you mouseover to the playButtonTemplate

//  if (e.target.className === "song-item-number") {  // this is triggered by the number only
    if (e.target.parentElement.className === "album-view-song-item") {  // this is triggered by the line
       e.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
       //console.log('booo = ',  e.target.parentElement.querySelector('.song-item-number').innerHTML)
    }
  });

  for (var i = 0; i < songRows.length; i ++) {
    songRows[i].addEventListener('mouseleave', function() {
      this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
    })
  }


/*
// below is OK but not prefered; it's better to just use   "this" instead of songRows[i]
// another solution is to use let i instead of var i   to scope i to the block
// otherwise i will be pointing to the last value of i w/c is songRows.length or 5
  for (var i = 0; i < songRows.length; i++) {
     (function row(i) {
       songRows[i].addEventListener('mouseleave', function(event) {
          //this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
          songRows[i].children[0].innerHTML = songRows[i].children[0].getAttribute('data-song-number');
          console.log('this = ', this);
          console.log('this = ', songRows[i]);
          console.log(i);
        });
     })(i);
   }
*/


/*
// this works fine
// alternate method
  Array.from(songRows).forEach(function(row) {
    //console.log(row);
    row.addEventListener('mouseleave', function(e) {
      // console.log(e.target);
      // console.log('this = ', this);
      // console.log('row = ',  row);
      // console.log(this === row); // true
      // this.children[0].innerHTML = this.children[0].getAttribute('data-song-number'); // OK
      row.children[0].innerHTML = row.children[0].getAttribute('data-song-number');

    })
  })
*/

}
