(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesController', CategoriesController);


CategoriesController.$inject = ['MenuDataService', 'data'];
function CategoriesController(MenuDataService, data) {
  var categories = this;
  categories.data = data.data;
}

})();
