(function(){
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

// controller for the list of items we want to buy
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyList = this;

  toBuyList.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

  //  function that gets executed when user clicks on the "Bought" button
  // for a particular item
  toBuyList.buyItem = function(itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  }
}

// controller for the list of items we have already bought
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBoughtList = this;

  alreadyBoughtList.alreadyBoughtItems = ShoppingListCheckOffService.getAlreadyBoughtItems();
}

// helpful service for sharing the two lists between the two controllers
function ShoppingListCheckOffService() {
  var service = this;

  // initial list of items to buy
  var toBuyItems = [
    {
      name: "cookies",
      quantity: 10
    },
    {
      name: "apples",
      quantity: 5
    },
    {
      name: "carrots",
      quantity: 3
    },
    {
      name: "bananas",
      quantity: 4
    },
    {
      name: "chips",
      quantity: 8
    }
  ];

  var alreadyBoughtItems = [];

  //   to buy an item, remove it from toBuyItems and add it to
  // alreadyBoughtItems
  service.buyItem = function(itemIndex) {
    var item = toBuyItems[itemIndex];
    toBuyItems.splice(itemIndex, 1);
    alreadyBoughtItems.push(item);
  }

  service.getToBuyItems = function() {
    return toBuyItems;
  }

  service.getAlreadyBoughtItems = function() {
    return alreadyBoughtItems;
  }
}

})();
