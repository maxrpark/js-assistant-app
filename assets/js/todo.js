import renderList from './utils/renderList.js';
import year from './utils/showYear.js';
import showAlertMessage from './utils/showAlertMessage.js';

// variables
let taskID;
const InputText = document.getElementById('input-text');
const todoContainer = document.querySelector('.todo-container');
export let isEditing = false;
export let todoList = localStorage.getItem('JSTodoList');

// listen event
const form = document.getElementById('form');
const removeItems = document.getElementById('removeAll');
const textValue = InputText;
let task = {
  id: null,
  value: '',
};

// create localStorage
if (todoList) {
  todoList = JSON.parse(localStorage.getItem('JSTodoList'));
  renderList();
} else {
  todoList = [];
  localStorage.setItem('JSTodoList', JSON.stringify(todoList));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (textValue.value) {
    if (isEditing) {
      todoList.map((task) => {
        if (task.id === taskID) {
          task.value = textValue.value;
        }
        textValue.value = '';
        isEditing = false;
      });
      showAlertMessage('Edited', 'success');
    } else {
      task = {
        id: new Date().getTime().toString(),
        value: textValue.value,
      };
      todoList.push(task);
      textValue.value = '';
      task = {
        id: null,
        value: '',
      };
      showAlertMessage('Task created', 'success');
    }
  }
  renderList();
});

// remove items

removeItems.addEventListener('click', () => {
  todoContainer.innerHTML = '';
  todoList = [];
  showAlertMessage('All Tasks Deleted', 'danger');
  removeItems.style.display = 'none';
  renderList(); // to clear local storage
});

// task options
todoContainer.addEventListener('click', (e) => {
  let target = e.target;
  taskID = target.parentElement.parentElement.dataset.id;
  // complete task
  if (target.classList.contains('completeItem')) {
    target.parentElement.parentElement.classList.toggle('isComplete');
  } else {
    // edit task
    if (target.classList.contains('editItem')) {
      isEditing = true;
      todoList.map((task) => {
        if (task.id === taskID) {
          textValue.value = task.value;
        }
      });
      showAlertMessage('Editing', 'warning');
    }
    // delete Task;
    else if (target.classList.contains('deleteItem')) {
      todoList = todoList.filter((task) => task.id !== taskID);
      renderList();
      showAlertMessage('Task Deleted', 'danger');
    }
  }
});