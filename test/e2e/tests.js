"use strict";

beforeEach(
	function(){
		browser.driver.manage().window().setSize(1280, 1024);
		browser.get("/");
	}
);

describe("Todo MVC", function(){
	xit("should enter a todo", function(){
		var inputField = element(by.model("newTodo"));
		inputField.sendKeys("write a new review");
		inputField.getAttribute('value').then(function(inputtext){
			expect(inputtext).toEqual("write a new review");
		});
	});

	xit("should save a todo", function(){
		var inputField = element(by.model("newTodo")),
			todos = element.all(by.repeater("todo in todos"));
		inputField.sendKeys("write a new review");
		inputField.sendKeys(protractor.Key.ENTER);
		todos.first().getText().then(function(text){
			expect(text).toEqual("write a new review");
		});

		inputField.getAttribute('value').then(function(inputtext){
			expect(inputtext).toEqual("");
		});
	});

	it("should delete a todo", function(){
		var todos = element.all(by.repeater("todo in todos")),
			originalTodos;
		todos.map(function(todo){
			return todo.getText().then(function(text){
				return text;
			});
		}).then(function(data){
			originalTodos = data;
			console.info("deleting %s", originalTodos.shift()); // delete first todo
			browser.actions().mouseMove(todos.first()).perform();
			todos.first().element(by.css(".destroy")).click();

			todos.map(function(todo){
				return todo.getText().then(function(text){
					return text;
				});
			}).then(function(modifiedTodos){
				expect(originalTodos).toMatch(modifiedTodos);
			});
		});
	});
})

		