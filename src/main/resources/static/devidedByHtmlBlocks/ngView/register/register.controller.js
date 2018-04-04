﻿(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', '$rootScope','AuthenticationService', 'FlashService'];
    function RegisterController(UserService, $location, $rootScope, AuthenticationService, FlashService) {

        var vm = this;
        vm.interests=[];
        vm.register = register;

        vm.pushUserInterest = function(interest){
            vm.interests.push(interest);

        };

        var AuthenticateNewUser = function(){
            vm.dataLoading = true;
            AuthenticationService.Login(vm.user.username, vm.user.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.user.username, vm.user.password);
                    $location.path('/');
                } else {
                    vm.dataLoading = false;
                    FlashService.Error(response.message);

                }
            });
        };


        function register() {

            vm.dataLoading = true;
            vm.user.interests = vm.interests
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response == "OK") {
                        FlashService.Success('Registration successful', true);
                        AuthenticateNewUser();
                        // $rootScope.globals.currentUser.username = vm.user.username;

                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });


        }
        vm.confirmPassword = function(form){

            if(vm.user.password == vm.repeat_password){
                form.repeat_password.$setValidity("password", true);
            }else{
                form.repeat_password.$setValidity("password", false);
            }
        };


    }

})();
