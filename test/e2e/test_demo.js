"use strict";

beforeEach(
	function(){
		browser.driver.manage().window().setSize(1280, 1024);
		browser.get("http://todomvc.com/examples/angularjs/#/");
	}
);

function hasClass(element, cls) {
	var className = cls.replace(/^\./, "");
    return element.getAttribute('class').then(function (classes) {
        return classes.split(' ').indexOf(className) !== -1;
    });
}

describe("Todo MVC", function(){
	//1.0
	it("should enter a todo", function(){ 
		// get reference to input field
		// expect input field to be displayed
		// enter text into input field
		// expect input field to contain entered text
		var inputField = element(by.model("newTodo"));
		expect(inputField.isPresent()).toBeTruthy(); //1.1
		inputField.sendKeys("write a new review");
		inputField.getAttribute('value').then(function(inputtext){
			expect(inputtext).toEqual("write a new review"); //1.2
		});
	});

})

		