
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
      + '  <td class="song-item-number">' + songNumber + '</td>'
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


window.onload = function() {
  setCurrentAlbum(albumPicasso);
  // setCurrentAlbum(albumMarconi); // you can use the other data above

 };


//
