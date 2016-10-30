(function () {

    function getSpacerHeight(srcLength, windowLength, itemHeight, boxHeight) {
        var ret = (srcLength + windowLength) * itemHeight;
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

    function fn($interval) {

        var items = [];

        function link(scope, element, attr) {
            scope.debug = {};
            var elements = {
                box: element.find(".va-scroll")
                , spacer: element.find(".va-scroll-spacer")
                , window: element.find(".va-scroll-window") 
            };

            var current = { heights: { item: 10, spacer: 0, box: 0 }, indexes: {start:0, end: 0, max: 0} , windowLength: 10  };

            scope.$watch("vaSrc", function (value) {
                if (value) {
                    current.indexes.max = value.length - 1;
                    current.heights.box = elements.box.height();
                    current.heights.spacer = getSpacerHeight(scope.vaSrc.length, current.windowLength, current.heights.item, current.heights.box);
                    elements.spacer.height(current.heights.spacer);
                    setIndexes(current.indexes.start);
                }
            });

            elements.box.on("scroll", function (e) {
                var scroll = elements.box.scrollTop;
                
                setIndexes(Math.round(scroll / (current.heights.item)));
                elements.window.css("margin-top", scroll + "px");
                //scope.debug.indexes = current;
                
                //console.log(current.indexes);
                scope.$apply();
            });

            elements.box.on("resize", function (e) {
                scope.debug.resize = e;
                scope.$apply();
                console.log("resize");
            });

            function setIndexes(startIndex) {
                current.indexes.start = startIndex;
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