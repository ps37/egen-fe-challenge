'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
    'ui.router',
    'app.directives'
])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/usersList');

    }])
    .controller("mainCtrl", ['$scope', '$http', function mainController($scope, $http) {
        $scope.creditCardNo = "";
        $http.get("creditCardsInfo.json").success(function (data) {
            $scope.creditCardsInfo = data.result;
        })
            .error(function (data) {})

    }]);
