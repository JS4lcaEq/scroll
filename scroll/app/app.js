(function () {

    function MainCtrl($scope) {
        var self = this;
        this.tmplt = "1 + 1 = {{1+var}}";
        this.rr = [1, 2, 3];





    }

    angular.module('app', ["vaScrollDirective", "vs-repeat"]);

    angular.module('app').controller('MainCtrl', MainCtrl);

})();
