(function () {

    function MainCtrl($scope) {
        var self = this;
        var elements = { box: $("#vsBx"), win: $("#vsWndw") };
        var s0 = 0;
        elements.box.on("scroll", function (e) {
            var s = e.originalEvent.srcElement.scrollTop;
            if (Math.abs(s - s0) > 19) {
            elements.win.css("margin-top", s + "px");
            s0 = s;
            console.log(s);
            }
            

        });
        this.test = "test";
        this.cnt = 100;
        this.src = [];//[{ index: 0, descr: "Descr[0] = 0" }];
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

    angular.module('app', ["vaScrollDirective", "vs-repeat"]);

    angular.module('app').controller('MainCtrl', MainCtrl);

})();
