(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService', 'UserService'];
function SignUpController(MenuService, UserService) {
  var $signUpCtrl = this;

  // function that gets called when the user submits the sign-up form
  $signUpCtrl.submit = function() {

    // get the menu item based on the menu number the user provided
    MenuService.getMenuItem($signUpCtrl.user.menuNumber).then(function(result) {
      //   If the menu item exists, save the user's preferences and set the 
      // necessary flags to indicate that the information has been saved. If
      // the menu item does not exist, set the necessary flags to indicate that
      // we hit an error.
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
