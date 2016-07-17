"use strict";

angular.module('app.directives', [])

    .directive('ccLogo', function () {
        return {
            restrict: 'AE',
            scope: {
                creditCardNo: '=',
                creditCardsInfo: '='
            },
            templateUrl: "../app/directives/ccLogo/ccLogo.html",
            replace: true,
            link: function (scope, element, attrs) {
                scope.$watch('creditCardNo', function () {

                    if (scope.creditCardNo && scope.creditCardNo.length > 4) {
                        //Check what company card number is typed
                        //and get the corresponding url
                        for (var value of scope.creditCardsInfo)
                        {
                            var pattern = new RegExp(value.regex);
                            if (scope.creditCardNo.match(pattern) !== null) {
                                //assign this url to the input field img
                                element[0].children[2].style.background = "white " + "url(" + value.imgUrl + ") left no-repeat";
                                return;
                            }
                        }
                        element[0].children[2].style.background = "white url(http://imgh.us/credit_3.png) left no-repeat";
                    }//if
                    else element[0].children[2].style.background = "white url(http://imgh.us/credit_3.png) left no-repeat";
                });//scope.watch
            }//link

        }//directive definition object

    });
