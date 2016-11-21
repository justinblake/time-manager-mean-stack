var app = angular.module('MyApp');

app.controller('RegisterCtrl', ['$scope', "HttpService", "$location", "$sessionStorage",
    function ($scope, HttpService, $location, $sessionStorage) {

        $scope.$storage = $sessionStorage;


        $scope.createNewUser = function (input) {
            HttpService.createNewUser(input)
                .then(function (user) {
                    $scope.thisIsTheUser = HttpService.user;
                    if ($scope.thisIsTheUser === "error") {
                        $scope.duplicate = "This is a duplicate";
                        $scope.hideDuplicateWarning = true;
                    } else {
                        $scope.$storage.userId = user;
                        $location.path('/landing');
                    }
                });

        };

        $scope.hideDuplicateWarning = false;

    }]);


