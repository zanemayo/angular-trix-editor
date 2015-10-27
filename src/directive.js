angular.module('zm.angular-trix-editor', []).
  directive('angularTrixEditor', [function() {
    return {
      restrict: 'E',
      scope: {
        content: '='
      },
      template: '<trix-editor></trix-editor>',
      link: function(scope, element, attrs) {
        var trixElement = element.find('trix-editor');
        var editor = trixElement[0].editor;
        var updatedByUs = false;

        trixElement.on('trix-initialize', function() {
          //console.log('trix initialized');
        });
        trixElement.on('trix-change', function() {
          console.log('trix content changed');
          //console.log(trixEditor);
          //console.log(element);
          scope.$apply(function() {
            updatedByUs = true;
            scope.content = trixElement.html();
          })
        });

        scope.$watch('content', function(newValue, oldValue) {
          //if(oldValue === undefined && newValue !== undefined) {
            if(!updatedByUs) {
              editor.loadHTML(newValue);
            }
            updatedByUs = false;
          //}
            console.log('NEW CONTENT: ' + newValue + ' || old: ' + oldValue);
        });

      },
      controller: function() {

      },
      controllerAs: 'trixCtrl'
    }
  }]);
