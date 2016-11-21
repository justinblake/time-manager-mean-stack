var app = angular.module('MyApp');

app.service('HttpService', ['$http', function ($http) {
    var self = this;
    this.user = {};
    this.loggedIn = '';

    this.getUserInfo = function (input) {
        return $http.get('/user/' + input)
            .then(function (response) {
                self.user = response.data;
            })
    };

    this.getUserByUsername = function (input) {
        return $http.get('/user/username/' + input)
            .then( function (response) {
                self.user = response.data;
                return response.data;
            })
    };

    this.createNewUser = function (input) {
        return $http.post('/user/', input)
            .then(function (response) {
                self.user = response.data;
                return response.data._id;
            })
    };

    this.createNewTask = function (id, input) {
        return $http.post('/user/' + id + "/task/", input)
            .then(function (response) {
                self.user = response.data;
                return response.data;
            })
    };

    this.updateUserInfo = function(id, input) {

        return $http.put('/user/' + id, input)
            .then(function (response) {
                self.user = response.data;
            })
    };

    this.updateSpecificTask = function (userId, taskId, updatedTask) {

        var test3 = JSON.stringify(updatedTask);
        console.log("test3 " + test3);

        return $http.put('/user/' + userId + '/task/' + taskId, updatedTask)
            .then(function (response) {
                self.user = response.data;
                var test2 = JSON.stringify(self.user);
                console.log("test2 " + test2);
            })
    };

    this.deleteSpecificTask = function (id, taskId) {
        return $http.delete("/user/" + id + '/tasks/' + taskId)
            .then(function (response) {
                self.user = response.data;
            })
    };

    this.deleteUser = function (id) {
        return $http.delete('/user/' + id)
            .then( function(response) {
                self.user = response.data;
            })
    }

}]);