import renderList from './utils/renderList.js';
import year from './utils/showYear.js';
import showAlertMessage from './utils/showAlertMessage.js';

// Variables
let taskID;
const InputText = document.getElementById('input-text');
const todoContainer = document.querySelector('.todo-container');
export let isEditing = false;
export let todoList = localStorage.getItem('JSTodoList');

// Listen event
const form = document.getElementById('form');
const removeItems = document.getElementById('removeAll');
const textValue = InputText;
let task = {
  id: null,
  value: '',
};

// Create localStorage
if (todoList) {
  todoList = JSON.parse(localStorage.getItem('JSTodoList'));
  renderList();
} else {
  todoList = [];
  localStorage.setItem('JSTodoList', JSON.stringify(todoList));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (textValue.value && textValue.value.trim() !== '') {
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
  } else {
    showAlertMessage('Please enter a task', 'danger');
  }
  renderList();
});

// Remove items

removeItems.addEventListener('click', () => {
  todoContainer.innerHTML = '';
  todoList = [];
  showAlertMessage('All Tasks Deleted', 'danger');
  removeItems.style.display = 'none';
  renderList(); // to clear local storage
});

// Task options
todoContainer.addEventListener('click', (e) => {
  let target = e.target;
  textValue.value = '';
  isEditing = false;
  taskID = target.parentElement.parentElement.dataset.id;
  // Complete task
  if (target.classList.contains('completeItem')) {
    target.parentElement.parentElement.classList.toggle('isComplete');
  } else {
    // Edit task
    if (target.classList.contains('editItem')) {
      isEditing = true;
      todoList.map((task) => {
        if (task.id === taskID) {
          textValue.value = task.value;
        }
      });
      showAlertMessage('Editing', 'warning');
    }
    // Delete Task;
    else if (target.classList.contains('deleteItem')) {
      todoList = todoList.filter((task) => task.id !== taskID);
      renderList();
      showAlertMessage('Task Deleted', 'danger');
    }
  }
});
