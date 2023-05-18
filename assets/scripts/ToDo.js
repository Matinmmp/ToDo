class ToDo {
    constructor(url) {
        this.url = url;
        this.id;
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

    async checkedTodo(id) {
        try {
            const response = await fetch(`${this.url}/${id}`);
            const data = await response.json();
            data.checked = !data.checked;
            await fetch(`${this.url}/${id}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
        } catch (error) {
            console.log(error);
        }
    }

    async removeTodo(id) {
        try {
            await fetch(`${this.url}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    async getAllDate() {
        try {
            const response = await fetch(this.url);
            const s = await response.json()
            return s;
        } catch {
            console.log("Error");
        }
    }
}