"use strict";

beforeEach(
	function(){
		browser.driver.manage().window().setSize(1280, 1024);
		browser.get("http://localhost:9000/#/");
	}
);

describe("Executing tests", function(){
	it("should set up the tests", function(){
		console.info("tests set up");
	});

	describe("the application", function(){
		it("should work", function(){
			expect(true).toBe(true);
		});
	});
})

		