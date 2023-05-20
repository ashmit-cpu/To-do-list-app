window.addEventListener('load', () => {
    const form = document.querySelector("#new-task");
    const input = document.querySelector("#new-task-input");
    const tasks_parent = document.getElementById("tasks");

    form.addEventListener('submit', (e) => {
        e.preventDefault();


        const task_input = input.value;

        const task_div = document.createElement('div');
        task_div.classList.add('task');

        const content_div = document.createElement('div');
        content_div.classList.add('content');

        task_div.appendChild(content_div);

        const task_input_elm = document.createElement('input');
        task_input_elm.classList.add('text');
        task_input_elm.type = 'text';
        task_input_elm.value = task_input;
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


        input.value = '';
       


        edit_btn.addEventListener('click', (e) => {
            if (edit_btn.innerText.toLowerCase() == "edit") {
                edit_btn.innerText = "Save";
                task_input_elm.removeAttribute("readonly");
                task_input_elm.focus();

            } else {
                edit_btn.innerText = "Edit";
                task_input_elm.setAttribute("readonly", "readonly");
            }

        });
        delete_btn.addEventListener('click',(e)=>{
        tasks_parent.removeChild(task_div);
        });
    });

});