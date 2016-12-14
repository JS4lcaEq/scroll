(function () {

    function getSpacerHeight(srcLength, windowLength, itemHeight, boxHeight) {
        var ret = (srcLength + 1) * itemHeight;
        //var ret = (srcLength) * itemHeight;
        if (ret < boxHeight) {
            ret = boxHeight;
        }
        return ret;
    }

    function getEndIndex(startIndex, windowLength, maxIndex) {
        var ret = startIndex + windowLength;
        if (ret > maxIndex) {
            ret = maxIndex;
        }
        return ret;
    }

    function setWindow(window, src, startIndex, endIndex) {
        window.length = 0;
        for (var i = startIndex; i <= endIndex; i++) {
            window.push(src[i]);
        }
    }

    function stat(data, input) {
        if (input < 100) {
            if (!data[input]) {
                data[input] = 0;
            }
            data[input]++;
        }

    }

    function fn($timeout) {

        var items = [];

        function link(scope, element, attr) {
            var date = new Date();

            scope.debug = {};

            var elements = {
                box: element.find(".va-scroll")
                , spacer: element.find(".va-scroll-spacer")
                , window: element.find(".va-scroll-window")
            };

            var current = {
                heights: { item: 20, spacer: 0, box: 0 }
                , indexes: { start: 0, end: 0, max: 0 }
                , windowLength: 10
                , triggers: {}
                , counts: { scroll: 0, calculates: 0 }
                , timers: { scroll: date.getTime() }
                , intervals: { scroll: null }
                , stat: []
                , bussy: false
                , scroll: 0
            };

            scope.counts = { scroll: 0 };

            scope.$watch("vaSrc", function (value) {
                if (value) {
                    current.indexes.max = value.length - 1;
                    current.heights.box = elements.box.height();
                    current.heights.spacer = getSpacerHeight(scope.vaSrc.length, current.windowLength, current.heights.item, current.heights.box);
                    elements.spacer.height(current.heights.spacer);
                    elements.window.height(current.heights.box);
                    setIndexes(current.indexes.start);
                }
            });

            scope.$watch("vaLength", function (value) {
                if (value) {
                    current.windowLength = value - 0;
                }
            });

            elements.box.on("scroll", function (e) {
                current.counts.scroll++;
;
                var scroll = elements.box[0].scrollTop;

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


                var dScroll = Math.abs( scroll - current.scroll);
                
                if (dScroll >= current.heights.item) {
                    current.counts.calculates++;
                    //var margin = scroll / current.heights.item;
                    
                    current.scroll = scroll;
                    var si = Math.round(scroll / current.heights.item);
                    elements.window.css("margin-top", si * current.heights.item + "px");
                    setIndexes(si);
                    scope.$apply();
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