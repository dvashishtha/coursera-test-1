(function(){
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'narrowList',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var narrowList = this;

  //  we count that no items have been found if narrowList.found is not
  // undefined and its length is zero. We check to make sure it is defined
  // because it will be undefined until the user performs a search.
  narrowList.noItemsFound = function (){
    if(narrowList.found !== undefined && narrowList.found.length == 0) {
      return true;
    }
  }
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowList = this;

  // function that gets called when user clicks on "Narrow Search Term" button
  narrowList.searchItems = function(searchTerm) {

    // if the search term is an empty string, we set narrowList.found to be
    // an empty array instead of getting every menu item.
    if(searchTerm == "") {
      narrowList.found = [];
    }
    else {
      MenuSearchService.getMatchedMenuItems(searchTerm.toLowerCase()).then(function(result) {
        narrowList.found = result;
      });
    }
  }

  //  removes an item from the list of menu items when the user clicks
  // on the "Don't want this one!" button
  narrowList.removeItem = function(index) {
    narrowList.found.splice(index, 1);
  }
};

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  //Do an HTTP call to get the full list of menu items. Then, filter the list
  //by the menu items whose description includes our search term.
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
