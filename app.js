const form = document.getElementById("task-form");
const input = document.getElementById("new-task");
const list = document.getElementById("task-list");
const template = document.getElementById("task-template");
const count = document.getElementById("task-count");
const today = document.getElementById("today");

const tasks = [];

const updateCount = () => {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  count.textContent = `${completed}/${total} tasks`;
};

const renderTask = (task) => {
  const item = template.content.firstElementChild.cloneNode(true);
  const checkbox = item.querySelector("input");
  const text = item.querySelector(".task-text");
  const remove = item.querySelector("button");

  text.textContent = task.text;
  checkbox.checked = task.completed;

  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    updateCount();
  });

  remove.addEventListener("click", () => {
    const index = tasks.indexOf(task);
    if (index > -1) {
      tasks.splice(index, 1);
      item.remove();
      updateCount();
    }
  });

  list.prepend(item);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = input.value.trim();
  if (!value) {
    return;
  }

  const task = { text: value, completed: false };
  tasks.push(task);
  renderTask(task);
  updateCount();
  input.value = "";
});

const formatDate = () => {
  const now = new Date();
  const options = { weekday: "long", month: "short", day: "numeric" };
  return now.toLocaleDateString(undefined, options);
};

today.textContent = formatDate();
updateCount();
