let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

const toggleBtn = document.getElementById('themeToggle');

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (!text) return;

  tasks.push({ text, completed: false });
  input.value = '';
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function filterTasks(filter, el) {
  currentFilter = filter;

  document.querySelectorAll('.filters button')
    .forEach(btn => btn.classList.remove('active'));

  el.classList.add('active');

  renderTasks();
}

function updateCounter() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;

  document.getElementById('taskCounter').innerText = `${completed}/${total} concluídas`;

  if (total > 0 && completed === total) {
    document.getElementById('message').innerText = '🎉 Parabéns, você concluiu todas as atividades de hoje!';
    document.getElementById('message').classList.remove('hidden');
  } else {
    document.getElementById('message').classList.add('hidden');
  }
}

function renderTasks() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  tasks
    .filter(task => {
      if (currentFilter === 'pending') return !task.completed;
      if (currentFilter === 'completed') return task.completed;
      return true;
    })
    .forEach((task, index) => {
      const li = document.createElement('li');
      if (task.completed) li.classList.add('completed');

      li.innerHTML = `
        <span onclick="toggleTask(${index})">${task.text}</span>
        <div class="actions">
          <button onclick="toggleTask(${index})">✔</button>
          <button onclick="deleteTask(${index})">🗑</button>
        </div>
      `;

      list.appendChild(li);
    });

    updateCounter();
}

// THEME
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light');
    toggleBtn.innerText = '☀️';
  }
}

function toggleTheme() {
  document.body.classList.toggle('light');

  const isLight = document.body.classList.contains('light');
  toggleBtn.innerText = isLight ? '☀️' : '🌙';

  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

toggleBtn.addEventListener('click', toggleTheme);

loadTheme();
renderTasks();


