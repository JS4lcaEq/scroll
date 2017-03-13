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



        }



        return {
            //templateUrl: function () { return "app/scroll/scrollDirective.html?t=" + Math.random(); }
            link: link
            , transclude: false
            , scope: true
        }
    }

    angular.module("vaScrollDirective", []);

    angular.module("vaScrollDirective").directive("vaScroll", fn);

})();