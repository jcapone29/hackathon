module Genscape.Mobile {

    export class AgendaService {

        agendaItems = new Array<Topic>();
        apiUrl = "http://team6hackathon.azurewebsites.net/api/";
        public static $inject: string[] = ["$http", "$q"];

        constructor(private $http: angular.IHttpService, private $q: angular.IQService) {


        }



        getAgenda() {

            return this.$http.get(this.apiUrl + "agenda_items").then(r => r.data);
        }

    }

    app.service("AgendaService", AgendaService);
}