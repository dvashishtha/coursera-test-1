(function () {
'use strict';

angular.module('MenuApp')
.component('items', {
  templateUrl: 'src/menuapp/templates/itemslist.template.html',
  bindings: {
    data: '<'
  }
});

})();
