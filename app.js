const form = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

async function getTasks() {
  const res = await fetch('http://localhost:5000/tasks');
  const data = await res.json();

  data.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.title;
    taskList.append(li);
  });
}

form.addEventListener('submit', async e => {
  e.preventDefault();

  const res = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: taskInput.value,
    }),
  });
  const data = await res.json();
  const li = document.createElement('li');
  li.textContent = data.title;
  taskList.append(li);

  taskInput.value = '';
});

getTasks();
