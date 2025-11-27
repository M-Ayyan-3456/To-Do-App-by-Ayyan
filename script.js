"use script";
const addBtn = document.querySelector(".add-icon");
const addItems = document.querySelector(".add-items");
const addWindow = document.querySelector(".overlay");
const workPlus = document.querySelector(".work-plus");
const modalWindow = document.querySelector(".modal-window");
const approveWindow = document.querySelector(".approve-window");
const doneBtn = document.querySelector(".done-btn");
const inputData = document.querySelector(".modal-input-work");
const dateData = document.querySelector(".modal-input-date");
const workList = document.querySelector(".work-list");
const completeList = document.querySelector(".complete-list");
const tick = document.querySelector(".tick");
const del = document.querySelector(".del");
const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");
///////////////////////
///////////////
let html = ``;
const error = function () {
  alert("Any field cannot be empty");
};

addBtn.addEventListener("click", function (e) {
  addWindow.classList.toggle("active");
});
workPlus.addEventListener("click", function (e) {
  addWindow.classList.toggle("active");
});
addItems.addEventListener("click", function () {
  addWindow.classList.toggle("active");
});
addWindow.addEventListener("click", function (e) {
  if (!modalWindow.contains(e.target)) {
    addWindow.classList.toggle("active");
  } else {
    return;
  }
});

doneBtn.addEventListener("click", function (e) {
  const text = inputData.value.trim();
  let date = dateData.value;
  console.log(date);

  if (!text || !date) {
    error();
    addWindow.classList.toggle("active");
    return;
  }

  addWindow.classList.toggle("active");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  html = `<li class="work">
  <p class="number"><span class="count">${tasks.length + 1}</span></p>
        <p class="work-text">${text}</p>
        <p class="work-date">${date}
           <span class="con-btn"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
      stroke="currentColor" class="icon tick">
      <path stroke-linecap="round" stroke-linejoin="round" 
      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon del">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
</span></p>
        </li>`;

  workList.insertAdjacentHTML("afterbegin", html);
  tasks.push({ text, date });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  ///////////////
  inputData.value = "";
  dateData.value = "";
});
document.addEventListener("click", function (e) {
  const clickedDel = e.target.closest(".del");
  if (!clickedDel) return;
  const workItem = clickedDel.closest(".work");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const text = workItem.querySelector(".work-text").textContent.trim();
  tasks = tasks.filter((t) => t.text !== text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  workItem.remove();
});

document.addEventListener("click", function (e) {
  const clickedTick = e.target.closest(".tick");

  if (!clickedTick) return;

  const workItem = clickedTick.closest(".work");
  const textEl = workItem.querySelector(".work-text");
  const dateEl = workItem.querySelector(".work-date");
  // Add completed style

  approveWindow.classList.toggle("active");
  noBtn.addEventListener("click", function () {
    approveWindow.classList.remove("active");
    return;
  });
  yesBtn.addEventListener("click", function (e) {
    textEl.classList.add("complete-text");
    approveWindow.classList.toggle("active");
    // Move to complete list

    html = `
    <li class="work">
    <p class="work-text complete-text">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
    stroke-width="1.5" stroke="currentColor" class="icon">
    <path stroke-linecap="round" stroke-linejoin="round"
    d="m4.5 12.75 6 6 9-13.5" />
    </svg>
    ${textEl.textContent}
    </p>
    <p class="work-date">${dateEl.textContent}</p>
    </li>
    `;
    let taskComplete = JSON.parse(localStorage.getItem("taskComplete")) || [];
    taskComplete.push({ text: textEl.textContent, date: dateEl.textContent });
    localStorage.setItem("taskComplete", JSON.stringify(taskComplete));

    completeList.insertAdjacentHTML("afterbegin", html);

    // remove from active list
    workItem.remove();

    ///////// const workItem = clickedDel.closest(".work");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const text = workItem.querySelector(".work-text").textContent.trim();
    tasks = tasks.filter((t) => t.text !== text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    workItem.remove();
  });
});

window.addEventListener("DOMContentLoaded", function () {
  const work = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskComplete = JSON.parse(localStorage.getItem("taskComplete")) || [];
  console.log(work);
  work.forEach((tasks, i) => {
    const htmlWork = `
      <li class="work">
  <p class="number"><span class="count">${i + 1}</span></p>
      <p class="work-text">
     ${tasks.text}</p>
      <p class="work-date">${tasks.date}
      <span class="con-btn"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
      stroke="currentColor" class="icon tick">
      <path stroke-linecap="round" stroke-linejoin="round" 
      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon del">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
</span></p>
      </li>`;

    workList.insertAdjacentHTML("afterbegin", htmlWork);
  });
  taskComplete.forEach((taskComplete) => {
    const htmlComplete = `<li class="work">
    <p class="work-text complete-text">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
    stroke-width="1.5" stroke="currentColor" class="icon">
    <path stroke-linecap="round" stroke-linejoin="round" 
    d="m4.5 12.75 6 6 9-13.5" />
    </svg>
    ${taskComplete.text}
    </p>
    <p class="work-date complete-text">${taskComplete.date}
    </p>
    </li>
    `;
    console.log(taskComplete);
    completeList.insertAdjacentHTML("afterbegin", htmlComplete);
  });
});
// localStorage.clear();
