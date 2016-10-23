(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService', 'UserService'];
function SignUpController(MenuService, UserService) {
  var $signUpCtrl = this;

  $signUpCtrl.submit = function() {
    MenuService.getMenuItem($signUpCtrl.user.menuNumber).then(function(result) {
      if (result) {
        $signUpCtrl.user.menuItem = result;
        UserService.saveUserPreferences($signUpCtrl.user);
        $signUpCtrl.save = true;
        $signUpCtrl.success = 'Your information has been saved'
      }
      else {
        $signUpCtrl.save = false;
        $signUpCtrl.error = 'No such menu number exists';
      }
    });
  };


}

})();
