const ftList = document.getElementById('ft_list');
const newBtn = document.getElementById('new_btn');

function saveTodos() {
    const todos = [];
    for (let i = 0; i < ftList.children.length; i++) {
        todos.push(ftList.children[i].textContent);
    }
    const jsonStr = JSON.stringify(todos);
    const date = new Date();
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = "todos=" + encodeURIComponent(jsonStr) + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const parts = decodedCookie.split(';');
    for (let i = 0; i < parts.length; i++) {
        let c = parts[i].trim();
        if (c.indexOf(cookieName) === 0) {
            return c.substring(cookieName.length, c.length);
        }
    }
    return "";
}

function createTodoNode(text) {
    const todoDiv = document.createElement('div');
    todoDiv.textContent = text;
    todoDiv.addEventListener('click', function () {
        const confirmDelete = confirm('Do you want to remove this to-do item?');
        if (confirmDelete) {
            ftList.removeChild(todoDiv);
            saveTodos();
        }
    });
    return todoDiv;
}

newBtn.addEventListener('click', function () {
    const text = prompt('Enter a new TO DO:');
    if (text !== null && text.trim() !== '') {
        const todoNode = createTodoNode(text.trim());
        ftList.insertBefore(todoNode, ftList.firstChild);
        saveTodos();
    }
});

window.addEventListener('load', function () {
    const saved = getCookie('todos');
    if (saved) {
        try {
            const todos = JSON.parse(saved);
            for (let i = todos.length - 1; i >= 0; i--) {
                const todoNode = createTodoNode(todos[i]);
                ftList.insertBefore(todoNode, ftList.firstChild);
            }
        } catch (e) {
            console.error(e);
        }
    }
});