(function () {
"use strict";

angular.module('common')
.service('UserService', UserService)


UserService.$inject = [];
function UserService() {
  var service = this;

  service.saveUserPreferences = function (userInfo) {
    service.userInfo = userInfo;
  };

  service.getUserPreferences = function () {
    return service.userInfo;
  }
}
})();
