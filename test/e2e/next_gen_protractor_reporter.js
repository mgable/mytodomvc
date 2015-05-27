"use strict";

var DisplayProcessor = require('../../node_modules/jasmine-spec-reporter/src/display-processor'),
	cache = "",
	fs = require('fs');

function NextGenReporter(options) {}

function recordTestData(suite, log) {
	//cache = cache + cleanUp(log);
	//fs.writeFileSync("./test/e2e/reports/temp.txt", cache);
}

function cleanUp(text){
	return text.replace(/[^\w\t :\n]|\d{2}m/g, "") + "\n";
}

function format(text){
	return "\t" + text;
}

function printObject (o){
	var cache = [];
	return JSON.stringify(o, function(key, value) {
	    if (typeof value === 'object' && value !== null) {
	        if (cache.indexOf(value) !== -1) {
	            // Circular reference found, discard key
	            return;
	        }
	        // Store value in our collection
	        cache.push(value);
	    }
	    return value;
	}, 4);
	cache = null; // Enable garbage collection
}

NextGenReporter.prototype = new DisplayProcessor();

NextGenReporter.prototype.displaySuite = function (suite, log) {
	recordTestData(suite, log);
  return  log;
};

NextGenReporter.prototype.displaySuccessfulSpec = function (spec, log) {
	recordTestData(spec, format(log));
  return  log;
};

NextGenReporter.prototype.displayFailedSpec = function (spec, log) {
	recordTestData(spec, format(log));
  return  log;
};

NextGenReporter.prototype.displaySkippedSpec = function (spec, log) {
	recordTestData(spec, format(log));
  return  log;
};

module.exports = NextGenReporter;