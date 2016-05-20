/// <reference path="../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../Scripts/typings/lodash/lodash.d.ts" />
/// <reference path="../Scripts/typings/moment/moment.d.ts" />


module Genscape.Mobile {

    export var app = angular.module("genscape.mobile", ['ionic', 'ionic.rating']);


        app.config(function ($stateProvider, $urlRouterProvider) {
                $stateProvider
                    .state('agenda', {
                        url: '/agenda',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/agenda.html',
                                controller: 'AgendaCtrl'
                            }
                        }
                    })
                .state('checkin', {
                    url: '/checkin',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/checkin.html',
                            controller: 'CheckinCtrl'
                        }
                    }
                })
                .state('ratings', {
                    url: '/ratings',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/ratings.html',
                            controller: 'RatingCtrl'
                        }
                    }
                })
                .state('signin', {
                    url: '/login',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/login.html',
                            controller: 'LoginCtrl'
                        }
                    }
                });
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/signin');
        });


}


