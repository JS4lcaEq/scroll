(function () {

    var s = document.getElementsByTagName('script');
    var scriptUrl = s[s.length - 1].src;
    var scriptPath = scriptUrl.replace(/(.*\/)(.*\.js)/i, "$1");
    var t = Math.random();

    function fn($interval) {

        var items = [];

        function link(scope, element, attr) {
            elements = { canvas: element.find("canvas") };
            setWidth();
            setHeight();
            var context = elements.canvas[0].getContext("2d");

            function setWidth() {
                elements.canvas[0].width = elements.canvas.width();
            }

            function setHeight() {
                elements.canvas[0].height = elements.canvas.height();
            }

            scope.$watch("vaSrc", function (newValue) {
                if (newValue) {
                    elements.canvas[0].width = elements.canvas[0].width;
                    for (var i = 0; i < scope.vaSrc.length; i++) {
                        context.fillRect(i, 5, 1, scope.vaSrc[i]);
                    }
                }
            });
        }



        return {
            templateUrl: function () { return scriptPath + "oscilloscopeDirective.html?t=" + t; }
            , link: link
            , transclude: true
            , scope: {
                vaSrc: "<?"
            }
        }
    }

    angular.module("vaOscilloscopeDirective", []);

    angular.module("vaOscilloscopeDirective").directive("vaOscilloscope", fn);

})();