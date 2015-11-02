describe('angular-trix-editor', function() {
  var element, scope, $compile, $timeout;

  beforeEach(module('zm.angular-trix-editor'));

  beforeEach(inject(function($rootScope, _$compile_, _$timeout_) {
    scope = $rootScope;
    $compile = _$compile_;
    $timeout = _$timeout_;
    scope.thecontent = "a";

    element = angular.element('<trix-editor angular-trix-editor ng-model="thecontent"></trix-editor>')
    // Attach editor to document so that the trix init callbacks to run
    angular.element(document.body).append(element);
  }));

  function createEditor() {
    var el = $compile(element)(scope);
    scope.$digest();
    return el;
  }

  it('Changing model should update editor content', function(done) {
    var editor = createEditor();

    // Trix only updates inside a requestAnimationFrame
    // So we need to wait for the next frame before testing
    requestAnimationFrame(function() {
      expect(editor.html()).toEqual('<div><!--block-->a</div>');

      scope.$apply(function() {
        scope.thecontent = "b";
      });
      requestAnimationFrame(function() {
        // Force the timeout in the directive to complete
        $timeout.flush();
        expect(editor.html()).toEqual('<div><!--block-->b</div>');
        done();
      })
    })


  })
});
