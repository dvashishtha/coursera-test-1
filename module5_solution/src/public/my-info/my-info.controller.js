(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['UserService', 'ApiPath'];
function MyInfoController(UserService, ApiPath) {
  var $myInfoCtrl = this;
  $myInfoCtrl.userInfo = UserService.getUserPreferences();
  $myInfoCtrl.basePath = ApiPath;
}

})();
