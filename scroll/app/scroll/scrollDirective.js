(function () {

    function extractItemName(src) {
        var m = src.match(/(\S+)\s+in/i);
        if (m && m.length > 0) {
            return m[1];
        }
        return null;
    }

    function extractSrcName(src) {
        var m = src.match(/in\s+(\S+)/i);
        if (m && m.length > 0) {
            return m[1];
        }
        return null;
    }

    function replaceSrcNameToWindow(src) {
        var ret = src.replace(/in\s+\S+/i, "in window");
        return ret;
    }

    function fn($timeout, $compile) {

        function link(scope, element, attr, ctrl, transclude) {
            
            var current = { transcludeHtml: null };
            transclude(scope, function (clone, scope) {
                scope.window = [1, 2, 3];
                current.transcludeHtml = clone[0].outerHTML;
                var template = '<p ng-repeat="' + replaceSrcNameToWindow(attr.vaSrc) + '">' + current.transcludeHtml + '</p>';
                console.log("template=", template);
                element.html(template);
                $compile(element.contents())(scope);


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
                    console.log(extractItemName(attr.vaSrc), " in ", extractSrcName(attr.vaSrc) );
                    
                    

                    
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