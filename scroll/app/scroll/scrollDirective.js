(function () {

    function fn($compile, $timeout ) {

        var items = [];

        function link(scope, element, attr) {
            scope.rr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

            var i = '<ul><li ng-repeat="item in ctrl.rr">' + element[0].innerHTML + '</li></ul>';
            scope.v = 5;

            //element.html(i);
            //$compile(element.contents())(scope);

            scope.$watch("tmplt", function (value) {
                
                element.html(i);
                $compile(element.contents())(scope);
            });

            element.on("click", function (e) {

                scope.v++;
                scope.$apply();
            });



        }

        return {
            //templateUrl: function () { return "app/scroll/scrollDirective.html?t=" + Math.random(); } , 
              link: link
            , transclude: false
            , scope: true
        }
    }

    angular.module("vaScrollDirective", []);

    angular.module("vaScrollDirective").directive("vaScroll", fn);

})();