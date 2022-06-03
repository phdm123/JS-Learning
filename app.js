//Organização
//Variáveis do DOM:
const submit = document.querySelector('#task-form');
const newTask = document.querySelector('#task');
const ul = document.querySelector('.collection');
const clearTask = document.querySelector('.clear-tasks');
const localStoragePersistence = JSON.parse(localStorage.getItem('tasks'));

//Persistência localStorage
if(localStoragePersistence !== null){
    localStoragePersistence.forEach(function(task){
        const li = document.createElement('li');
        const a = document.createElement('a');
        const i = document.createElement('i');
        li.className = "collection-item";
        li.textContent = task;
        a.href = '#';
        a.className = "delete-item secondary-content";
        i.className = "fa fa-remove";

        a.appendChild(i);
        li.appendChild(a);
        ul.appendChild(li);
    });
}

//Lógica
function addTask(e){
    //Is the task field empty?
    if(newTask.value === ''){
        alert('Empty tasks not allowed!');
        e.preventDefault();
        return;
    }
  
    //Writing DOM
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

function addLocalStorage(e){
    let storage;
    if(localStorage.getItem('tasks') === null){
        storage = [];
    }
    else{
        storage = JSON.parse(localStorage.getItem('tasks'));
    }
    storage.push(newTask.value);
    localStorage.setItem('tasks', JSON.stringify(storage));
    e.preventDefault();
}

function deleteAll(e){
    const lis = document.querySelectorAll('.collection-item');
    lis.forEach(function(li){
        li.remove();
    });
    alert("Removing all tasks.");
    localStorage.clear();
    e.preventDefault();
}

function deleteTask(e){
    if(e.target.classList.contains('delete-item')){ //Caso clique um pouco abaixo do x.
        const textValue = e.target.parentElement.parentElement.textContent;
        for(let i = 0; i < localStoragePersistence.lenght; i++){
            if(textValue === localStoragePersistence[i].textContent){
                localStoragePersistence.splice(i, 1);
                console.log(localStoragePersistence);
            }
        }
        e.target.parentElement.remove();
        localStorage.setItem('tasks',JSON.stringify(localStoragePersistence));
    } else if(e.target.parentElement.classList.contains('delete-item')){
        const textValue = e.target.parentElement.parentElement.textContent;
        for(let i = 0; i < localStoragePersistence.lenght; i++){
            if(textValue === localStoragePersistence[i].textContent){
                localStoragePersistence.splice(i, 1);
                console.log(localStoragePersistence);
            }
        }
        e.target.parentElement.parentElement.remove();
        localStorage.setItem('tasks',JSON.stringify(localStoragePersistence));
    }
}

//Eventos
submit.addEventListener('submit', addLocalStorage); //Has to be first because of newTask.value reset in addTask function.
submit.addEventListener('submit', addTask);
clearTask.addEventListener('click', deleteAll);
ul.addEventListener('click', deleteTask);