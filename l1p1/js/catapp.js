/* My JavaScript app to listen for clicks on the cat and then
   increment the click counter
*/

'use strict';

// Data
class cat {
  constructor(name, picture, clicks) {
    this.name = name;
    this.picture = picture;
    this.clicks = clicks;
  }
};

var cat1 = new cat('Mercury', 'cat1.jpg', 0);
var cat2 = new cat('Venus', 'cat2.jpg', 0);
var cat3 = new cat('Mars', 'cat3.jpg', 0);
var cat4 = new cat('Jupiter', 'cat4.jpg', 0);
var cat5 = new cat('Saturn', 'cat5.jpg', 0);
var cat6 = new cat('Neptune', 'cat6.jpg', 0);

var cats = [cat1, cat2, cat3, cat4, cat5, cat6];


// Program
for (var i = 0; i < cats.length; i++) {
  // Current cat
  var icat = cats[i];

  $('#catList').append('<li id="cat' + (i + 1) + '">' + icat.name + '</li>');
  $('#cat' + (i + 1)).on('click', (function(iSaved, icatSaved) {
    return function() {
      console.log('You clicked on cat' + (iSaved + 1) + ' from the list!');
      $('#catTitle').text(icatSaved.name);
      $('#catImage').attr('src', 'img/' + icatSaved.picture);
      $('#catClicks').text(icatSaved.clicks);
      $('#catImage').on('click', function() {
        icatSaved.clicks++;
        $('#catClicks').text(icatSaved.clicks);
      });
    };
  })(i, icat));
};
