(function(){
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope){
  $scope.dishes = ""
  $scope.message = ""
  $scope.myMessageColor = ""
  $scope.myBorderColor = ""

  // function to display the appropriate message to the user
  $scope.showMessage = function(dishes) {

   // check if user entered no data
   if(dishes.length == 0){
     $scope.message = "Please enter data first";
     $scope.myMessageColor = {"color":"red"};
     $scope.myBorderColor = {"border-color":"red"}
     return
   }

    // split the input by comma delimiter
    var my_dishes = dishes.split(",")

    //  Handle cases where number of foods is less than or equal to 3
    // and where number of foods is greater than 3. Also, set the
    // appropriate colors around the message and textbox.
    if(my_dishes.length <= 3) {
      $scope.message = "Enjoy!";
      $scope.myMessageColor = {"color":"green"};
      $scope.myBorderColor = {"border-color":"green"};
    }
    else {
      $scope.message = "Too much!"
      $scope.myMessageColor = {"color":"green"};
      $scope.myBorderColor = {"border-color":"green"};
    }
  };

};



})();
