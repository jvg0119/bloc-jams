
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


  // these are for the album title:
  albumTitle.firstChild.nodeValue = album.title;  // assigning albumTitle.firstChild.nodeValue to    album.title
                                                  // album is being passed as an paramter to function setCurrentAlbum
  // console.log('albumTitle.firstChild.nodeValue = ',  albumTitle.firstChild.nodeValue) // this is from the album.html file
                                                                                         // var albumTitle above is set assigned to document.getE  ...
  // console.log('album.title = ', album.title) // this is from the data above; album is being passed to this function


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

    albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    //console.log(albumSongList.innerHTML)
  }
}

/////////////////////////////
// checkpoint 27 DOM Scripting: Play/Pause Part 2

// assignment 27 DOM Scripting: Play/Pause Part 2

//
var findParentByClassName = function(element, targetClass) {
    // if (element) {  // checking to make sure there is an element
    // if (element && (element.parentElement === null) ) {  // OK also
    if (element && !element.parentElement) { // checking if there is an element and element.elementParent
      //console.log('element = ', element);
      //console.log('element.parentElement = ', element.parentElement);
      console.log('no parent element');
    } else {
        var currentParent = element.parentElement;  // assigning the parentElement to a variable
        // console.log(' ***** currentParent = ', currentParent); // checking only
        while (currentParent.className !== targetClass && currentParent.className !== null) {
            currentParent = currentParent.parentElement;  // if the 2 conditions above are false do this
        }
        if (currentParent.className != targetClass) {
          console.log('No parent found with that class name')
        } else {
          console.log('This is currentParent = ', currentParent) //
          return currentParent;  // this is the return or output
        }
    }
};

//
 var getSongItem = function(element) {
   var result;

     switch (element.className) {

        // #1 A child, like the icon or the icon's circular container
         case 'album-song-button':  // if element.className === 'album-song-button'
         case 'ion-play':           // if element.className === 'album-song-button'
         case 'ion-pause':          // if element.className === 'ion-pause'
            result = findParentByClassName(element, 'song-item-number');
            // console.log('result = ',  result);
            // result = document.querySelector('.song-item-number'); // this is always going to be the first song or # 1 song; so won't work
          return result;
             // returns  'song-item-number' the parentElement of the 3 cases above

         // #2 A parent, like the table row (parent of 'song-item-number'
         // need to return the child
         case 'album-view-song-item':
             result = element.querySelector('.song-item-number'); // no need to find parent because this is already the parent
             return result;

         // # 3 A child of the parent, but neither a child nor parent of .song-item-number,
         // like the table cells with the classes .song-item-title or .song-item-duration
         // album-view-song-item is the parent of the 2 cases below; '.song-item-number' is their child
         case 'song-item-title':
         case 'song-item-duration':
             result = findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
             return result;

        // # 4 The .song-item-number element itself
         case 'song-item-number':
             return element;
         default:
             return;
     }
 };


// targetElement is the e.target being passed from the the addEventListener function
var clickHandler = function (targetElement) {
  // console.log("you clicked!")

  var songItem = getSongItem(targetElement);
    // console.log('this is songItem = ',  songItem) //
    if (currentlyPlayingSong === null) {
      // nothing is playing yet; it's null
      // console.log('Is currentlyPlayingSong null? = ', currentlyPlayingSong);
      currentlyPlayingSong = songItem.getAttribute('data-song-number'); // setting currentlyPlayingSong to the 'data-song-number' w/c ever song you clicked
      songItem.innerHTML = pauseButtonTemplate; // you played this song
      // console.log('you played this song = ', currentlyPlayingSong);
      // console.log('songItem.innerHTML = ',  songItem.innerHTML)

    } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) { // !== null ) {
      // currentlyPlayingSong is no longer null
      // if currentlyPlayingSong will be assigned the song or data-song-number that you clicked
      // songItem.getAttribute('data-song-number')     is what you click; look at songItem method above
      // console.log('you turned off this song = ', songItem.getAttribute('data-song-number')); // this is the song playing that you turned off
      songItem.innerHTML = playButtonTemplate; // you turned off the song
      // console.log('songItem.innerHTML = ', songItem.innerHTML)
      currentlyPlayingSong = null; // remove the currentlyPlayingSong or turning off this son

    } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
      // currentlyPlayingSong    is neither of the above (null or the song you clicked)
      // console.clear();
      // console.log('currentlyPlayingSong.innerHTML = ', currentlyPlayingSong.innerHTML); // undefined; not seen by user
      // console.log('currentlyPlayingSong = ', currentlyPlayingSong); // 1 is stored here

      var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]'); // place the 1 here
      console.log('currentlyPlayingSongElement = ',  currentlyPlayingSongElement.innerHTML);
      // this is what the user sees w/c is     1

      currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
      // console.log('currentlyPlayingSongElement = ',  currentlyPlayingSongElement.innerHTML);

      // these 2 below are the same as the first statement above
      songItem.innerHTML = pauseButtonTemplate;
      currentlyPlayingSong = songItem.getAttribute('data-song-number');
    }

}


var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var currentlyPlayingSong = null; // start w/ no songs playing until play is clicked

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
    // if (e.target.className === "song-item-number") {  // this is triggered by the number only
    // console.clear();
    if (e.target.parentElement.className === "album-view-song-item") {  // this is triggered by the line
      // e.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;

      var songItem = getSongItem(e.target);
      if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
        songItem.innerHTML = playButtonTemplate;
      }
    }

  });

  for (var i = 0; i < songRows.length; i ++) {
    songRows[i].addEventListener('mouseleave', function(event) {  // removing these 3 lines will keep the button on for testing only
    // this.children[0].innerHTML = this.children[0].getAttribute('data-song-number'); // original statement
    // console.log(this.children[0].innerHTML)

      var songItem = getSongItem(event.target);
      var songItemNumber = songItem.getAttribute('data-song-number');
      if (songItemNumber !== currentlyPlayingSong) {
        songItem.innerHTML = songItemNumber;
      }
    });

    // when you click a songRow it will invoke the clickHandler callback function
    // it will pass the event to the clickHandler function
    songRows[i].addEventListener('click', function(event) {
      clickHandler(event.target)
    });
  }

}


//
