var app = angular.module('MyApp');

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'html/home.html',
            controller: 'HomeCtrl'
        })
        .when('/login', {
            templateUrl: 'html/login.html',
            controller: 'LoginCtrl'
        })
        .when('/register', {
            templateUrl: 'html/register.html',
            controller: 'RegisterCtrl'
        })
        .when('/landing', {
            templateUrl: 'html/landing-page.html',
            controller: 'LandingCtrl'
        })
        .when('/account', {
            templateUrl: 'html/account.html',
            controller: 'AccountCtrl'
        })
});
