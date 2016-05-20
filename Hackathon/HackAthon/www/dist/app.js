/// <reference path="../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../Scripts/typings/lodash/lodash.d.ts" />
/// <reference path="../Scripts/typings/moment/moment.d.ts" />
var Genscape;
(function (Genscape) {
    var Mobile;
    (function (Mobile) {
        Mobile.app = angular.module("genscape.mobile", ['ionic', 'ionic.rating']);
        Mobile.app.config(function ($stateProvider, $urlRouterProvider) {
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
    })(Mobile = Genscape.Mobile || (Genscape.Mobile = {}));
})(Genscape || (Genscape = {}));
/// <reference path="aapp.ts" />
var Genscape;
(function (Genscape) {
    var Mobile;
    (function (Mobile) {
        var AgendaCtrl = (function () {
            function AgendaCtrl($scope, agendaService, loginService, _) {
                this.$scope = $scope;
                this.agendaService = agendaService;
                this.loginService = loginService;
                this._ = _;
                this.getAgenda();
            }
            AgendaCtrl.prototype.getAgenda = function () {
                var _this = this;
                this.agendaService.getAgenda().then(function (response) {
                    var now = new Date(Date.now());
                    _.forEach(response, function (a) {
                        a.StartTime = new Date(moment(a.StartTime).format('YYYY-MM-DD HH:mm:ss'));
                        a.EndTime = new Date(moment(a.EndTime).format('YYYY-MM-DD HH:mm:ss'));
                        if (now > a.StartTime && now < a.EndTime) {
                            a.Current = true;
                        }
                        else {
                            a.Current = false;
                        }
                        if (now > a.EndTime) {
                            a.Active = false;
                        }
                        else {
                            a.Active = true;
                        }
                    });
                    _this.agendaService.agendaItems = response;
                    console.log(_this.agendaService.agendaItems);
                });
            };
            AgendaCtrl.$inject = ["$scope", "AgendaService", "LoginService"];
            return AgendaCtrl;
        }());
        Mobile.AgendaCtrl = AgendaCtrl;
        Mobile.app.controller("AgendaCtrl", AgendaCtrl);
    })(Mobile = Genscape.Mobile || (Genscape.Mobile = {}));
})(Genscape || (Genscape = {}));
var Genscape;
(function (Genscape) {
    var Mobile;
    (function (Mobile) {
        var AgendaService = (function () {
            function AgendaService($http, $q) {
                this.$http = $http;
                this.$q = $q;
                this.agendaItems = new Array();
                this.apiUrl = "http://team6hackathon.azurewebsites.net/api/";
            }
            AgendaService.prototype.getAgenda = function () {
                return this.$http.get(this.apiUrl + "agenda_items").then(function (r) { return r.data; });
            };
            AgendaService.$inject = ["$http", "$q"];
            return AgendaService;
        }());
        Mobile.AgendaService = AgendaService;
        Mobile.app.service("AgendaService", AgendaService);
    })(Mobile = Genscape.Mobile || (Genscape.Mobile = {}));
})(Genscape || (Genscape = {}));
// Type definitions for MarkerClustererPlus for Google Maps V3 2.1.1
// Project: http://github.com/mahnunchik/markerclustererplus
// Definitions by: Mathias Rodriguez <http://github.com/enanox>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
/// <reference path="../googlemaps/google.maps.d.ts" />
/// <reference path="aapp.ts" />
/// <reference path="../scripts/typings/googlemaps/google.maps.d.ts" />
/// <reference path="../scripts/typings/markerclustererplus/markerclustererplus.ts" />
var Genscape;
(function (Genscape) {
    var Mobile;
    (function (Mobile) {
        var CheckinCtrl = (function () {
            function CheckinCtrl($scope, CheckinService) {
                this.$scope = $scope;
                this.CheckinService = CheckinService;
                this.GetCurrentLocation();
            }
            CheckinCtrl.prototype.GetCurrentLocation = function () {
                var _this = this;
                this.CheckinService.location = new UserLocation();
                navigator.geolocation.getCurrentPosition(function (position) {
                    //console.log(position);
                    _this.CheckinService.location = position["coords"];
                    console.log(_this.CheckinService.location.latitude);
                    console.log(_this.CheckinService.location.longitude);
                    _this.CheckinService.GetLocation().then(function (response) {
                        console.log(response["results"][0]["address_components"][4]["short_name"]);
                    });
                    _this.DrawMap(_this.CheckinService.location.latitude, _this.CheckinService.location.longitude, document.getElementById('map'));
                });
            };
            CheckinCtrl.prototype.DrawMap = function (latitude, longitude, mapDiv) {
                var options = {
                    center: new google.maps.LatLng(latitude, longitude),
                    MapTypeId: google.maps.MapTypeId.ROADMAP,
                    zoom: 15,
                    name: "GoogleMaps"
                };
                var map = new google.maps.Map(mapDiv, options);
                var marker = new google.maps.Marker({
                    position: options.center,
                    map: map,
                });
            };
            CheckinCtrl.prototype.LoadRecentCheckinsList = function () {
                var Checkins = this.CheckinService.GetRecentCheckins(15);
            };
            CheckinCtrl.$inject = ["$scope", "CheckinService"];
            return CheckinCtrl;
        }());
        Mobile.CheckinCtrl = CheckinCtrl;
        Mobile.app.controller("CheckinCtrl", CheckinCtrl);
        var UserLocation = (function () {
            function UserLocation() {
            }
            return UserLocation;
        }());
        Mobile.UserLocation = UserLocation;
    })(Mobile = Genscape.Mobile || (Genscape.Mobile = {}));
})(Genscape || (Genscape = {}));
/// <reference path="../scripts/typings/googlemaps/google.maps.d.ts" />
/// <reference path="../scripts/typings/markerclustererplus/markerclustererplus.ts" />
var Genscape;
(function (Genscape) {
    var Mobile;
    (function (Mobile) {
        var CheckinService = (function () {
            function CheckinService($http, $q) {
                this.$http = $http;
                this.$q = $q;
                this.GoogleMapsLocation = "http://maps.googleapis.com/maps/api/geocode/json?latlng=";
            }
            CheckinService.prototype.GetRecentCheckins = function (TimeInPastInMinutes) {
            };
            CheckinService.prototype.GetLocation = function () {
                var loc = this.GoogleMapsLocation + this.location.latitude + "," + this.location.longitude + "&sensor=true";
                return this.$http.get(loc).then(function (r) { return r.data; });
            };
            CheckinService.prototype.GetDistanceFromLatLonInKm = function (lat2, lon2) {
                var lat1 = this.location.latitude;
                var lon1 = this.location.longitude;
                var deg2rad = function (deg) {
                    return deg * Math.PI / 180;
                };
                var r = 6371;
                var dlat = deg2rad(lat2 - lat1);
                var dlon = deg2rad(lon1 - lon2);
                var a = Math.sin(dlat / 2) * Math.sin(dlat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dlon / 2) * Math.sin(dlon / 2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                var d = r * c;
                d = d * 0.621371;
                d = +d.toPrecision(3);
                return d;
            };
            CheckinService.$inject = ["$http", "$q"];
            return CheckinService;
        }());
        Mobile.CheckinService = CheckinService;
        Mobile.app.service("CheckinService", CheckinService);
    })(Mobile = Genscape.Mobile || (Genscape.Mobile = {}));
})(Genscape || (Genscape = {}));
var Genscape;
(function (Genscape) {
    var Mobile;
    (function (Mobile) {
        var UserInfo = (function () {
            function UserInfo() {
            }
            return UserInfo;
        }());
        Mobile.UserInfo = UserInfo;
        var Topic = (function () {
            function Topic() {
            }
            return Topic;
        }());
        Mobile.Topic = Topic;
    })(Mobile = Genscape.Mobile || (Genscape.Mobile = {}));
})(Genscape || (Genscape = {}));
/// <reference path="aapp.ts" />
var Genscape;
(function (Genscape) {
    var Mobile;
    (function (Mobile) {
        var LoginCtrl = (function () {
            function LoginCtrl($scope, loginService, $state, $location, $ionicHistory) {
                this.$scope = $scope;
                this.loginService = loginService;
                this.$state = $state;
                this.$location = $location;
                this.$ionicHistory = $ionicHistory;
                this.loading = false;
                this.checkUser();
            }
            LoginCtrl.prototype.checkUser = function () {
                this.loginService.user.Email = localStorage.getItem("AgendaUser");
                this.loginService.user.Password = localStorage.getItem("AgendaPassword");
                if (this.loginService.user.Email === null || this.loginService.user.Email === '' || this.loginService.user.Password === null || this.loginService.user.Password === '') {
                    console.log(this.loginService.user);
                    this.loginService.user = new Mobile.UserInfo();
                    this.$ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                    this.$state.go('signin');
                    this.loading = false;
                }
                else {
                    this.$ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                    this.$state.go('agenda');
                }
            };
            LoginCtrl.prototype.userCache = function () {
                localStorage.setItem("AgendaUser", this.loginService.user.Email);
                localStorage.setItem("AgendaPassword", this.loginService.user.Password);
            };
            LoginCtrl.prototype.cleatCache = function () {
                localStorage.clear();
                this.$state.go('signin');
            };
            LoginCtrl.prototype.getUser = function () {
                var _this = this;
                this.loginService.getUser().then(function (response) {
                    console.log(response);
                    _this.loginService.user = response;
                    _this.userCache();
                    _this.checkUser();
                });
            };
            LoginCtrl.$inject = ["$scope", "LoginService", "$state", "$location", "$ionicHistory"];
            return LoginCtrl;
        }());
        Mobile.LoginCtrl = LoginCtrl;
        Mobile.app.controller("LoginCtrl", LoginCtrl);
    })(Mobile = Genscape.Mobile || (Genscape.Mobile = {}));
})(Genscape || (Genscape = {}));
var Genscape;
(function (Genscape) {
    var Mobile;
    (function (Mobile) {
        var LoginService = (function () {
            function LoginService($http, $q) {
                this.$http = $http;
                this.$q = $q;
                this.apiUrl = "http://team6hackathon.azurewebsites.net/api/";
                this.user = new Mobile.UserInfo();
            }
            LoginService.prototype.getUser = function () {
                return this.$http.get(this.apiUrl + "users?email=" + this.user.Email + "&password=" + this.user.Password + "").then(function (r) { return r.data; });
            };
            LoginService.$inject = ["$http", "$q"];
            return LoginService;
        }());
        Mobile.LoginService = LoginService;
        Mobile.app.service("LoginService", LoginService);
    })(Mobile = Genscape.Mobile || (Genscape.Mobile = {}));
})(Genscape || (Genscape = {}));
/// <reference path="aapp.ts" />
var Genscape;
(function (Genscape) {
    var Mobile;
    (function (Mobile) {
        var RatingCtrl = (function () {
            function RatingCtrl($scope, ratingService, agendaService) {
                this.$scope = $scope;
                this.ratingService = ratingService;
                this.agendaService = agendaService;
                this.agendaItems = new Array();
                this.agendaItems = this.agendaService.agendaItems;
                this.agendaItems.forEach(function (item) {
                    item.RatingRate = 0;
                    item.RatingMax = 5;
                });
            }
            RatingCtrl.$inject = ["$scope", "RatingService", "AgendaService"];
            return RatingCtrl;
        }());
        Mobile.RatingCtrl = RatingCtrl;
        Mobile.app.controller("RatingCtrl", RatingCtrl);
    })(Mobile = Genscape.Mobile || (Genscape.Mobile = {}));
})(Genscape || (Genscape = {}));
var Genscape;
(function (Genscape) {
    var Mobile;
    (function (Mobile) {
        var RatingService = (function () {
            function RatingService($http, $q) {
                this.HostedURL = "http://team6hackathon.azurewebsites.net/api/";
                this.qService = $q;
                this.httpService = $http;
            }
            RatingService.prototype.GetTopics = function () {
                return this.httpService.get(this.HostedURL + "events").then(function (r) { return r.data; });
            };
            RatingService.prototype.SetRating = function (rating) {
                return this.httpService.post(this.HostedURL + "rating", rating).then(function (response) {
                    return response;
                });
            };
            RatingService.$inject = ["$http", "$q"];
            return RatingService;
        }());
        Mobile.RatingService = RatingService;
        Mobile.app.service("RatingService", RatingService);
    })(Mobile = Genscape.Mobile || (Genscape.Mobile = {}));
})(Genscape || (Genscape = {}));
//# sourceMappingURL=app.js.map