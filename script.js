window.addEventListener('load', () => {
    const form = document.querySelector("#new-task");
    const input = document.querySelector("#new-task-input");
    const tasks_parent = document.getElementById("tasks");

    let todoList = [];

    // Function to save the todo list to localStorage
    const saveTodoList = () => {
        localStorage.setItem('todoList', JSON.stringify(todoList));
    };
    // Function to load the todo list from localStorage
    const loadTodoList = () => {
        const savedTodoList = localStorage.getItem('todoList');
        if (savedTodoList) {
            todoList = JSON.parse(savedTodoList);
            renderTodoList();

        }
    };

    // Function to render the todo list on the page
    const renderTodoList = () => {
        tasks_parent.innerHTML = '';

        todoList.forEach((taskText) => {

            const task_div = document.createElement('div');
            task_div.classList.add('task');


            const content_div = document.createElement('div');
            content_div.classList.add('content');

            task_div.appendChild(content_div);

            const task_input_elm = document.createElement('input');
            task_input_elm.classList.add('text');
            task_input_elm.type = 'text';
            task_input_elm.value = taskText;
            task_input_elm.setAttribute('readonly', 'readonly');

            content_div.appendChild(task_input_elm);

            const buttons_div = document.createElement('div');
            buttons_div.classList.add('buttons');

            // edit button 
            const edit_btn = document.createElement('button');
            edit_btn.classList.add('edit');
            edit_btn.innerText = 'Edit';

            // delete button

            const delete_btn = document.createElement('button');
            delete_btn.classList.add('delete');
            delete_btn.innerText = 'Delete';


            buttons_div.appendChild(edit_btn);
            buttons_div.appendChild(delete_btn);


            task_div.appendChild(buttons_div);
            tasks_parent.appendChild(task_div);


            edit_btn.addEventListener('click', (e) => {
                if (edit_btn.innerText.toLowerCase() == "edit") {
                    edit_btn.innerText = "Save";
                    task_input_elm.removeAttribute("readonly");
                    task_input_elm.focus();

                } else {
                    edit_btn.innerText = "Edit";
                    task_input_elm.setAttribute("readonly", "readonly");
                    todoList.splice(todoList.indexOf(taskText), 1, task_input_elm.value);
                    saveTodoList();
                }

            });
            delete_btn.addEventListener('click', (e) => {
                swal({
                  title: "Are you sure?",
                  text: "Do you want to delete the Task?",
                  icon: "warning",
                  buttons: ["Cancel", "Yes"],
                  dangerMode: true,
                })
                .then((willDelete) => {
                  if (willDelete) {
                    // Delete the task
                    todoList.splice(todoList.indexOf(taskText), 1);
                    saveTodoList();
                    tasks_parent.removeChild(task_div);
                    
                    
                  } 
                });
              });
              
        });
    };


    form.addEventListener('submit', (e) => {
        e.preventDefault();


        const task_input = input.value;

        if (task_input.trim() !== '') {
            todoList.push(task_input);
            saveTodoList();
            renderTodoList();
            input.value = '';
        }

    });
    loadTodoList();
});