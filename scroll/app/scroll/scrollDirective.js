(function () {

    function fn($timeout, $compile) {

        function link(scope, element, attr, ctrl, transclude) {
            var current = { transcludeHtml: null };
            transclude(scope, function (clone, scope) {
                current.transcludeHtml = clone[0].outerHTML;
            });

            var i = element;
            //console.log("transcludeHtml = ", current.transcludeHtml);
            scope.$watch(
                function (scope) {
                    
                    // watch the 'compile' expression for changes
                    //return scope.$eval(attr.vaSrc);
                    return attr.vaSrc;
                },
                function (value) {
                    console.log(attr.vaSrc);
                    var template = '<p ng-repeat="' + attr.vaSrc + '">' + current.transcludeHtml + '</p>'
                    //console.log("value = ", value);
                    // when the 'compile' expression changes
                    // assign it into the current DOM
                    //element.html(value);
                    element.html(template);

                    // compile the new DOM and link it to the current
                    // scope.
                    // NOTE: we only compile .childNodes so that
                    // we don't get into infinite loop compiling ourselves
                    $compile(element.contents())(scope);
                }
            );


        }



        return {
            link: link
            , transclude: true
            , scope: true
        }
    }

    angular.module("vaScrollDirective", []);

    angular.module("vaScrollDirective").directive("vaScroll", fn);

})();