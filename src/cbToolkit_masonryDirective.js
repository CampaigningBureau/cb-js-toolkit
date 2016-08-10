/**
 * Angular Module "Masonry"
 *
 * @description This is a incredible simple module to combine Angular with Masonry
 *              The element with the attribute "masonry" becomes the masonry container.
 *              Each item inside the container needs the "masonry-brick" attribute set.
 *
 *              The "masonry-element" controller will initialize and save the MasonryObject as a Scope variable
 *              The "masonry-brick-elements" will append and remove themselves automatically
 *
 *              UPDATE (27.01.2014):
 *              The directive will push elements into masonry in their correct order defined by the markup.
 *
 *              UDPATE (29.01.2014):
 *              Load Masonry options from attributes - since masonry doesn't load it automatically
 *
 *              UDPATE (30.01.2014):
 *              Add a reset load index event handler
 *
 *              UPDATE (03.02.2014):
 *              Rewrite functionality for a more generic use
 *
 * @author Michael Scharl <michael.scharl@me.com>
 */

angular.module('cbToolkit_masonry', [])

    .value('masonryLoad', {index: 0})

    // Create the directive that initializes masony and saves it reference
    .directive('masonry', [function() {
        var $masonry = {};

        // Restrict the directive to an attribute
        $masonry.restrict = 'A';

        // Create the controller
        $masonry.controller = ["$scope", "$element", "$attrs", 'masonryLoad', function($scope, $element, $attributes, masonryLoad) {

            // Load Masonry options from attributes
            var masonryOptions = angular.fromJson($attributes.masonryOptions);

            // Create Masonry and save it to the scope
            $scope.$masonry = new Masonry($element[0], masonryOptions);

            // Add handler to reset the load index
            $scope.$on('masonry.reset.loadindex', function() {
                masonryLoad.index = 0;
            });

        }];

        return $masonry;
    }])


    // Create the directive that handles the binding and unbinding of each masonry child item
    .directive('masonryBrick', [function() {
        var $brick = {};

        // Restrict the directive to an attribute
        $brick.restrict = 'A';

        $brick.controller = [ '$scope', '$element', 'masonryLoad', '$rootScope', function($scope, $element, masonryLoad, $rootScope) {

            // init Flags
            var loadedForWall = false, // Will tell us if the element is ready to be displayed
                showingOnWall = false; // Will tell us if the element is hidden or not

            // Hide the element for startup
            $element.hide();

            function showLoadedElement() {
                // If the element is loaded, not displayed and the next in the queue
                if(loadedForWall && !showingOnWall && $scope.$index === masonryLoad.index) {

                    // Show the element
                    $element.show();

                    // Tell masonry about it
                    $scope.$masonry.appended($element[0]);

                    // Set the show flag to true
                    showingOnWall = true;

                    // Increment the load index
                    masonryLoad.index += 1;

                    // Remove own Listener
                    showNextEventListener();

                    // Tell everyone we are ready to show the next item
                    $rootScope.$broadcast('masonry.show.next');
                }
            }


            //Add Element to Masonry after all images are loaded
            setTimeout(function() {
                imagesLoaded($element, function() { $scope.$apply(function() {
                    // We can save that our element is ready to be displayed
                    loadedForWall = true;
                    showLoadedElement();
                });});
            }, 100); // we use this timeout to ensure that all markup is already written into the DOM - otherwise "imagesLoaded" will not get our images


            var showNextEventListener = $scope.$on('masonry.show.next', function() {
                showLoadedElement();
            });

            // Remove Element from Masonry when it´s removed from the DOM
            $scope.$on('$destroy', function() {
                // Remove the element from Masonry
                $scope.$masonry.remove($element[0]);
                // Tell masonry to re-layout
                $scope.$masonry.layout();
            });

        }];

        return $brick;
    }])
;
