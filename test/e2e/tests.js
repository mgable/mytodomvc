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
		var inputField = element(by.model("newTodo"));
		expect(inputField.isPresent()).toBeTruthy(); //1.1
		inputField.sendKeys("write a new review");
		inputField.getAttribute('value').then(function(inputtext){
			expect(inputtext).toEqual("write a new review"); //1.2
		});
	});

	//2.0
	it("should save a todo", function(){
		var inputField = element(by.model("newTodo")),
			todos = element.all(by.repeater("todo in todos"));
		inputField.sendKeys("write a new review");
		inputField.sendKeys(protractor.Key.ENTER);
		todos.last().getText().then(function(text){
			expect(text).toEqual("write a new review"); //2.1
		});

		inputField.getAttribute('value').then(function(inputtext){
			expect(inputtext).toEqual(""); //2.2
		});
	});

	//3.0
	it("should edit a todo", function(){
		var todos = element.all(by.repeater("todo in todos")), 
			firstTodo = todos.first(),
			firstTodoInput = firstTodo.element(by.css("label")),
			title;

		todos.count().then(function(count){
			if (count){
				firstTodoInput.getText().then(function(text){
					title = text;

					browser.actions().doubleClick(firstTodo).perform();
					hasClass(firstTodo,"editing").then(function(hasClass){
						expect(hasClass).toBe(true); //3.1
					});

					browser.actions().sendKeys(" -xxx").perform();
					browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
					firstTodoInput.getText().then(function(text){
						expect(text).toEqual(title); //3.2
					});

					browser.actions().doubleClick(firstTodo).perform();
					browser.actions().sendKeys(" -new").perform();
					browser.actions().sendKeys(protractor.Key.ENTER).perform();
					firstTodoInput.getText().then(function(newTitle){
						expect(newTitle).toEqual(title + " -new"); //3.3
					});

				});
			} else {
				console.info("there are no todos");
			}
		});
	});
});

		