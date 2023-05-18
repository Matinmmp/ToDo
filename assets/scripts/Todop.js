const todo = new ToDo("https://646521939c09d77a62e4a2ef.mockapi.io/Todos/todo/");
const listElement = document.querySelector('#list');


async function getData() {
    try {
        const data = await todo.getAllDate();
        const list = Array.from(data).map(item => generatCard(item));
        listElement.append(...list);
        alertGenerator("success", 'Success', 'Success to Get Data');

    } catch (error) {
        alertGenerator("error", 'Faild', 'Faild to Get Data');
    }
}

function generatCard(item) {
    const section = document.createElement('section');
    section.classList = "  rounded-3xl px-6 py-3 bg-secondary-focus mt-4";
    section.style.boxShadow = ' 0 0 20px -10px  rgb(56,189,248)'
    section.dataset.id = item.id;
    section.innerHTML = `
    <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
            <input type="checkbox" ${item.checked && "checked='checked'"}  class="checkbox bg-primary ">
            <h4 class="text-xl">${item.title}</h4>
            <span class="text-sm">
            ${new Date(item.dueDate).getFullYear()} / ${new Date(item.dueDate).getMonth()} / ${new Date(item.dueDate).getDay()}
            </span>
        </div>
        <div class="text-xl ">
            <i class="bi bi-pencil-square me-2 cursor-pointer"></i>
            <label for="my-modal-3" > <i class="bi bi-trash3 cursor-pointer"></i></label>
           
        </div>
    </div>
    <p class="mt-5">${item.description}</p>`;

    section.querySelector('input').addEventListener('click', () => {
        todo.checkedTodo(section.dataset.id).then(()=>{
            alertGenerator("success","success","Done");
        }).catch(()=>{
            alertGenerator("error","Faild","Faild checked");
        })
    });

    section.querySelector('label').addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.innerHTML = `<input type="checkbox" id="my-modal-3" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box relative">
                <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <h3 class="text-lg font-bold text-orange-500">DELETE !!!!!!!!!!!!!!</h3>
                <p class="py-4">You Want Delete ${item.title}</p>
                <label id="delete" for="my-modal-3" class="btn ">YES</label>
            </div>
        </div>`;
        modal.querySelector('#delete').addEventListener('click',()=> {
            todo.removeTodo(section.dataset.id).then(()=>{
                listElement.innerHTML = ''
                getData();
            });
       
        })
        document.body.append(modal);
    });
    return section
}


getData();

