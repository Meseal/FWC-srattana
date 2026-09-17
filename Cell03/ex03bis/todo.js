$(document).ready(function () {
    const $ftList = $('#ft_list');
    const $newBtn = $('#new_btn');

    function saveTodos() {
        const todos = [];
        $ftList.children('div').each(function () {
            todos.push($(this).text());
        });
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
        const $todoDiv = $('<div></div>').text(text);

        $todoDiv.on('click', function () {
            const confirmDelete = confirm('Do you want to remove this to-do item?');
            if (confirmDelete) {
                $(this).remove();
                saveTodos();
            }
        });

        return $todoDiv;
    }

    $newBtn.on('click', function () {
        const text = prompt('Enter a new TO DO:');
        if (text !== null && text.trim() !== '') {
            const $todoNode = createTodoNode(text.trim());
            $ftList.prepend($todoNode);
            saveTodos();
        }
    });

    const saved = getCookie('todos');
    if (saved) {
        try {
            const todos = JSON.parse(saved);
            for (let i = todos.length - 1; i >= 0; i--) {
                const $todoNode = createTodoNode(todos[i]);
                $ftList.prepend($todoNode);
            }
        } catch (e) {
            console.error(e);
        }
    }
});