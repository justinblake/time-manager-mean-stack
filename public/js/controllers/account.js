var app = angular.module('MyApp');

app.controller('AccountCtrl', ["$scope", '$sessionStorage', 'HttpService', "$location",
    function($scope, $sessionStorage, HttpService, $location) {

    $scope.$storage = $sessionStorage;

    $scope.editUserInfo = false;

    HttpService.getUserInfo($scope.$storage.userId)
        .then(function () {
            $scope.userObject = HttpService.user;
        });

    $scope.updateUserInfo = function(input) {

        console.log("input " + input);
        console.log("input " + input._id);

        HttpService.updateUserInfo($scope.$storage.userId, input)
            .then( function() {
                $scope.userObject = HttpService.user;
                console.log("$scope.userObject " + $scope.userObject);
            });
        HttpService.getUserInfo($scope.$storage.userId)
        .then(function () {
            var test = JSON.stringify($scope.userObject);
            console.log("test " + test);
            $scope.userObject = HttpService.user;
        });
    };

    $scope.deleteUser = function() {
        HttpService.deleteUser($scope.$storage.userId);
        delete $sessionStorage.userId;
            $location.path('/');
    }

}]);