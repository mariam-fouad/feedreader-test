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


        /* tests to make sure that the
        * allFeeds object url has been defined and that it is not
        * empty. 
        */

         it('should have a URL defined and not empty',()=>{
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
                
            });
         });


        /*tests to make sure that the
        * allFeeds object name has been defined and that it is not
        * empty. 
        */

        it('should have a name defined and not empty',()=>{
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
                
            });
         });
    });


    /* test suite for the menu*/
    describe('The menu',()=>{

        const body = document.querySelector('body');

        /*tests to ensures the menu element is
        * hidden by default
        */
        it('should be hidden by default',()=>{
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

        /* test that ensures the menu changes
        * visibility when the menu icon is clicked.
        */
        it('should change visibility when clicked',()=>{
            const menuIcon = document.querySelector('.menu-icon-link');

            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);

            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });
        

    /* test suite Initial Entries */
    describe ('Initial Entries',()=>{

        /* run the asynchronousfunction before the each test */
        beforeEach ((done)=>{
            loadFeed(0,done);
        });

        /* test that ensures when the loadFeed
        * function is called and completes its work, there is at least
        * a single .entry element within the .feed container.
        */
        it('should have at least a single entry element within the feed container ',(done)=>{
            const feedContainer = document.querySelectorAll('.feed .entry');
            expect(feedContainer.length).toBeGreaterThanOrEqual(1);
            done();
        });
    });
        

    /*test suite New Feed Selection */
    describe ('New Feed Selection',()=>{
        
       let firstCallFeed , secondCallFeed;

       /* call the loadFeed with two different ids*/
        beforeEach (done=>{
            loadFeed(0,()=>{
                firstCallFeed = document.querySelector('.feed').innerHTML;

                loadFeed(1,()=>{
                    secondCallFeed= document.querySelector('.feed').innerHTML;;
                });

                done();
            });
        });

        /* test that ensures when a new feed is loaded
        * by the loadFeed function that the content actually changes.
        */
        it('should ensures when a new feed is loaded that the content actually changes',(done)=>{
            expect(firstCallFeed).not.toBe(secondCallFeed);
            done();
        })
    });
        
}());
