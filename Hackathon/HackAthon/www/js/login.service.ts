module Genscape.Mobile {

    export class LoginService {

        apiUrl = "http://team6hackathon.azurewebsites.net/api/";
        user = new UserInfo();

        public static $inject: string[] = ["$http", "$q"];

        constructor(private $http: angular.IHttpService, private $q: angular.IQService) {



        }


        getUser() {



            return this.$http.get(this.apiUrl + "users?email=" + this.user.Email + "&password=" + this.user.Password +"").then(r => r.data);
        }

      

    }

    app.service("LoginService", LoginService);
}