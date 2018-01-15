
// console.log('album.js file test');
// Example Album    moved to fixtures.js

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
    //return template;
    // refactor to return a jQuery template object

    ///////////////////////////////////////////
    // refactor again per 31 jQuery: Play/Pause
    // return $(template);
    var $row = $(template);


    var clickHandler = function() {
      // clickHandler logic
      var songNumber = $(this).attr('data-song-number');

	    if (currentlyPlayingSong !== null) {
		  // Revert to song number for currently playing song because user started playing new song.
		    var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
		      currentlyPlayingCell.html(currentlyPlayingSong);
        }
    	if (currentlyPlayingSong !== songNumber) {
    		// Switch from Play -> Pause button to indicate new song is playing.
    	   $(this).html(pauseButtonTemplate);
    		 currentlyPlayingSong = songNumber;
       } else if (currentlyPlayingSong === songNumber) {
    		// Switch from Pause -> Play button to pause currently playing song.
        $(this).html(playButtonTemplate);
    		currentlyPlayingSong = null;
    	}
    };

    var onHover = function(event) {
      console.log('onHover ***');
      console.log(this === $row[0]); // true; this    is $row
      console.log($row[0]);
      // songItem.innerHTML = playButtonTemplate;
      var songNumberCell = $(this).find('.song-item-number');
      var songNumber = songNumberCell.attr('data-song-number');
      //console.log('songNumber = ', songNumber);
      if (songNumber !== currentlyPlayingSong){
        songNumberCell.html(playButtonTemplate);
        // console.log("html() = ", songNumberCell.html());
      }
      //console.log('currentlyPlayingSong = ',  currentlyPlayingSong)
    }

    // replacing this below:
    // songListContainer.addEventListener('mouseover', function(e) {
    //   if (e.target.parentElement.className === "album-view-song-item") {
    //     var songItem = getSongItem(e.target);
    //     if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
    //       songItem.innerHTML = playButtonTemplate;
    //     }
    //   }
    // });

    var offHover = function(event) {
      // console.log('offHover ***');
      var songNumberCell = $(this).find('.song-item-number');
      var songNumber = songNumberCell.attr('data-song-number');
      if (songNumber !== currentlyPlayingSong) {
        //console.log('boo test !!!')
        songNumberCell.html(songNumber);
        //console.log('songNumberCell = ', songNumberCell);
      }
    }

    // replacing this below:
    // songRows[i].addEventListener('mouseleave', function(event) {  // removing these 3 lines will keep the button on for testing only
    // // this.children[0].innerHTML = this.children[0].getAttribute('data-song-number'); // original statement
    // // console.log(this.children[0].innerHTML)
    //
    //   var songItem = getSongItem(event.target);
    //   var songItemNumber = songItem.getAttribute('data-song-number');
    //   if (songItemNumber !== currentlyPlayingSong) {
    //     songItem.innerHTML = songItemNumber;
    //   }
    // });

    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;

 };

// refactoring to jQuery
var setCurrentAlbum = function(album) {

  currentAlbum = album;
  // console.log('setCurrentAlbum is now running!')

  // these variables come from album.html file
  // var albumTitle = document.getElementsByClassName('album-view-title')[0];
  // var albumArtist = document.getElementsByClassName('album-view-artist')[0];
  // var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
  // var albumImage = document.getElementsByClassName('album-cover-art')[0];
  // var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
  // refactor to jQuery
  var $albumTitle = $('.album-view-title');
  var $albumArtist = $('.album-view-artist');
  var $albumReleaseInfo = $('.album-view-release-info');
  var $albumImage = $('.album-cover-art');
  var $albumSongList = $('.album-view-song-list');

  // console.log('albumTitle = ', albumTitle ===  $albumTitle); // false ?

  // these are for the album title:
  //albumTitle.firstChild.nodeValue = album.title;  // assigning albumTitle.firstChild.nodeValue to    album.title
                                                  // album is being passed as an paramter to function setCurrentAlbum
  // console.log('albumTitle.firstChild.nodeValue = ',  albumTitle.firstChild.nodeValue) // this is from the album.html file
                                                                                         // var albumTitle above is set assigned to document.getE  ...
  // console.log('album.title = ', album.title) // this is from the data above; album is being passed to this function

  // these are putting (or replacing) the new values or content since album is the paramter being passed here
  // albumArtist.firstChild.nodeValue = album.artist;
  // albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
  // albumImage.setAttribute('src', album.albumArtUrl);

  // refactor the above to jQuery below:
  $albumTitle.text(album.title);
  $albumArtist.text(album.artist);
  $albumReleaseInfo.text(album.year+ ' ' + album.label);
  $albumImage.attr('src', album.albumArtUrl);


  // this is for the songlist:
  //albumSongList.innerHTML = ''; // start w/ an empty list
  $albumSongList.empty();

  // album is being passed to function setCurrentAlbum
  // album.songs    songs is a property of album; see above data for var albumPicasso = { ...
  // here we're cycling through the album.songs using for loop
  for (var i = 0; i < album.songs.length; i++) { // album is the object being passed to the function

    //albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    //console.log(albumSongList.innerHTML)
    //$albumSongList.append(createSongRow(i + 1, album.songs[i].title, album.songs[i].duration)) // OK
    var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    $albumSongList.append($newRow);
  }

}


/*

/////////////////////////////
// checkpoint 27 DOM Scripting: Play/Pause Part 2

var findParentByClassName = function(element, targetClass) {
    if (element) {  // checking to make sure there is an element
        var currentParent = element.parentElement;  // assigning the parentElement to a variable
        // console.log(' ***** currentParent = ', currentParent); // checking only
        while (currentParent.className !== targetClass && currentParent.className !== null) {
            currentParent = currentParent.parentElement;  // if the 2 conditions above are false do this
        }
        return currentParent;  // this is the return or output
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

*/

///////////////////////////////////
// below are the global variables:
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
// var currentlyPlayingSong = null; // start w/ no songs playing until play is clicked // renamed to currentlyPlayingSongNumber

// var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
// console.log(songListContainer);
// var playButtonTemplate = "<a class=""><span class='ion-android-arrow-dropright-circle'></span></a>"
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

// var songRows = document.getElementsByClassName('album-view-song-item');

// var songItemNumber = document.getElementsByClassName('song-item-number').childNodes;
// console.log('songItemNumber = ',   songItemNumber);

var currentAlbum = null;
var currentlyPlayingSongNumber = null; // formerly currentlyPlayingSong
var currentSongFromAlbum = null; // add this; it holds the currently playing song object from the songs array

$(document).ready(function() {
  setCurrentAlbum(currentAlbum);
  // setCurrentAlbum(albumPicasso);

  // mouseover or onHover


  //  for (i = 0; i < songRows.length; i++) {

    // mouseleave or offHover

    // songRows[i].addEventListener('click', function(event) {
    // clickHandler(event.target)
    // });

  // }


});





/////////////////////
// testing only remove after; do not send to github

  // window is always global
  // this changes depending on where it's at
  //  console.log('currentlyPlayingSongNumber = ', currentlyPlayingSongNumber);
  //  console.log('this.currentlyPlayingSongNumber = ', this.currentlyPlayingSongNumber);
  //  console.log('window.currentlyPlayingSongNumber = ', window.currentlyPlayingSongNumber);

  // console.log('booo = '+  currentlyPlayingSongNumber === this.currentlyPlayingSongNumber);
  // console.log(window.myTest)
  // console.log('window = ', window)
  // console.log('this = ', this)
  // console.log('inside =',  window === this)
  // console.log('window === this >>> ', window === this)

////////////////////////
// delete later

/*

//$(document).ready(function () {
//$(window).load(function() {
//window.onload = function() {
  console.log(myTest)
  console.log('outside window =' + window)
  console.log('outside this = '+ this)
  console.log('window === this >>> ', window === this)
  var myMy = function() {
    console.log("myMy function!!!!!!!");
    console.log('inside myMy this = '+ this)
    console.log('inside myMy window = '+ window)
    console.log('this.myTest = '+ this.myTest)
    console.log('window.myTest = '+ window.myTest)
    console.log('myTest = '+ myTest)
  }
  myMy();
//}

*/





/*

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

*/

//
