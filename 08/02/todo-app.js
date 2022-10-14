(function(){

    function createAppTitle(title){
        let appTitile = document.createElement("h2");
        appTitile.innerHTML = title;
        return appTitile;
    }

    function createTodoItem(task){
        let item = document.createElement("li");
        let buttonGroup = document.createElement("div");
        let doneButton = document.createElement("button");
        let deleteButton = document.createElement("button");
        
        item.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        item.textContent = typeof(task) === "string" ? task : task.name;
        if(typeof(task) != "string" && task.done)
            item.classList.add("list-group-item-success");
        buttonGroup.classList.add("btn-group", "btn-group-sm");
        doneButton.classList.add("btn", "btn-success");
        doneButton.textContent = "Готово";
        deleteButton.classList.add("btn", "btn-danger");
        deleteButton.textContent = "Удалить";

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        return{
            item,
            doneButton,
            deleteButton,
        };
    }

    function createTodoItemForm(){
        let form = document.createElement("form");
        let input = document.createElement("input");
        let buttonWrapper = document.createElement("div");
        let button = document.createElement("button");

        form.classList.add("input-group", "mb-3");
        input.classList.add("form-control");
        input.placeholder = "Введите название нового дела";
        buttonWrapper.classList.add("input-group-append");
        button.classList.add("btn", "btn-primary");
        button.textContent = "Добавить дело";
        button.disabled = true;
        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return{
            form,
            input,
            button,
        };
    }

    function createTodoList(){
        let list = document.createElement("ul");
        list.classList.add("list-group");
        return list;
    }

    function controlButtonWrapper(todoItem, initialTasks, taskIndex, localStorageKey){
        todoItem.doneButton.addEventListener("click", function(){
            todoItem.item.classList.toggle("list-group-item-success");
            initialTasks[taskIndex].done = !initialTasks[taskIndex].done;
            localStorage.setItem(
                localStorageKey, 
                JSON.stringify(initialTasks)
                );
        });

        todoItem.deleteButton.addEventListener("click", function(){
            if (confirm("Вы уверенны?")){
                todoItem.item.remove();
                initialTasks.splice(taskIndex, 1);
                localStorage.setItem(
                    localStorageKey, 
                    JSON.stringify(initialTasks)
                    );
            }
        });
            
    }

    function createTodoApp(localStorageKey, container, title = "Список дел", initialTasks = []){
        
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        todoItemForm.input.addEventListener("input", function(){
            todoItemForm.button.disabled = !todoItemForm.input.value;
        });
            
        if(initialTasks != null){
            for(let task of initialTasks){
                let todoItem = createTodoItem(task);
                controlButtonWrapper(todoItem, initialTasks, initialTasks.indexOf(task), localStorageKey);
                todoList.append(todoItem.item);
            }
        }
        else if(initialTasks === null)
            initialTasks = [];

        todoItemForm.form.addEventListener("submit", function(e)
        {
            e.preventDefault();

            if(!todoItemForm.input.value){
                return;
            }
            
            let todoItemName = todoItemForm.input.value;
            let todoItem = createTodoItem(todoItemName);
            let newTask = {name: todoItemName, done: false};
            
            initialTasks.push(newTask);
            controlButtonWrapper(todoItem, initialTasks, initialTasks.indexOf(newTask), localStorageKey);
            todoList.append(todoItem.item);
            localStorage.setItem(
                localStorageKey, 
                JSON.stringify(initialTasks)
                );
            todoItemForm.input.value = "";
            todoItemForm.button.disabled = true;
        });
    }

    window.createTodoApp = createTodoApp;
})();

