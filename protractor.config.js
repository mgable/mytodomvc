exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['./test/e2e/*.js'],
   capabilities: {
    'browserName': 'chrome'
  },
  framework: 'jasmine',
  allScriptsTimeout: 60000,
  
  baseUrl: "http://localhost:9000/#",
  jasmineNodeOpts: {
    defaultTimeoutInterval: 360000,
    includeStackTrace: false,
    print: function() {}
  },
   onPrepare: function() {
      var SpecReporter = require('jasmine-spec-reporter'),
          Reporter = require("./test/e2e/custom_protractor_reporter.js")
      jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: false, customProcessors: [Reporter]}));
   }
};