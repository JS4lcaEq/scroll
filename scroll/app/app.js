(function () {

    function MainCtrl($scope) {
        var self = this;
        this.tmplt = "1 + 1 = {{1+var}}";





    }

    angular.module('app', ["vaScrollDirective", "vs-repeat"]);

    angular.module('app').controller('MainCtrl', MainCtrl);

})();
