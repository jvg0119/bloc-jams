
// Example Album    moved to fixtures.js

////////////////////////////////////////////////////////
// assignment cp 32 jQuery: Next and Previous Buttons //
///////////////////////////////////////////////////////

// assigns currentlyPlayingSongNumber and
// currentSongFromAlbum
var setSong = function(songNumber) {
  currentlyPlayingSongNumber = parseInt(songNumber);
  currentSongFromAlbum = currentAlbum.songs[songNumber -1]
}

//currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
//currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

// returns the song number element that corresponds to that song number
// where do I get the parameter
var getSongNumberCell = function(number) {
  console.log('getSongNumberCell *** ');
  // $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
  return $('.song-item-number[data-song-number="' + number + '"]');
}

////////////////////////////////////////////////////////
// this is a template to create each of the song rows //
// also gives the button functionalities              //
////////////////////////////////////////////////////////
var createSongRow = function(songNumber, songName, songLength) {

  var template =
    '<tr class="album-view-song-item">'
    + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + '  <td class="song-item-title">' + songName + '</td>'
    + '  <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>'
    ;

  var $row = $(template); // creates the row template

  var clickHandler = function() {
    // console.log('this inside clickHandler ----<<<',  this)
    // var songNumber2 = $(this).attr('data-song-number');
    // console.log('songNumber2 =>>>> ', typeof(songNumber2));
    var songNumber = parseInt($(this).attr('data-song-number')); // parseInt() function to convert all song number references to integers
    // console.log('songNumber =>>>> ', typeof(songNumber));
    // if (currentlyPlayingSong !== null) {
    if (currentlyPlayingSongNumber !== null) {
    //  console.log('what is in currentlyPlayingSong =', currentlyPlayingSong)
	  // Revert to song number for currently playing song because user started playing new song.

    //  var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
      var currentlyPlayingCell = getSongNumberCell(songNumber).html(currentlyPlayingSongNumber);
      currentlyPlayingCell.html(currentlyPlayingSongNumber);

    }
    if (currentlyPlayingSongNumber !== songNumber) {
  		// Switch from Play -> Pause button to indicate new song is playing.
      $(this).html(pauseButtonTemplate);

      //////////////////////////////////////
      // replaceed with setSong() function
      // currentlyPlayingSongNumber = songNumber;
      // currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
      setSong(songNumber);

      // console.log('currentAlbum >>>> ', currentAlbum.title) // this is one of the song album in the song list
      // console.log('currentAlbum >>>> ', currentAlbum.artist)
      // console.log('currentAlbum >>>> ', currentAlbum.year+ ' ' + currentAlbum.label)
      updatePlayerBarSong();

      //console.log('currentSongFromAlbum = ', currentSongFromAlbum )
    } else if (currentlyPlayingSongNumber === songNumber) {
  		// Switch from Pause -> Play button to pause currently playing song.
      $(this).html(playButtonTemplate);
      $('.main-controls .play-pause').html(playerBarPlayButton); // returns the playerBarPlayButton
      currentlyPlayingSongNumber = null;
      currentSongFromAlbum = null;
  	}

    // console.log('after createSongRow ===========')
    // console.log('currentlyPlayingSongNumber = ',  currentlyPlayingSongNumber)
    // console.log('currentSongFromAlbum = ', currentSongFromAlbum)
    //
    // console.log('setSong = >>>>>>>>>>>>>>>> ', setSong(songNumber));


  }; // end of clickHandler function

  var onHover = function(event) {
    console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
    // console.log('onHover ***');
    // console.log(this === $row[0]); // true; this    is $row
    // console.log($row[0]);
    // songItem.innerHTML = playButtonTemplate;

    var songNumberCell = $(this).find('.song-item-number');

    // var songNumber = songNumberCell.attr('data-song-number');
    var songNumber = parseInt(songNumberCell.attr('data-song-number'));
    if (songNumber !== currentlyPlayingSongNumber){
      songNumberCell.html(playButtonTemplate); // replace songNumberCell to a playButtonTemplate
      //console.log("html() = ", songNumberCell.html());
    }
  }

  var offHover = function(event) {
    // console.log('offHover ***');
    var songNumberCell = $(this).find('.song-item-number');
    // var songNumber = songNumberCell.attr('data-song-number');
    var songNumber = parseInt(songNumberCell.attr('data-song-number'));
    if (songNumber !== currentlyPlayingSongNumber) {
      songNumberCell.html(songNumber); // replace songNumberCell back to the number
    }
  }

  $row.find('.song-item-number').click(clickHandler);
  $row.hover(onHover, offHover);
  return $row;

}; // createSongRow

// refactoring to jQuery
var setCurrentAlbum = function(album) { // default passing albumPicasso
  currentAlbum = album; // default currentAlbum is null now it is set to albumPicasso; this is a global variable

  // local jq variables
  var $albumTitle = $('.album-view-title');
  var $albumArtist = $('.album-view-artist');
  var $albumReleaseInfo = $('.album-view-release-info');
  var $albumImage = $('.album-cover-art');
  var $albumSongList = $('.album-view-song-list'); // songl list array

  // assigning to the album object using the text() method
  // replaces the text in album.html file (default text)
  $albumTitle.text(album.title);
  $albumArtist.text(album.artist);
  $albumReleaseInfo.text(album.year+ ' ' + album.label);
  $albumImage.attr('src', album.albumArtUrl);

  $albumSongList.empty(); // empty the albumSongList array then populate it using the for loop below

// this is what shows the ablum song informations in the app
  for (var i = 0; i < album.songs.length; i++) {
    var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    $albumSongList.append($newRow);
  }

} // end of setCurrentAlbum function

////////////////////////////////////////////////////////////////////
// trackIndex helper                                              //
// album is the array of songs                                    //
// song is the song's name in the album array                     //
// we're passing the song array as the album and the song         //
// we want it to return the indexOf the song that was passed      //
// helper is used by the next and previous functions              //
// see below: trackIndex(currentAlbum, currentSongFromAlbum)      //
////////////////////////////////////////////////////////////////////
var trackIndex = function(album, song) {
  // console.log('album is >>>>', album) // album passed at default or w/c ever is clicked
  // console.log('song is >>>>', song) // no song selected at default
  // console.log('album.songs is >>>', album.songs.length) // song is a function of object album: listing the songs
  // songs is a property function of album; it's a list a array of all the album properties; see the album object
  return album.songs.indexOf(song); // returns -1 when null otherwise returns the song index
}


var nextSong = function() {
    // console.log('currentlyPlayingSongNumber before next was clicked = ', currentlyPlayingSongNumber)
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum); // albumPicasso, null = -1
    // console.log('currentSongFromAlbum = ', currentSongFromAlbum) // previous song after next was clicked (global var)
    // console.log('before currentSongIndex++ >>>>', currentSongIndex)
    // Note that we're _incrementing_ the song here since this is the    next function
    currentSongIndex++; // increment -1 = 0 // this is the actual array index number
    // console.log('currentSongIndex = ', typeof(currentSongIndex)); // number
    // console.log('currentSongIndex** = ', currentSongIndex); // this becomes the lastSong

    if (currentSongIndex >= currentAlbum.songs.length) { // occurs only if currentSongIndex is the last song in the album
        currentSongIndex = 0;
        // console.log('start album over again from song index 1');
    }

    // Save the last song number before changing it
    var lastSongNumber = currentlyPlayingSongNumber; // this is the previous song
    // console.log('lastSongNumber = ', lastSongNumber)

    //////////////////////////////////////
    //    replaceed with setSong() function
    //    Set a new current song by incrementing it
    // currentlyPlayingSongNumber = currentSongIndex + 1; // incrementing the currentlyPlayingSongNumber w/c is
    // currentSongFromAlbum = currentAlbum.songs[currentSongIndex]; // this is the actual song from the songs array property
    // console.log('currentSongFromAlbum after w/c is current *= ', currentSongFromAlbum); // after
    setSong(currentSongIndex+1);

    // Update the Player Bar information
    updatePlayerBarSong(); // updates the playerBar info ... w/ song name & atrist name

    // new variables for  updating the  data-song-number
    var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    // console.log('$nextSongNumberCell before = &&&& ', $nextSongNumberCell); // previous song
    // console.log('$lastSongNumberCelll before = %%%% ', $lastSongNumberCell); // last song

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);

    // console.log('$nextSongNumberCell after = ', $nextSongNumberCell); // this is the current song (data-song-number) holds the number
    // console.log('$lastSongNumberCelll after = ', $lastSongNumberCell); // this is the last song (data-song-number) holds the number

}; // end of nextSong function

var previousSong = function() {
  // console.log("previousSong function!!!")
  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum); // returns the currentIndex from currentAlbum
  // console.log('currentSongIndex before decrementing >>> ', currentSongIndex)
  currentSongIndex--;
  //console.log('currentSongIndex after decrementing >>> ', currentSongIndex)

  if (currentSongIndex < 0) { // if currentSongIndex is the first song
    // console.log('first song!!!') // go to previous it go to last song
    currentSongIndex = currentAlbum.songs.length - 1;// currentSongIndex will be assigned to last song
    // console.log('currentSongIndex = ', currentSongIndex)
  }

  // console.log(currentAlbum)
  // console.log('currentSongFromAlbum = ', currentSongFromAlbum)
  // console.log('currentlyPlayingSongNumber before = ', currentlyPlayingSongNumber)

  //currentlyPlayingSongNumber += 1
  //console.log('currentlyPlayingSongNumber after = ', currentlyPlayingSongNumber)

  var lastSongNumber = currentlyPlayingSongNumber;
  // console.log('lastSongNumber = ', lastSongNumber)

  //////////////////////////////////////
  //    replaceed with setSong() function
  //  currentlyPlayingSongNumber = currentSongIndex + 1;
  //    currentSongFromAlbum = currentAlbum.songs[currentlyPlayingSongNumber - 1] // OK
  //  currentSongFromAlbum = currentAlbum.songs[currentSongIndex]; // better than above
  //    console.log('currentSongFromAlbum = ', currentSongFromAlbum)
  //    console.log(typeof(lastSongNumber))
  //    console.log('currentlyPlayingSongNumber = ', currentlyPlayingSongNumber);
  setSong(currentSongIndex+1);

  updatePlayerBarSong();

  $('.main-controls .play-pause').html(playerBarPauseButton);

  var $previousSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
  var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

  // console.log($previousSongNumberCell);
  // console.log($lastSongNumberCell);

  $previousSongNumberCell.html(pauseButtonTemplate);
  $lastSongNumberCell.html(lastSongNumber);

}


//////////////////////////////////////////////////////////////////////////
// updatePlayerBarSong(currentSongFromAlbum, currentlyPlayingSongNumber)
var updatePlayerBarSong = function() {
  // console.log('currentSong = ', currentSongFromAlbum.title)
  // console.log('currentAlbum = ', currentAlbum.artist);

  // updates the player bar
  $('.currently-playing .song-name').text(currentSongFromAlbum.title);
  $('.currently-playing .artist-name').text(currentAlbum.artist);
  $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist); // for mobile
  $('.main-controls .play-pause').html(playerBarPauseButton); // replaces playerBarPlayButton to playerBarPauseButton

}

///////////////////////////////////
// below are the global variables:
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

// var songRows = document.getElementsByClassName('album-view-song-item');
// var songItemNumber = document.getElementsByClassName('song-item-number').childNodes;

var currentAlbum = null; // album object default is null
var currentlyPlayingSongNumber = null; // formerly currentlyPlayingSong
var currentSongFromAlbum = null; // add this; it holds the currently playing song object from the songs array

var $previousButton = $('.main-controls .previous'); // previous button jq variable
var $nextButton = $('.main-controls .next'); // next button jq variable
// console.log('$previousButton >>> ',  $previousButton.text());
// console.log('$nextButton >>> ',  $nextButton.html());

///////////////////////////////////////////////////////
// ready function runs first after the DOM is loaded //
///////////////////////////////////////////////////////
$(document).ready(function() {
  // console.log('start now!')
  setCurrentAlbum(albumPicasso); //passed albumPicasso object

  // these 2 jq are event listerners (click functions) that triggers after a click event
  $previousButton.click(previousSong); // clicking $previousButton invokes function previousSong
  $nextButton.click(nextSong);

  // console.log('currentlyPlayingSongNumber = ',  currentlyPlayingSongNumber)
  // console.log('currentSongFromAlbum = ', currentSongFromAlbum)

//  console.log('songNumber = ', songNumber)

});

//////////////////////////////////////////////////////////////////////////////////////////////
//                                       end of js                                          //
//////////////////////////////////////////////////////////////////////////////////////////////



//
