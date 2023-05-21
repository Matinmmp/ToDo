const addTodoBtn = document.querySelector('#addTodo');
const title = document.querySelector('#title');
const description = document.querySelector('#decription');
const dueDate = document.querySelector('#date');
const todo = new ToDo("https://646521939c09d77a62e4a2ef.mockapi.io/Todos/todo/");
let messageSuccss = "Todo Added";
let messageFaild = 'Faild to Add';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
if (id) {
    todo.getTodoById(id).then((respones) => {
        addTodoBtn.textContent = "Edit";
        title.value = respones.title;
        description.value = respones.description;
        const date = new Date(+respones.dueDate);
        const formatDate = date.toISOString().split('T')[0];
        dueDate.value = formatDate;
        messageFaild = "Faild To Edit";
        messageSuccss = "Todo Edited";
    });
}

addTodoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!title.value || !dueDate.value) {
        title.classList.replace('input-primary', "input-error")
        dueDate.classList.replace('input-primary', 'input-error');
        return;
    }
    title.classList.replace('input-error', "input-primary")
    dueDate.classList.replace('input-error', 'input-primary');

    if (id) {
        todo.editeTodo(id, {title: title.value,description: description.value,updateAt: dueDate }).then(() => {
            alertGenerator('success', "Succsses", messageSuccss);
            title.value = '';
            description.value = '';
        }).catch(() => {
            alertGenerator('error', 'Faild', messageFaild);
        });
        return;
    }


    todo.getTodo(title.value, description.value, dueDate.value);
    todo.addToDo().then(() => {
        alertGenerator('success', "Succsses", messageSuccss);
        title.value = '';
        description.value = '';
    }).catch(() => {
        alertGenerator('error', 'Faild', messageFaild);
    })
});