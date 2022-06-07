//Organização
//Variáveis do DOM:
const submit = document.querySelector('#task-form');
const newTask = document.querySelector('#task');
const ul = document.querySelector('.collection');
const clearTask = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
let localStoragePersistence = JSON.parse(localStorage.getItem('tasks'));

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
    if(newTask.value === ''){
        e.preventDefault();
        return;
    }

    if(localStoragePersistence === null){ //Nenhuma task foi adicionada ainda.
        localStoragePersistence = [];
        localStoragePersistence.push(newTask.value);
    }
    else{ //Alguma task existe ou existiu.
        localStoragePersistence.push(newTask.value);
    }
    localStorage.setItem('tasks', JSON.stringify(localStoragePersistence));
    e.preventDefault();
}

function deleteAll(e){
    const lis = document.querySelectorAll('.collection-item');
    lis.forEach(function(li){
        li.remove();
    });
    alert("Removing all tasks.");
    localStoragePersistence = []; //Mantendo localStoragePersistence igual ao localStorage.
    localStorage.setItem('tasks', JSON.stringify(localStoragePersistence));
    e.preventDefault();
}

function deleteTask(e){
    if(e.target.classList.contains('delete-item')){ //Caso clique um pouco abaixo do x.
        //Criando um array de todas as tasks inseridas.
        const childrenArray = Array.from(ul.children);
        
        //Removendo a task clicada pelo índice.
        localStoragePersistence.splice(childrenArray.indexOf(e.target.parentElement), 1);
        localStorage.setItem('tasks', JSON.stringify(localStoragePersistence));
        e.target.parentElement.remove();

    } else if(e.target.parentElement.classList.contains('delete-item')){
        //Criando um array de todas as tasks inseridas.
        const childrenArray = Array.from(ul.children);
        
        //Removendo a task clicada pelo índice.
        localStoragePersistence.splice(childrenArray.indexOf(e.target.parentElement.parentElement), 1);
        localStorage.setItem('tasks', JSON.stringify(localStoragePersistence));
        e.target.parentElement.parentElement.remove();
    }
}
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    // console.log(document.querySelectorAll('.collection-item'))
    document.querySelectorAll('.collection-item').forEach(function(task) {
        if (task.textContent.toLowerCase().indexOf(text) !== -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    }) 
       
}

//Eventos
submit.addEventListener('submit', addLocalStorage); //Has to be first because of newTask.value reset in addTask function.
submit.addEventListener('submit', addTask);
clearTask.addEventListener('click', deleteAll);
ul.addEventListener('click', deleteTask);
filter.addEventListener('keyup', filterTasks);