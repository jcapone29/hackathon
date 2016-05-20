/// <reference path="aapp.ts" />
module Genscape.Mobile {

    export class RatingCtrl {

        agendaItems = new Array<Topic>();

        public static $inject: string[] = ["$scope", "RatingService", "AgendaService"];

        constructor(public $scope: any, public ratingService : RatingService, public agendaService : AgendaService) {

            this.agendaItems = this.agendaService.agendaItems;
            this.agendaItems.forEach(function(item) {
                item.RatingRate = 0;
                item.RatingMax = 5;
            });
        }
    }

    app.controller("RatingCtrl", RatingCtrl);
}
