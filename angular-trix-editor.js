angular.module('zm.angular-trix-editor', []).
  directive('angularTrixEditor', ['$timeout', function($timeout) {
    return {
      restrict: 'A',
      require: "ngModel",
      scope: {
        editor: '=',
        trixInitialize: '&',
        trixChange: '&',
        trixSelectionChange: '&',
        trixFocus: '&',
        trixBlur: '&',
        trixFileAccept: '&',
        trixAttachmentAdd: '&',
        trixAttachmentRemove: '&'
      },
      link: function(scope, element, attrs, ngModel) {
        scope.editor = null;

        element.on('trix-initialize', function() {
          scope.editor = element[0].editor;
        });

        ngModel.$render = function() {
          if(scope.editor) {
            $timeout(function() {
              scope.editor.loadHTML(ngModel.$viewValue);
            });
          }
          else {
            element.on('trix-initialize', function() {
              scope.editor.loadHTML(ngModel.$viewValue);

              // After load of html trix-change event can be safely registered
              element.on('trix-change', function() {
                ngModel.$setViewValue(element.html());
              });

            });
          }
        };

        var setupEvent = function(eventName, functionName) {
          element.on(eventName, function(event) {
            scope.$apply(function() {
              scope[functionName]({event:event});
            });
          });
        };

        setupEvent('trix-initialize', 'trixInitialize');
        setupEvent('trix-change', 'trixChange');
        setupEvent('trix-selection-change', 'trixSelectionChange');
        setupEvent('trix-focus', 'trixFocus');
        setupEvent('trix-blur', 'trixBlur');
        setupEvent('trix-file-accept', 'trixFileAccept');
        setupEvent('trix-attachment-add', 'trixAttachmentAdd');
        setupEvent('trix-attachment-remove', 'trixAttachmentRemove');
      }
    };
  }]);
