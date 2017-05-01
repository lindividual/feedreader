/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* all the tests are place within the $() function.
 * since some of the tests may require DOM elements,
 * we have to ensure all the test don't run until the DOM is ready.
 */
$(function() {
  //test suite for "RSS Feeds"
  describe('RSS Feeds', function() {
    
    it('are defined', function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
    });

    it('each feed has a url defined and the url is not empty', function() {
      allFeeds.forEach(function(feed){
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
      });
    });

    it('each feed has name defined and the name is not empty', function() {
      allFeeds.forEach(function(feed){
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);
      });
    });
  });

  //test suite for the menu
  describe('The menu', function() {

    var body = document.body;
    var menuIcon = $('.menu-icon-link');
    it('hidden by default', function() {
      expect(body.classList).toContain('menu-hidden');
    });

    //This test ensures click menu icon will toggle the menu display
    //so it needs to trigger the clikc event twice 
    it('click menu icon can toggle the menu display', function() {
      //click to show
      menuIcon.trigger('click');
      expect(body.classList).not.toContain('menu-hidden');
      //click to hide
      menuIcon.trigger('click');
      expect(body.classList).toContain('menu-hidden');
    });
  });

  //test suite for initisl enteries
  describe('Initial Enteries', function() {
    beforeEach(function(done) {
      loadFeed(0, done);
    });

    it('loadFeed is done', function(done) {
      expect($('.feed .entry').length).toBeGreaterThan(0);
      done();
    });
  });

  //test suite for new feed selection
  //This test needs to compare the feed content before and after the new feed is loaded
  //store the content before new feed loaded in var "initFeed"
  //store the content after new feed loader in var "newFeed"
  describe('New Feed Selection', function() {
    var initFeed;
    var newFeed;

    beforeEach(function(done) {
      loadFeed(0, function() {
        initFeed = $('.feed').html();
        done();
      });
    });

    it('when new feed is loaded, content actually changes', function(done) {
      loadFeed(1, function() {
        newFeed = $('.feed').html();  
        expect(initFeed).not.toEqual(newFeed);
        done();
      });       
    });
  });
}());
