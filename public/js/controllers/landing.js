var app = angular.module('MyApp');

app.controller('LandingCtrl', ['$scope', 'HttpService', "$sessionStorage", function ($scope, HttpService, $sessionStorage) {

    $scope.$storage = $sessionStorage;


    // make create new task visible
    $scope.showCreateTask = false;

    // make editable fields visible
    $scope.showEditableFields = false;

    // show all tasks
    $scope.showAllTasks = true;

    $scope.showCreateNewTask = function () {
        $scope.showCreateTask = !$scope.showCreateTask;
    };

    $scope.showExistingTask = function () {
        $scope.showCreateTask = false;
        $scope.showAllTasks = !$scope.showAllTasks;
    };


    $scope.makeUpdatePossible = function () {
        $scope.showEditableFields = true;
    };


    //------------------------ All HTTP Requests ---------------------------

    // get user info on page load


    HttpService.getUserInfo($scope.$storage.userId)
        .then(function () {
            $scope.userObject = HttpService.user;
            $scope.loopThroughTime($scope.userObject);
        });

    // create new task

    $scope.createNewTask = function (input) {
        HttpService.createNewTask($scope.$storage.userId, input)
            .then(function () {
                $scope.userObject = HttpService.user;
                $scope.event = {};
            });
        HttpService.getUserInfo($scope.$storage.userId)
        .then(function () {
            $scope.userObject = HttpService.user;
            $scope.loopThroughTime($scope.userObject);
        });
        $scope.showAllTasks = true;
        $scope.showCreateTask = !$scope.showCreateTask;
        $scope.counter = 0;

    };

    // update existing task

    $scope.updateSpecificTask = function (index, updatedTask) {
        $scope.showEditableFields = false;
        var taskId = $scope.userObject.tasks[index]._id;

        var test = JSON.stringify(updatedTask);
        console.log("test " + test);
        HttpService.updateSpecificTask($scope.$storage.userId, taskId, updatedTask)
            .then(function () {
                $scope.userObject = HttpService.user;
                $scope.loopThroughTime($scope.userObject);
            });
        // HttpService.getUserInfo($scope.$storage.userId)
        //     .then(function () {
        //         $scope.userObject = HttpService.user;
        //     });

    };

    // delete specific task
    // test

    $scope.deleteSpecificTask = function (id) {
        HttpService.deleteSpecificTask($scope.$storage.userId, id._id)
            .then(function () {
                $scope.userObject = HttpService.user;
            })
    };


//    start and end time picker

    $scope.timeArray = ["8:00am", "8:15am", "8:30am", "8:45am", "9:00am", "9:15am", "9:30am", "9:45am", "10:00am", "10:15am", "10:30am",
        "10:45am", '11:00am', "11:15am", "11:30am", "11:45am", "12:00pm", "12:15pm", "12:30pm", "12:45pm", "1:00pm", "1:15pm", "1:30pm",
        "1:45pm", "2:00pm", "2:15pm", "2:30pm", "2:45pm", "3:00pm", "3:15pm", "3:30pm", "3:45pm", "4:00pm", "4:15pm", "4:30pm",
        "4:45pm", "5:00pm", "5:15pm", "5:30pm", "5:45pm", "6:00pm"];

    $scope.defaultTimeAray = ["8:00am", "8:15am", "8:30am", "8:45am", "9:00am", "9:15am", "9:30am", "9:45am", "10:00am", "10:15am", "10:30am",
        "10:45am", '11:00am', "11:15am", "11:30am", "11:45am", "12:00pm", "12:15pm", "12:30pm", "12:45pm", "1:00pm", "1:15pm", "1:30pm",
        "1:45pm", "2:00pm", "2:15pm", "2:30pm", "2:45pm", "3:00pm", "3:15pm", "3:30pm", "3:45pm", "4:00pm", "4:15pm", "4:30pm",
        "4:45pm", "5:00pm", "5:15pm", "5:30pm", "5:45pm", "6:00pm"];


    $scope.timeSpan = [];



    $scope.counter = 0;

    $scope.selectTimeSpan = function (input) {
        $scope.timeSpan.push(input);

        if ($scope.counter === 0) {
           $scope.event.startTime = $scope.timeArray[input];
        } else if ($scope.counter === 1) {
           $scope.event.endTime = $scope.timeArray[input];
        }
        $scope.counter += 1;
    };


    $scope.loopThroughTime = function(input) {

        for(var i = 0; i < input.tasks.length; i++) {
            var first = $scope.timeArray.indexOf(input.tasks[i].startTime);
            var second = $scope.timeArray.indexOf(input.tasks[i].endTime);
            $scope.timeArray.splice(first, second);
        }
    };

    $scope.replaceTime = function(){};



}]);