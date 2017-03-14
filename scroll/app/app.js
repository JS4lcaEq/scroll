(function () {

    function MainCtrl($scope) {
        var self = this;
        this.tmplt = "1 + 1 = {{1+ctrl.var}}";
        this.var = "VAR";
        this.src = [1, 2, 3];





    }

    angular.module('app', ["vaScrollDirective", "vs-repeat"]);

    angular.module('app').controller('MainCtrl', MainCtrl);

})();
