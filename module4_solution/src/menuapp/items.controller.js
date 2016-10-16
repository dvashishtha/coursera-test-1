(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);


ItemsController.$inject = ['MenuDataService', 'data'];
function ItemsController(MenuDataService, data) {
  var items = this;

  items.data = data.data.menu_items;
}

})();
