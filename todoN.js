const form = document.querySelector('#form');
const input = document.querySelector('#enter');
const myTodo = document.querySelector('#myTodos');

const todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {
    todos.forEach((todo) => {
        addTodo(todo);
    });
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
});

//add todo list
function addTodo(todo) {
    let todoText = input.value;
    //important for local storage
    if (todo) {
        todoText = todo.text;
    }


    if (todoText) {
        const todoEl = document.createElement('li');
        if (todo && todo.completed) {
            todoEl.classList.add('completed')
        }
        //this clip our list to the ul
        todoEl.innerText = todoText;
        //the toggle strike throught after todo completion
        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed')

            updateLs();
        });

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            todoEl.remove();

            updateLs();

        });

        //append the created list to the ul
        myTodo.appendChild(todoEl);
        //clear the input field
        input.value = '';

        updateLs();
    }

};

function updateLs() {
    const todosEl = document.querySelectorAll('li');

    const todos = [];

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')

        });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
};