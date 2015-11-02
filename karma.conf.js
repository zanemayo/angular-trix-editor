module.exports = function(config) {
  config.set({
    basePath: '',
    plugins : ['karma-jasmine', 'karma-phantomjs-launcher', 'karma-chrome-launcher'],
    frameworks: ['jasmine'],
    files: [
      'bower_components/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'bower_components/trix/dist/trix.js',
      'angular-trix-editor.js',
      'tests/*.js'
    ],
    reporters: ['progress'],
    logLevel: config.LOG_INFO,
    autowatch: true,
    browsers: ['Chrome']
  });
};
