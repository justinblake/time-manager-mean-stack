var app = angular.module('MyApp', ['ngRoute', 'ngStorage']);

app.controller('MainCtrl', ['$scope', "$sessionStorage", "$location",
    function ($scope, $sessionStorage, $location) {

        $scope.$storage = $sessionStorage;

        $scope.logOut = function () {
            delete $sessionStorage.userId;
            $location.path('/');
        };

        $scope.myAccount = function () {
            if ($sessionStorage.userId) {
                $location.path('/account');
            } else {
                $location.path('/');
            }
        };

        $scope.myTasks = function () {
            if ($sessionStorage.userId) {
                $location.path('/landing');
            } else {
                $location.path('/');
            }
        }

    }]);
