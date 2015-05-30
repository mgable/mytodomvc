"use strict";

beforeEach(
	function(){
		browser.driver.manage().window().setSize(1280, 1024);
		browser.get("/");
	}
);

function hasClass(element, cls) {
	var className = cls.replace(/^\./, "");
    return element.getAttribute('class').then(function (classes) {
        return classes.split(' ').indexOf(className) !== -1;
    });
}

describe("Todo MVC", function(){
	it("should enter a todo", function(){
		var inputField = element(by.model("newTodo"));
		expect(inputField.isPresent()).toBeTruthy();
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
		todos.last().getText().then(function(text){
			expect(text).toEqual("write a new review");
		});

		inputField.getAttribute('value').then(function(inputtext){
			expect(inputtext).toEqual("");
		});
	});

	it("should toggle the 'complete' attribute of an individual todo", function(){
		var todos = element.all(by.repeater("todo in todos"));
		hasClass(todos.first(), "completed").then(function(isCompleted){
			if (isCompleted){
				todos.first().element(by.css("input.toggle")).click();
				hasClass(todos.first(), "completed").then(function(isCompleted){
					expect(isCompleted).toBe(false);
				});
			} else{
				todos.first().element(by.css("input.toggle")).click();
				hasClass(todos.first(), "completed").then(function(isCompleted){
					expect(isCompleted).toBe(true);
				});
			}
		});
	});

	it("should mark all todos as complete", function(){
		element.all(by.repeater("todo in todos")).count().then(function(currentCount){
			element.all(by.css(".completed")).count().then(function(completeCount){
				element(by.css("#toggle-all")).click();
				if (currentCount === completeCount){
					// all todos completed
					console.info("all todos completed");
					element.all(by.css(".completed")).count().then(function(completeCount){
						expect(completeCount).toEqual(0);
					});
				} else {
					// not all todos completed
					console.info("some todos are active");
					element.all(by.css(".completed")).count().then(function(completeCount){
						expect(completeCount).toEqual(currentCount);
					});
				}
			});
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
			originalTodos.shift(); // delete first todo
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

		