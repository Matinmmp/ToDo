const addTodoBtn = document.querySelector('#addTodo');
const title = document.querySelector('#title');
const description = document.querySelector('#decription');
const dueDate = document.querySelector('#date');


class AddToDo {
    url = "https://646521939c09d77a62e4a2ef.mockapi.io/Todos/todo/";
    constructor() {
        this.createdAt = `${new Date().getTime()}`;
        this.updateedAt = `${new Date().getTime()}`;
        this.dueDate;
        this.title;
        this.description;
        this.checked = false;
    }

    getTodo(title, description, dueDate) {
        this.title = title;
        this.description = description;
        this.dueDate = `${new Date(dueDate).getTime()}`;

    }

    async addToDo() {
        const data = {
            title: this.title,
            description: this.description,
            checked: this.checked,
            createdAt: this.createdAt,
            updateedAt: this.updateedAt,
            dueDate: this.dueDate,
        }

        await fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
}

function alertGenerator(input) {
    const section = document.createElement('section');
    section.innerHTML = `<div id="alert" class="alert alert-${input}  shadow-lg w-[15rem] flex flex-col ">
    <div class="flex justify-between w-full">
        <span >SuccessFull</span>
        <span id="close" class="cursor-pointer"" >X</span>
    </div>
    <div class="flex justify-between w-full">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="me-auto">Todo added</span>
    </div>
    </div>`;
    section.querySelector('#close').addEventListener('click', () => section.remove());
    document.body.append(section);
    setTimeout(() => section.remove(), 5000);
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

    const data = new AddToDo();
    data.getTodo(title.value, description.value, dueDate.value);
    data.addToDo().then(() => {
        alertGenerator('success');
        title.value = '';
        description.value = '';
    }).catch(() => {
        alertGenerator('success');
    })
});
