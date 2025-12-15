// header ـtext ////////////////////////////////////////////

const txt = document.getElementById("txt");

let typeIndex = 1;
let deleteIndex = 0;
let wordIndex = 0;

const word = ["Just Do It"];

const interval = setInterval(() => {
  const currentWord = word[0];

  if (typeIndex <= currentWord.length) {
    txt.innerText = currentWord.slice(0, typeIndex);
    typeIndex++;
    deleteIndex = typeIndex;
    return;
  }
  if (deleteIndex >= 0) {
    txt.innerـtext = currentWord.slice(0, deleteIndex);
    deleteIndex--;
    return;
  }

  typeIndex = 1;
  deleteIndex = 0;
}, 150);

// header ـtext ////////////////////////////////////////////

// dark/light btn ////////////////////////////////////////////////

const darkModeBtn = document.querySelector("#darkModeBtn");
const darkModeSpan = document.querySelector("#darkModeSpan");
const svgSun = document.querySelector("#svgSun");
const svgMoon = document.querySelector("#svgMoon");

let _status = true;

function toggle() {
  if (_status) {
    localStorage.setItem("theme", "dark");
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    }
    darkModeSpan.classList.remove("left-1");
    darkModeSpan.classList.add("left-11");

    darkModeBtn.classList.remove("bg-[#73C0FC]");
    darkModeBtn.classList.add("bg-[#183153]");

    svgSun.classList.remove("block");
    svgSun.classList.add("hidden");

    svgMoon.classList.remove("hidden");
    svgMoon.classList.add("block");
  } else {
    localStorage.setItem("theme", "light");
    if (localStorage.getItem("theme") === "light") {
      document.documentElement.classList.remove("dark");
    }
    darkModeSpan.classList.remove("left-11");
    darkModeSpan.classList.add("left-1");

    darkModeBtn.classList.remove("bg-[#183153]");
    darkModeBtn.classList.add("bg-[#73C0FC]");

    svgMoon.classList.remove("block");
    svgMoon.classList.add("hidden");

    svgSun.classList.remove("hidden");
    svgSun.classList.add("block");
  }

  _status = !_status;
}
// dark/light btn ////////////////////////////////////////////////

// aside click ////////////////////////////////////////////////

const asideLi = document.querySelectorAll("aside>ul>li");
const task = document.querySelector("#task");
const trash = document.querySelector("#trash");

task.classList.add("block");
trash.classList.add("hidden");

asideLi.forEach((item, index) => {
  item.addEventListener("click", () => {
    if (index === 0) {
      task.classList.add("block");
      task.classList.remove("hidden");
      trash.classList.add("hidden");
      trash.classList.remove("block");
    } else if (index === 1) {
      task.classList.add("hidden");
      task.classList.remove("block");
      trash.classList.add("block");
      trash.classList.remove("hidden");
    }
  });
});

// aside click //////////////////////////////////////////

// tasks /////////////////////////////////////////////

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskUl = document.getElementById("taskUl");
const doneList = document.getElementById("doneList");
const search = document.getElementById("search");
const trashUl = document.getElementById("trashUl");
let ـtext = "";
let arrTasks = [];
const savedTasks = localStorage.getItem("tasks");

if (savedTasks) {
  arrTasks = JSON.parse(savedTasks);
}

arrTasks.forEach((task) => {
  if (task.status === "todo") {
    newLi(task);
  } else if (task.status === "trash") {
    newTrashLi(task);
  } else if (task.status === "done") {
    doneItem(task);
  }
});

addBtn.addEventListener("click", () => {
  ـtext = taskInput.value;
  if (ـtext === "") {
    taskInput.classList.add("border-red-600");
  } else {
    let taskObj = {
      text: ـtext,
      status: "todo",
      id: Date.now(),
    };
    arrTasks.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(arrTasks));
    newLi(taskObj);
    taskInput.value = null;
    taskInput.focus();
  }
});

function newLi(taskObj) {
  const li = document.createElement("li");
  li.dataset.id = taskObj.id;
  li.innerHTML = ` 
      <p>${taskObj.text}</p>
      <div class="flex gap-4 *:cursor-pointer items-center">
        <i class="ri-delete-bin-fill text-[#EF233C]"></i>
        <i class="ri-pencil-fill"></i>
        <i class="ri-check-line text-[23px] font-black"></i>
      </div>
    `;
  taskUl.appendChild(li);

  // done btn  ///////////////////////////////////

  const doneBtn = li.querySelector(".ri-check-line");
  doneBtn.addEventListener("click", () => {
    let index = arrTasks.findIndex((item) => item.id == taskObj.id);
    if (index !== -1) {
      arrTasks[index].status = "done";
      localStorage.setItem("tasks", JSON.stringify(arrTasks));
    }
    li.remove();
    doneItem(taskObj);
  });

  // edit btn  ///////////////////////////////////
  const editBtn = li.querySelector(".ri-pencil-fill");
  editBtn.addEventListener("click", () => {
    const p = li.querySelector("p");
    const currentText = p.innerText.trim();
    const input = document.createElement("input");
    input.type = "text";
    input.value = currentText;
    input.className = "border-2 border-[#00B4D8] px-2 py-1 outline-0";
    li.replaceChild(input, p);

    input.focus();
    input.addEventListener("blur", saveEdit);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        saveEdit();
      }
    });

    function saveEdit() {
      const newText = input.value.trim();
      if (newText !== "") {
        p.innerText = newText;
        li.replaceChild(p, input);
        const index = arrTasks.findIndex((item) => item.id == taskObj.id);
        if (index !== -1) {
          arrTasks[index].text = newText;
          localStorage.setItem("tasks", JSON.stringify(arrTasks));
        }
      } else {
        li.replaceChild(p, input);
      }
    }
  });
  // delete btn to do list /////////////////////////////////////
  const deleteBtn = li.querySelector(".ri-delete-bin-fill");
  deleteBtn.addEventListener("click", () => {
    let index = arrTasks.findIndex((item) => item.id == taskObj.id);

    if (index !== -1) {
      arrTasks[index].status = "trash";
      localStorage.setItem("tasks", JSON.stringify(arrTasks));
    }
    li.remove();
    newTrashLi(taskObj);
  });
}

// Done List function ///////////////

function doneItem(taskObj) {
  const li = document.createElement("li");
  li.dataset.id = taskObj.id;
  li.innerHTML = `
      <del>${taskObj.text}</del>
     <div class="flex gap-4 *:cursor-pointer">
       <i class="ri-delete-bin-fill text-[#EF233C]"></i>
       <i class="ri-arrow-go-back-fill"></i>
     </div>
      `;
  doneList.appendChild(li);

  const restore = li.querySelector(".ri-arrow-go-back-fill");
  restore.addEventListener("click", () => {
    const index = arrTasks.findIndex((item) => item.id === taskObj.id);

    if (index !== -1) {
      arrTasks[index].status = "todo";
      localStorage.setItem("tasks", JSON.stringify(arrTasks));
    }
    li.remove();
    newLi(taskObj);
  });

  const doneDeleteBtn = li.querySelector(".ri-delete-bin-fill");
  doneDeleteBtn.addEventListener("click", () => {
    const index = arrTasks.findIndex((item) => item.id === taskObj.id);
    if (index !== -1) {
      arrTasks[index].status = "trash";
      localStorage.setItem("tasks", JSON.stringify(arrTasks));
    }
    li.remove();
    newTrashLi(taskObj);
  });
}

///////////////////////////////////////

function newTrashLi(taskObj) {
  const li = document.createElement("li");
  li.dataset.id = taskObj.id;
  li.innerHTML = ` 
      <p>${taskObj.text}</p>
      <div class="flex gap-4 *:cursor-pointer items-center">
        <i class="ri-delete-bin-fill text-[#EF233C]"></i>
      </div>
    `;
  trashUl.appendChild(li);
  // delete btn //////////////////////////////////////
  const deleteBtn = li.querySelector(".ri-delete-bin-fill");
  deleteBtn.addEventListener("click", () => {
    let index = arrTasks.findIndex((item) => item.id == taskObj.id);

    if (index !== -1) {
      arrTasks[index].status = "trash";
      localStorage.setItem("tasks", JSON.stringify(arrTasks));
    }
    li.remove();

    const trashLi = document.createElement("li");
    trashLi.dataset.id = taskObj.id;
    trashLi.innerHTML = `
    <p>${taskObj.text}</p>
    <div class="flex gap-4 *:cursor-pointer">
      <i id="trashId" class="ri-delete-bin-fill text-[#EF233C]"></i>
    </div>
  `;

    trashUl.appendChild(trashLi);

    const trashItem = trashLi.querySelector(".ri-delete-bin-fill");
    console.log(trashItem);

    trashItem.addEventListener("click", () => {
      const index = arrTasks.findIndex((item) => item.id == trashLi.dataset.id);
      if (index !== -1) {
        arrTasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(arrTasks));
      }
      trashLi.remove();
    });
  });
}

// tasks //
