//Organização
//Variáveis do DOM:
const submit = document.querySelector('#task-form');
const newTask = document.querySelector('#task');
const ul = document.querySelector('.collection');
const clearTask = document.querySelector('.clear-tasks');

//Lógica
function addTask(e){
    if(newTask.value === ''){
        alert('Empty tasks not allowed!');
        e.preventDefault();
        return;
    }
    const li = document.createElement('li');
    const a = document.createElement('a');
    const i = document.createElement('i');
    li.className = "collection-item";
    li.textContent = newTask.value;
    a.href = '#';
    a.className = "delete-item secondary-content";
    i.className = "fa fa-remove";
    
    a.appendChild(i);
    li.appendChild(a);
    ul.appendChild(li);
    newTask.value = '';
    e.preventDefault();
}

function deleteAll(e){
    const lis = document.querySelectorAll('.collection-item');
    lis.forEach(function(li){
        li.remove();
    });
    alert("Removing all tasks.");
    e.preventDefault();
}

function deleteTask(e){
    if(e.target.classList.contains('delete-item')){ //Caso clique um pouco abaixo do x
        e.target.parentElement.remove();
    } else if(e.target.parentElement.classList.contains('delete-item')){
        e.target.parentElement.parentElement.remove();
    }
}

submit.addEventListener('submit', addTask);
clearTask.addEventListener('click', deleteAll);
ul.addEventListener('click', deleteTask);