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
            
            var current = { transcludeHtml: null, srcName: null };
            transclude(scope, function (clone, scope) {
                scope.window = [1, 2, 3];
                current.transcludeHtml = clone[0].outerHTML;
                var template = '<li ng-repeat="' + replaceSrcNameToWindow(attr.vaSrc) + '">' + current.transcludeHtml + '</li>';
                console.log("template=", template);
                element.html(template);
                $compile(element.contents())(scope);
                current.srcName = extractSrcName(attr.vaSrc); 

            });

            var i = element;

            scope.$watch(current.srcName, function (a, b) {
                scope.window = a;

                console.log("b[" + current.srcName + "] = ", a);
            });

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