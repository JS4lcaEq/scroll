(function () {




    function fn($timeout, $compile) {

        var items = [];

        function link(scope, element, attr) {
            var i = element[0].innerHTML;
            console.log("element = ", i);
            scope.$watch(
                function (scope) {
                    
                    // watch the 'compile' expression for changes
                    //return scope.$eval(attr.vaSrc);
                    return attr.vaSrc;
                },
                function (value) {
                    // when the 'compile' expression changes
                    // assign it into the current DOM
                    //element.html(value);
                    element.html(value);

                    // compile the new DOM and link it to the current
                    // scope.
                    // NOTE: we only compile .childNodes so that
                    // we don't get into infinite loop compiling ourselves
                    $compile(element.contents())(scope);
                }
            );

            scope.$watch("vaLength", function (value) {
                if (value) {
                    current.windowLength = value - 0;
                }
            });

            elements.box.on("scroll", function (e) {
                current.counts.scroll++;
                ;
                var scroll = elements.box[0].scrollTop;
                scope.scroll = scroll;

                //var diff = scroll - current.scroll;
                //if (scroll != 0) {
                //    current.counts.calculates++;
                //    console.log(current.counts.scroll, " / ", current.counts.calculates, " = ", current.scroll);
                //    if (current.scroll > 100) {
                //        setIndexes(current.indexes.start + 1);
                //        elements.box.scrollTop(scroll);
                //        scope.$apply();
                //    }
                //    if ((current.scroll < 100)) {
                //        setIndexes(current.indexes.start - 1);
                //        elements.box.scrollTop(scroll);
                //        scope.$apply();
                //    }
                //    //elements.box.scrollTop(50);
                //    //console.log("scroll", scroll, "current.indexes.start", current.indexes.start);

                //}


                var dScroll = Math.abs(scroll - current.scroll);

                if (dScroll >= current.heights.item || scroll == 0) {
                    scope.$apply(function () {
                        current.counts.calculates++;
                        //var margin = scroll / current.heights.item;

                        current.scroll = scroll;
                        var si = Math.round((scroll / current.heights.item));
                        elements.window.css("margin-top", scroll + "px"); //si * current.heights.item

                        setIndexes(si);
                        console.log("si:", si);
                    });



                }

                console.log(current.counts.scroll, " / ", current.counts.calculates, " = ", scroll, " / ", dScroll);

                //if (dScroll >= current.heights.item || scroll < current.heights.item || scroll > (current.heights.spacer - current.heights.item)) {
                //    var ntrvl = 1;
                //    if (current.bussy) {
                //        ntrvl = 50;
                //    }
                //    current.scroll = scroll;
                //    elements.window.css("margin-top", scroll + "px");
                //    console.log(scroll);
                //    if (current.intervals.scroll) {
                //        $timeout.cancel(current.intervals.scroll);
                //    }
                //    current.intervals.scroll = $timeout(function () {
                //        current.bussy = true;
                //        var si = Math.round(scroll / current.heights.item);

                //        $timeout(function () {
                //            setIndexes(si);
                //            current.bussy = false;
                //        }, 1);               
                //    }, ntrvl);
                //}


            });

            elements.box.on("resize", function (e) {
                scope.debug.resize = e;
                scope.$apply();
                console.log("resize");
            });

            function setIndexes(startIndex) {
                if (startIndex && startIndex >= 0 && startIndex <= current.indexes.max) {
                    current.indexes.start = startIndex;

                }
                current.indexes.end = getEndIndex(current.indexes.start, current.windowLength, current.indexes.max);
                scope.vaWindow.length = 0;
                scope.vaWindow = [];
                setWindow(scope.vaWindow, scope.vaSrc, current.indexes.start, current.indexes.end);

            }

        }



        return {
            templateUrl: function () { return "app/scroll/scrollDirective.html?t=" + Math.random(); }
            , link: link
            , transclude: true
            , scope: {
                vaSrc: "<?"
                , vaLength: "<?"
                , vaItemHeight: "<?"
                , vaWindow: "=?"
            }
        }
    }

    angular.module("vaScrollDirective", []);

    angular.module("vaScrollDirective").directive("vaScroll", fn);

})();