/// <reference path="../scripts/typings/googlemaps/google.maps.d.ts" />
/// <reference path="../scripts/typings/markerclustererplus/markerclustererplus.ts" />
module Genscape.Mobile {

    export class CheckinService {

        location: UserLocation
        public GoogleMapsLocation = "http://maps.googleapis.com/maps/api/geocode/json?latlng="

        public static $inject: string[] = ["$http", "$q"];

        constructor(private $http: angular.IHttpService, private $q: angular.IQService) {

        }

        GetRecentCheckins(TimeInPastInMinutes: number) {
            


        }

        GetLocation() {

            var loc = this.GoogleMapsLocation + this.location.latitude + "," + this.location.longitude + "&sensor=true";
            return this.$http.get(loc).then(r => r.data);
        }

        GetDistanceFromLatLonInKm(lat2: number, lon2: number): number {
            var lat1 = this.location.latitude;
            var lon1 = this.location.longitude;

            var deg2rad = deg => {

                return deg * Math.PI / 180;
            }

            var r = 6371;
            var dlat = deg2rad(lat2 - lat1);
            var dlon = deg2rad(lon1 - lon2);
            var a = Math.sin(dlat / 2) * Math.sin(dlat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dlon / 2) * Math.sin(dlon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = r * c;
            d = d * 0.621371;
            d = +d.toPrecision(3);
            return d;
        }
    }

    app.service("CheckinService", CheckinService);

}