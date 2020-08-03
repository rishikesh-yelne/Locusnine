(function () {
    'use strict';

    angular
        .module('locusApp')
        .controller('userController', userController);

    userController.$inject = ['$scope', 'userFactory'];

    function userController($scope, userFactory) {

        //Sorting
        $scope.sortColumn = "name";
        $scope.reverseSort = false;
        $scope.sortImgSrc = '../Resources/ico_sorting.svg';

        //Sorting Icon
        $scope.sortUserList = function (column) {
            $scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort : false;
            $scope.sortImgSrc = $scope.reverseSort
                ? '../Resources/ico_sortingReverse.svg'
                : '../Resources/ico_sorting.svg'
        }

        //Add Or Edit Modal
        $scope.modalJob = "";
        $scope.modalUser = "";
        $scope.deleteFlag = false;

        $scope.modalClick = function (jobName, user) {
            //reset validation checks
            $scope.validationFlag = false;
            $scope.validationMsg = "";

            //Delete Button in Edit Modal only
            $scope.deleteFlag = jobName == 'Add User' ? false : true;
            
            //assign job name and model values
            $scope.modalJob = jobName;
            $scope.modalUser = user == '' ?
                { id: '', name: '', email: '', roleType: 'Admin', mobileNumber: '', status: '' } :
                angular.copy(user);
            $scope.modalUser.mobileNumber = isNaN(parseInt($scope.modalUser.mobileNumber)) 
                ? ''
                : parseInt($scope.modalUser.mobileNumber);
        }

        $scope.validationFlag = false;
        $scope.validationMsg = "";

        //Check all validations on client side
        function validate() {
            if ($scope.modalUser.name == '') {
                $scope.validationFlag = true;
                $scope.validationMsg = "Please enter name";
                return false;
            }
            if ($scope.modalUser.email == '') {
                $scope.validationFlag = true;
                $scope.validationMsg = "Please enter email";
                return false;
            }
            if ($scope.modalUser.email.match("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") == null) {
                $scope.validationFlag = true;
                $scope.validationMsg = "Please enter valid email";
                return false;
            }
            if ($scope.modalUser.mobileNumber == null || $scope.modalUser.mobileNumber == '') {
                //mobile number is optional
            } else {
                if (!angular.isNumber($scope.modalUser.mobileNumber)) {
                    $scope.validationFlag = true;
                    $scope.validationMsg = "Please enter valid mobile number";
                    return false;
                }
                if (($scope.modalUser.mobileNumber).toString().length != 10) {
                    $scope.validationFlag = true;
                    $scope.validationMsg = "Please enter 10-digit mobile number";
                    return false;
                }
            }

            return true;
        }

        $scope.modalOperation = function () {
            //if validation fails, return
            if (!validate())
                return;            

            //if validation checks are passed, reset values
            $scope.validationFlag = false;
            $scope.validationMsg = "";

            //check modal operation name
            if ($scope.modalJob == 'Add User') {
                userFactory.addUser($scope.modalUser).then(addOrUpdateUserResponse, httpError);
            } else if ($scope.modalJob == 'Edit User') {
                userFactory.editUser($scope.modalUser).then(addOrUpdateUserResponse, httpError);
            }
        }

        //delete operation
        $scope.deleteOperation = function () {            
            userFactory.removeUser($scope.modalUser.id).then(deleteUserResponse, httpError);
        }

        //fetch all users in table
        userFactory.getAllUsers().then(getUserResponse, httpError);

        function getUserResponse(response) {
            $scope.userList = response.data;
        }

        function addOrUpdateUserResponse(response) {
            //check is response from API is success
            if (response.data.resultCode == 0) {
                //close modal popup
                $('#modalPopup').modal('hide');
                if ($scope.modalJob == 'Add User') {
                    //Used Added : reload list
                    userFactory.getAllUsers().then(getUserResponse, httpError);
                } else {
                    //User Edited : replace in list
                    var indexOfUser = getIndexOfUser($scope.modalUser.id);
                    if (indexOfUser != -1) {
                        $scope.userList.splice(indexOfUser, 1, $scope.modalUser);
                    }
                }
            } else {
                //display error msg
                $scope.validationFlag = true;
                $scope.validationMsg = response.data.message;
            }
        }

        function getIndexOfUser(id) {
            for (var i = 0; i < $scope.userList.length; i++) {
                if ($scope.userList[i].id == id)
                    return i;
            }
            return -1;
        }

        function deleteUserResponse(response) {
            //check is response from API is success
            if (response.data.resultCode == 0) {
                //close modal popup
                $('#modalPopup').modal('hide');
                var indexOfUser = getIndexOfUser($scope.modalUser.id);
                if (indexOfUser != -1) {
                    $scope.userList.splice(indexOfUser, 1);
                }
            } else {
                $scope.validationFlag = true;
                $scope.validationMsg = response.data.message;
            }
        }

        function httpError(error) {
            console.log(error);
        }

        //check status code of user and assign text
        $scope.getStatus = function (status) {
            var userStatus = "";
            if (status == 0) {
                userStatus = "Active";
            } else if (status == 1) {
                userStatus = "Pending";
            } else if (status == 2) {
                userStatus = "Inactive";
            }
            return userStatus;
        }

        //check status code of user and assign icon
        $scope.getStatusIcon = function (status) {
            var userStatusIcon = "";
            if (status == 0) {
                userStatusIcon = "ico_active";
            } else if (status == 1) {
                userStatusIcon = "ico_pending";
            } else if (status == 2) {
                userStatusIcon = "ico_inactive";
            }
            return "../Resources/" + userStatusIcon + ".svg";
        }

        activate();

        function activate() { }
    }
})();
