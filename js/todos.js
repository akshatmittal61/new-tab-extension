const todosContainer = document.querySelector(".todos-list");

const addTodoBtn = document.querySelector("#todos-add-btn");
const newTodoForm = document.querySelector("#new-todo-form");
const newTodoInput = document.querySelector("#new-todo-input");
const addNewTodoBtn = document.querySelector("#new-todo-item-add");
const cancelNewTodoBtn = document.querySelector("#new-todo-item-cancel");

const getTodos = () => JSON.parse(localStorage.getItem("todos") || "[]");
const setTodos = (todos) =>
	localStorage.setItem("todos", JSON.stringify(todos));

const makeTodo = (id, text, completed) => {
	const todoEl = document.createElement("div");
	todoEl.classList.add("todo-item");

	const todoCheckbox = document.createElement("button");
	todoCheckbox.classList.add("todo-item-checkbox");
	todoCheckbox.classList.add("material-symbols-outlined");
	todoCheckbox.id = "todo-checkbox-btn " + id;
	todoCheckbox.name = id;
	todoCheckbox.checked = completed;
	todoCheckbox.textContent = completed
		? "check_circle"
		: "radio_button_unchecked";
	todoEl.appendChild(todoCheckbox);

	const todoText = document.createElement("div");
	todoText.classList.add("todo-item-text");
	todoText.textContent = text;
	todoEl.appendChild(todoText);

	const todoDelete = document.createElement("button");
	todoDelete.classList.add("todo-item-delete");
	todoDelete.classList.add("material-symbols-outlined");
	todoDelete.id = "todo-delete-btn " + id;
	todoDelete.name = id;
	todoDelete.textContent = "delete";
	todoEl.appendChild(todoDelete);
	return todoEl;
};

const displayTodos = (todos) => {
	todosContainer.innerHTML = "";
	const completedTodos = todos
		.filter((todo) => todo.completed)
		.sort((a, b) => b.id - a.id);
	const uncompletedTodos = todos
		.filter((todo) => !todo.completed)
		.sort((a, b) => b.id - a.id);
	[...uncompletedTodos, ...completedTodos].forEach((todo) => {
		const todoEl = makeTodo(todo.id, todo.text, todo.completed);
		todosContainer.appendChild(todoEl);
	});
};

const addTodo = (todo) => {
	const todos = getTodos();
	todos.push({
		id: Date.now(),
		text: todo,
		completed: false,
	});
	setTodos(todos);
	displayTodos(todos);
};

const removeTodo = (id) => {
	const todos = getTodos();
	const updatedTodos = todos.filter((todo) => todo.id !== id);
	setTodos(updatedTodos);
	displayTodos(updatedTodos);
};

const toggleTodo = (id) => {
	const todos = getTodos();
	const updatedTodos = todos.map((todo) => {
		if (todo.id === id) {
			return {
				...todo,
				completed: !todo.completed,
			};
		}
		return todo;
	});
	setTodos(updatedTodos);
	displayTodos(updatedTodos);
};

const handleTodoClick = (e) => {
	e.preventDefault();
	if (e.target.classList.contains("todo-item-checkbox")) {
		toggleTodo(parseInt(e.target.id.split(" ")[1]));
	}
	if (e.target.classList.contains("todo-item-delete")) {
		removeTodo(parseInt(e.target.id.split(" ")[1]));
	}
};

const handleAddTodo = (e) => {
	e.preventDefault();
	const todo = newTodoInput.value;
	if (todo) {
		addTodo(todo);
		newTodoInput.value = "";
	}
};

const handleAddTodoBtnClick = (e) => {
	e.preventDefault();
	if (newTodoForm.classList.contains("dispn")) {
		newTodoForm.classList.remove("dispn");
		newTodoInput.focus();
	} else {
		newTodoForm.classList.add("dispn");
	}
};

const handleCancelNewTodoBtnClick = () => {
	newTodoInput.value = "";
	newTodoForm.classList.add("dispn");
};

const init = () => {
	displayTodos(getTodos());
	addTodoBtn.addEventListener("click", handleAddTodoBtnClick);
	newTodoForm.addEventListener("submit", handleAddTodo);
	cancelNewTodoBtn.addEventListener("click", handleCancelNewTodoBtnClick);
	todosContainer.addEventListener("click", handleTodoClick);
};

document.addEventListener("DOMContentLoaded", init);
