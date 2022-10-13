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

    function createTodoApp(container, title = "Список дел", initialTasks = []){
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);
        
        

        todoItemForm.input.addEventListener("input", function(){
            if(!todoItemForm.input.value){
                todoItemForm.button.disabled = true;
            }
            else if (todoItemForm.input.value){
                todoItemForm.button.disabled = false;
            }
    
        });

            
        if(initialTasks.length != 0){
            for(let task of initialTasks){
                let todoItem = createTodoItem(task);
                if(task.done)
                    todoItem.item.classList.toggle("list-group-item-success");
                
                todoItem.doneButton.addEventListener("click", function(){
                    todoItem.item.classList.toggle("list-group-item-success");
                });
    
                todoItem.deleteButton.addEventListener("click", function(){
                    if (confirm("Вы уверенны?")){
                        todoItem.item.remove();
                    }
                });
                todoList.append(todoItem.item);
            }
        }

        todoItemForm.form.addEventListener("submit", function(e)
        {
            e.preventDefault();

            if(!todoItemForm.input.value){
                return;
            }

            let todoItem = createTodoItem(todoItemForm.input.value);

            todoItem.doneButton.addEventListener("click", function(){
                todoItem.item.classList.toggle("list-group-item-success");
            });

            todoItem.deleteButton.addEventListener("click", function(){
                if (confirm("Вы уверенны?")){
                    todoItem.item.remove();
                }
            });
            todoList.append(todoItem.item);
            todoItemForm.input.value = "";
            todoItemForm.button.disabled = true;
        });
    }

    window.createTodoApp = createTodoApp;
})();

