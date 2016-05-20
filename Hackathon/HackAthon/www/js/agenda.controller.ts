
/// <reference path="aapp.ts" />
module Genscape.Mobile {


    export class AgendaCtrl {

       

        public static $inject: string[] = ["$scope", "AgendaService","LoginService"];

        constructor(public $scope: any, public agendaService: AgendaService, public loginService: LoginService, public _: _.LoDashStatic) {
            this.getAgenda();
           
        }

        getAgenda() {


            this.agendaService.getAgenda().then((response: Array<Topic>) => {

                let now = new Date(Date.now());

                _.forEach(response, a => {

                  
                    a.StartTime = new Date(moment(a.StartTime).format('YYYY-MM-DD HH:mm:ss'));
                    a.EndTime = new Date(moment(a.EndTime).format('YYYY-MM-DD HH:mm:ss'));
                    if (now > a.StartTime && now < a.EndTime) {
                        a.Current = true;
                    } else {
                        a.Current = false;
                    }

                    if (now > a.EndTime) {
                        a.Active = false;
                    }
                    else {
                        a.Active = true;
                    }

                   
                });

                this.agendaService.agendaItems = response;
                console.log(this.agendaService.agendaItems);

            });

        }

    }

    app.controller("AgendaCtrl", AgendaCtrl);

}

