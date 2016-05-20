module Genscape.Mobile {



    export class RatingService {

        private qService: ng.IQService;
        private httpService: ng.IHttpService;

        public HostedURL: string = "http://team6hackathon.azurewebsites.net/api/";

        public static $inject: string[] = ["$http", "$q"];

        constructor($http: angular.IHttpService, $q: angular.IQService) {
            this.qService = $q;
            this.httpService = $http;
        }

        public GetTopics() {
            return this.httpService.get(this.HostedURL + "events").then(r => r.data);
        }

        public SetRating(rating: Rating) {
            return this.httpService.post(this.HostedURL + "rating", rating).then(function (response) {
                return response;
            });
        }
    }

    app.service("RatingService", RatingService);
}
