"use strict";

beforeEach(
	function(){
		browser.driver.manage().window().setSize(1280, 1024);
		browser.get("http://localhost:9000/#/");
	}
);

describe("Todo MVC", function(){
	it("should enter a todo", function(){
		var inputField = element(by.model("newTodo"));
		inputField.sendKeys("write a new review");
		inputField.getAttribute('value').then(function(inputtext){
			expect(inputtext).toEqual("write a new review");
		});
	});

	it("should save a todo", function(){
		var inputField = element(by.model("newTodo")),
			todos = element.all(by.repeater("todo in todos"));
		inputField.sendKeys("write a new review");
		inputField.sendKeys(protractor.Key.ENTER);
		todos.first().getText().then(function(text){
			expect(text).toEqual("write a new review");
		});
	});
})

		