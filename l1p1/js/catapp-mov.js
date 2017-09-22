/* My JavaScript app to listen for clicks on the cat and then
   increment the click counter

   Refactored to use Model-Octopus-View design pattern
*/

'use strict';

class cat {
    constructor(name, picture, clicks) {
        this.name = name;
        this.picture = picture;
        this.clicks = clicks;
    }
};

$(function() {
    var model = {
        init: function() {
            // Purge if exists - start from scratch every time:
            if (localStorage.cats) {
                localStorage.removeItem('cats');
            }
            localStorage.cats = JSON.stringify([]);

            model.addCats();
        },

        addCats: function() {
            var cats = [
                new cat('Mercury', 'cat1.jpg', 0),
                new cat('Venus', 'cat2.jpg', 0),
                new cat('Mars', 'cat3.jpg', 0),
                new cat('Jupiter', 'cat4.jpg', 0),
                new cat('Saturn', 'cat5.jpg', 0),
                new cat('Neptune', 'cat6.jpg', 0)
            ];

            localStorage.cats = JSON.stringify(cats);
        },

        getCats: function() {
            return JSON.parse(localStorage.cats);
        }
    };

    var octopus = {
        getCat: function(i) {
            var cats = model.getCats();

            return cats[i];
        },

        getCats: function() {
            return model.getCats();
        },

        updateCat: function(i, cat) {
            var cats = model.getCats();

            cats[i] = cat;
            localStorage.cats = JSON.stringify(cats);
        },

        init: function() {
            model.init();
            viewCatList.init();
            viewSelectedCat.init();
        }
    };

    var viewCatList = {
        init: function() {
            this.catList = $('#catList');
            viewCatList.render();
        },

        render: function() {
            var cats = octopus.getCats();

            for (var i = 0; i < cats.length; i++) {
              // Current cat
              var icat = cats[i];

              this.catList.append('<li id="cat' + (i + 1) + '">' + icat.name + '</li>');
              $('#cat' + (i + 1)).on('click', (function(iSaved) {
                return function() {
                    viewSelectedCat.render(iSaved);
                };
              })(i));
            };
        }
    };

    var viewSelectedCat = {
        init: function(cat) {
            this.catTitle = $('#catTitle');
            this.catImage = $('#catImage');
            this.catClickCaption = $('#catClickCaption');
            // Could add this back in as span element, but need to deal with adding
            // catClickCaption text
            // this.catClicks = $('#catClicks');
            this.currentCat = $('#currentCat');

            this.catImage.on('click', function() {
                // Don't convert to a number because the number 0 equivalent to false!
                var i = viewSelectedCat.currentCat.text();
                if (i) {
                    i = Number(i);
                    var cat = octopus.getCat(i);
                } else {
                    console.log('currentCat not defined - skipping click handler...');
                    cat = null;
                }

                if (cat) {
                    cat.clicks++;
                    octopus.updateCat(i, cat);

                    // Add this back if can deal with mixing clicks and text
                    // catClicks.text(cat.clicks);
                    viewSelectedCat.catClickCaption.text("So far, you've clicked me " + cat.clicks + " times.");
                }
            });
        },

        render: function(i) {
            var cat = octopus.getCat(i);

            console.log('You clicked on cat' + (i + 1) + ' from the list.');
            this.catTitle.text(cat.name);
            this.catImage.attr('src', 'img/' + cat.picture);
            // The text should really only be displayed once.  After that, only
            // the clicks should be incremented - left for future improvement:
            this.catClickCaption.text("So far, you've clicked me " + cat.clicks + " times.");
            this.currentCat.text(i);
        }
    };

    octopus.init();
});
