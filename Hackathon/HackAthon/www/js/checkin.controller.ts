/// <reference path="aapp.ts" />
/// <reference path="../scripts/typings/googlemaps/google.maps.d.ts" />
/// <reference path="../scripts/typings/markerclustererplus/markerclustererplus.ts" />

module Genscape.Mobile {

    export class CheckinCtrl {

        public mapView;
        public static $inject: string[] = ["$scope", "CheckinService"];

        constructor(public $scope: any, public CheckinService: CheckinService) {
            this.GetCurrentLocation();
            
        }

        GetCurrentLocation() {

            this.CheckinService.location = new UserLocation();
           
            navigator.geolocation.getCurrentPosition((position: any) => {
                //console.log(position);
                this.CheckinService.location = position["coords"];
                console.log(this.CheckinService.location.latitude);
                console.log(this.CheckinService.location.longitude);

                this.CheckinService.GetLocation().then((response: any) => {
                    console.log(response["results"][0]["address_components"][4]["short_name"]);
                });
                this.DrawMap(this.CheckinService.location.latitude, this.CheckinService.location.longitude, document.getElementById('map'));
            });

        }

        DrawMap(latitude: any, longitude: any, mapDiv: Element) {
            var options = {
                center: new google.maps.LatLng(latitude, longitude),
                MapTypeId: google.maps.MapTypeId.ROADMAP,
                zoom: 15,
                name: "GoogleMaps"
            }
          
            var map = new google.maps.Map(mapDiv, options);
            var marker = new google.maps.Marker({
                position: options.center,
                map: map,
            });

        }

        LoadRecentCheckinsList() {
            var Checkins = this.CheckinService.GetRecentCheckins(15)


        }

    }

    app.controller("CheckinCtrl", CheckinCtrl);



    export class UserLocation {

        public latitude: number;
        public longitude: number;

    }


    interface MapInterface {
        name: string;
        location: string;
        country: string;
        latitude: number;
        longitude: number;
        icontype: string;

    }

}