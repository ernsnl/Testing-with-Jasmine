/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */


$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */

    function validateUrl(value) {
        return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
    }
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        describe('have name property', function() {
            it('which is defined', function() {
                allFeeds.forEach(function(element, index) {
                    expect(element.name).toBeDefined();
                });
            });
            it('which is not empty', function() {
                allFeeds.forEach(function(element, index) {
                    expect(element.name.length).not.toBe(0);
                });
            });
        });

        describe('have url property', function() {
            it('which is defined', function() {
                allFeeds.forEach(function(element, index) {
                    expect(element.url).toBeDefined();
                });
            });
            it('which is not empty', function() {
                allFeeds.forEach(function(element, index) {
                    expect(element.url.length).not.toBe(0);
                });
            });
            it('which is valid', function() {
                allFeeds.forEach(function(element, index) {
                    expect(validateUrl(element.url)).toBe(true);
                });
            });
        });
    });


    describe('The menu', function() {
        var bodyClass = document.body.classList


        var simulateClick = function() {
            $('.menu-icon-link').click();
        };
        it('is hidden', function() {
            expect(bodyClass).toContain('menu-hidden');
        });

        it('can toggle visiblity correctly', function() {
            simulateClick();
            expect(bodyClass).not.toContain('menu-hidden');
            simulateClick();
            expect(bodyClass).toContain('menu-hidden');
        });


    });

    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('have at least one entry', function(done) {
            var childList = $('.feed').children('.entry-link');
            expect(childList.length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function() {
        var prev, newF;
        beforeEach(function(done) {
            loadFeed(0, function() {
                prev = $('.feed').html();
                loadFeed(1, function() {
                    newF = $('.feed').html();
                    done();
                });
            });
        });

        it('has different content', function(done) {
            expect(prev).not.toMatch(newF);
            done();
        });
    });
}());
