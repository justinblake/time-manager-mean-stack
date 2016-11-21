var app = angular.module('MyApp');

app.controller('LoginCtrl', ['$scope', '$location', '$sessionStorage', 'HttpService',
    function ($scope, $location, $sessionStorage, HttpService) {

        $scope.$storage = $sessionStorage;

        $scope.login = function (input) {
            console.log("input login.js  " + input);

            HttpService.getUserByUsername(input)
                .then(function (user) {
                    $scope.$storage.userId = user._id;
                    console.log(" $scope.$storage.userId " +  $scope.$storage.userId);
                    $location.path('/landing');
                });
        }

    }]);
