(function () {

    function fn($compile, $timeout ) {

        var items = [];

        function link(scope, element, attr) {
            scope.rr = [1, 2, 3];

            var i = '<p ng-repeat="item in rr">[' + element[0].innerHTML + ']</p>';
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
            , scope: {
                tmplt: '<?',
                vr: '<?'
            }
        }
    }

    angular.module("vaScrollDirective", []);

    angular.module("vaScrollDirective").directive("vaScroll", fn);

})();