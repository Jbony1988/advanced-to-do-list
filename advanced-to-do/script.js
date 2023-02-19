// Add Todo
const form = document.querySelector("#new-todo-form");
const todoInput = document.querySelector("#todo-input");
const list = document.querySelector("#list");
const template = document.querySelector("#list-item-template");
const LOCAL_STORAGE_PREFIX = 'ADVANCED_TODO_LIST-';
const TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todos`
let todos = loadTodos()
// User will type in todo and click add todo button.
todos.forEach(renderTodo)
list.addEventListener('change', e => {
  if(!e.target.matches('[data-list-item-checkbox]')) return
  // Get the todo that is checked
  const parent = e.target.closest('.list-item');
  const todoId = parent.dataset.todoId;

  // Toggle the complete property to be equal to the checkbox value
  const todo = todos.find(t => t.id === todoId)
  todo.completed = e.target.checked
  saveTodos()
  // Save our updated todo

})


form.addEventListener("submit", e => {
  e.preventDefault();

  const todoName = todoInput.value;
  if (todoName === "") return;
  const newTodo = {
    name: todoName,
    completed: false,
    id: new Date().valueOf().toString()
  }
  todos.push(newTodo)
  renderTodo(newTodo);
  saveTodos();
  todoInput.value = "";
});
// This should then add the todo to the list above
function renderTodo(todo) {
  const templateClone = template.content.cloneNode(true);
  const listItem = templateClone.querySelector('.list-item');
  listItem.dataset.todoId = todo.id
  const textElement = templateClone.querySelector("[data-list-item-text]");
  // Complete a Todo
  const checkbox = templateClone.querySelector('[data-list-item-checkbox]');
  checkbox.checked = todo.completed
  textElement.innerText = todo.name;
  list.appendChild(templateClone);
}


// Delete a Todo
list.addEventListener('click', e => {
  if(!e.target.matches('[data-button-delete]')) return
  const parent =  e.target.closest('.list-item');
  const todoId = parent.dataset.todoId
  // Remove todo from screen
  parent.remove()

  // Remove todo from list
  todos = todos.filter(todo => todo.id !== todoId)
  // Save the new todos
  saveTodos()
})

// Save Todos
function saveTodos () {
localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos))
}
// Load Todos

function loadTodos() {
  const todoString = localStorage.getItem(TODOS_STORAGE_KEY);
  return JSON.parse(todoString) || []
}
