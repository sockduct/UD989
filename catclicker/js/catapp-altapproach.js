for (var i = 0; i < cats.length; i++) {
    var icat = cats[i];

    // add a class of .cat and a data-index attribute to all cats
    $('#cat_list').append('<li class="cat" data-index="' + i + '">' + icat.name + '</li>');
    //                         ^^^^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^
};


var catSaved = null;                              // move this outside the event listener to be visible for both event listeners
$('#cat_list').on('click', '.cat', function(e) {  // whenever a .cat element get clicked from within #cat_list element
    var index = $(this).data('index');            // get the index of that cat from cats array (previously stored in data-index)
    catSaved = cats[index];                       // get the cat itself

    $('#cat_title').text(catSaved.name);
    $('#cat_image').attr('src', 'img/' + catSaved.picture);
    $('#catClicks').text(catSaved.clicks);
});

$('#cat_image').on('click', function() {          // move this event listener outside, to set it only once
    if(catSaved) {                                // if we have a catSaved element
        catSaved.clicks++;                        // ...
        $('#catClicks').text(catSaved.clicks);
    }
});

