(function () {

    function MainCtrl($scope) {
        var self = this;
        this.test = "test";
        this.cnt = 100;
        this.src = null;//[{ index: 0, descr: "Descr[0] = 0" }];
        this.len = 10;
        this.window = [];
        this.index = 0;
        this.debug = {};
        this.srcReady = true;
        this.srcDataReady = true;
        this.clicked = null;
        this.hovered = {};
        this.vaCurrentIndex = -1;
        this.fillSrc = function (count) {
            var self = this;
            if (count == undefined)
                count = 1;
            if (!self.src) {
                self.src = [];
            }
            self.src.length = 0;
            self.src = null;
            self.src = [];
            for (var i = 0; i < count; i++) {
                self.src.push({ index: i, descr: "Descr [" + i + "] = " + Math.random() + " text " });
            }
            if (self.src[0]) {
                self.src[0].descr += " loooong loooong";
            }

            self.srcDataReady = true;
            self.srcReady = false;
        };




    }

    angular.module('app', ["vaScrollDirective", "vaOscilloscopeDirective"]);

    angular.module('app').controller('MainCtrl', MainCtrl);

})();
