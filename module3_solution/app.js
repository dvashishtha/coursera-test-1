(function(){
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowList = this;

  narrowList.found = MenuSearchService.getMatchedMenuItems("chicken");
  console.log(narrowList.found);
};

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });

    return response.then(function(result) {
      var menuItems = result.data.menu_items;
      var foundItems = [];
      for(var i = 0; i < menuItems.length; i++) {
        if(menuItems[i]['description'].indexOf(searchTerm) !== -1) {
          foundItems.push(menuItems[i]);
        }
      }
      return foundItems;
    })
    .catch(function(error) {
      console.log(error);
    });
  };
};



})();
