/// <reference path="aapp.ts" />

module Genscape.Mobile {

    export class LoginCtrl {

        loading = false;

        public static $inject: string[] = ["$scope", "LoginService", "$state", "$location", "$ionicHistory"];

        constructor(public $scope: any, public loginService: LoginService, public $state: any, public $location: any, public $ionicHistory: any) {

            this.checkUser();
        }

        checkUser() {

            this.loginService.user.Email = localStorage.getItem("AgendaUser");
            this.loginService.user.Password = localStorage.getItem("AgendaPassword");

            if (this.loginService.user.Email === null || this.loginService.user.Email === '' || this.loginService.user.Password === null || this.loginService.user.Password === '') {
                console.log(this.loginService.user);
                this.loginService.user = new UserInfo();
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


        }


        userCache() {

            localStorage.setItem("AgendaUser", this.loginService.user.Email);
            localStorage.setItem("AgendaPassword", this.loginService.user.Password);
        }

        cleatCache() {

            localStorage.clear();
            this.$state.go('signin');
        }

        getUser() {

            this.loginService.getUser().then((response: any) => {

           console.log(response);

                this.loginService.user = response;
                this.userCache();
                
                this.checkUser();
            });

        }
    }


    app.controller("LoginCtrl", LoginCtrl);
}