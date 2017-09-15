/* My JavaScript app to listen for clicks on the cat and then
   increment the click counter
*/

'use strict';

// How many times has the cat been clicked on?
var numClicks1 = 0;
var numClicks2 = 0;
var cat1Name = 'Zeus';
var cat2Name = 'Athena';

$('#cat_title1').text(cat1Name);
$('#cat_title2').text(cat2Name);

$('#cat_image1').click(function(e) {
  console.log('You clicked on cat 1!');
  numClicks1++;

  // Update click counter
  $('#catClicks1').text(numClicks1);
});

$('#cat_image2').click(function(e) {
  console.log('You clicked on cat 2!');
  numClicks2++;

  // Update click counter
  $('#catClicks2').text(numClicks2);
});
