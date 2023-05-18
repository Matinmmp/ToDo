const addTodoBtn = document.querySelector('#addTodo');
const title = document.querySelector('#title');
const description = document.querySelector('#decription');
const dueDate = document.querySelector('#date');



addTodoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!title.value || !dueDate.value) {
        title.classList.replace('input-primary', "input-error")
        dueDate.classList.replace('input-primary', 'input-error');
        return;
    }
    title.classList.replace('input-error', "input-primary")
    dueDate.classList.replace('input-error', 'input-primary');

    const data = new ToDo("https://646521939c09d77a62e4a2ef.mockapi.io/Todos/todo/");
    data.getTodo(title.value, description.value, dueDate.value);

    data.addToDo().then(() => {

        alertGenerator('success', "Succsses", "Todo Added");
        title.value = '';
        description.value = '';

    }).catch(() => {
        alertGenerator('error', 'Faild', 'Faild');
    })
});