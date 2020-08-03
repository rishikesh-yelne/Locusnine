(function () {
    'use strict';

    angular
        .module('locusApp')
        .factory('userFactory', userFactory);

    userFactory.$inject = ['$http'];

    function userFactory($http) {
        
        var service = {
            getAllUsers: getAllUsers,
            editUser: updateUser,
            addUser: createUser,
            removeUser: deleteUser
        };
        
        function getAllUsers() {
            return $http.get('../Users/GetAllUsers');
        }

        function updateUser(userModel) {
            return $http.patch('../Users/EditUser', userModel);
        }

        function createUser(userModel) {
            return $http.post('../Users/AddUser', userModel);
        }

        function deleteUser(userID) {
            return $http.delete('../Users/DeleteUser/' + JSON.stringify(userID));
        }

        return service;
        
    }
})();