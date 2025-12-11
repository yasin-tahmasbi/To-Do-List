// header text //

const txt = document.getElementById("txt");

let typeIndex = 1;
let deleteIndex = 0;
let wordIndex = 0;

const word = ["Just Do It"];

const interval = setInterval(() => {
    const currentWord = word[0]

    if (typeIndex <= currentWord.length) {
        txt.innerText = currentWord.slice(0, typeIndex)
        typeIndex++
        deleteIndex = typeIndex
        return
    }
    if (deleteIndex >= 0) {
        txt.innerText = currentWord.slice(0, deleteIndex)
        deleteIndex--
        return
    }

    typeIndex = 1;
    deleteIndex = 0;
}, 150);

// header text //

// dark/light btn //

const darkModeBtn = document.querySelector('#darkModeBtn')
const darkModeSpan = document.querySelector('#darkModeSpan')
const svgSun = document.querySelector('#svgSun')
const svgMoon = document.querySelector('#svgMoon')

let _status = true

function toggle() {
    if (_status) {
        localStorage.setItem('theme', 'dark')
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.classList.add('dark')
        }
        darkModeSpan.classList.remove('left-1');
        darkModeSpan.classList.add('left-11');

        darkModeBtn.classList.remove('bg-[#73C0FC]');
        darkModeBtn.classList.add('bg-[#183153]');

        svgSun.classList.remove('block');
        svgSun.classList.add('hidden');

        svgMoon.classList.remove('hidden');
        svgMoon.classList.add('block');
    } else {
        localStorage.setItem('theme', 'light')
        if (localStorage.getItem('theme') === 'light') {
            document.documentElement.classList.remove('dark')
        }
        darkModeSpan.classList.remove('left-11');
        darkModeSpan.classList.add('left-1');

        darkModeBtn.classList.remove('bg-[#183153]');
        darkModeBtn.classList.add('bg-[#73C0FC]');

        svgMoon.classList.remove('block');
        svgMoon.classList.add('hidden');

        svgSun.classList.remove('hidden');
        svgSun.classList.add('block');
    }

    _status = !_status
}
// dark/light btn //

// aside click //

const asideLi = document.querySelectorAll('aside>div>ul>li')
const task = document.querySelector('#task')
const trash = document.querySelector('#trash')

task.classList.add('block')
trash.classList.add('hidden')

asideLi.forEach((item, index) => {
    item.addEventListener('click', () => {
        if (index === 0) {
            task.classList.add('block');
            task.classList.remove('hidden');
            trash.classList.add('hidden');
            trash.classList.remove('block');
        } else if (index === 1) {
            task.classList.add('hidden');
            task.classList.remove('block');
            trash.classList.add('block');
            trash.classList.remove('hidden');
        }
    })
})

// aside click //

// tasks //

const taskInput = document.getElementById('taskInput')
const addBtn = document.getElementById('addBtn')
const taskUl = document.getElementById('taskUl')
const doneList = document.getElementById('doneList')
const search = document.getElementById('search')

addBtn.addEventListener('click', () => {
    let taskLi = taskInput.value
    if (taskLi === '') {
        taskInput.classList.add('border-red-600')
    } else {
        newLi(taskLi)
        taskInput.value = null
        taskInput.focus()
    }

})

function newLi(taskLi) {
    const li = document.createElement('li')
    li.innerHTML = `
      <p>${taskLi}</p>
      <div class="flex gap-4 *:cursor-pointer">
        <i class="ri-delete-bin-fill text-[#EF233C]"></i>
        <i class="ri-pencil-fill"></i>
        <i class="ri-check-line text-[23px] font-black"></i>
      </div>
    `
    const _delete = li.querySelector('.ri-delete-bin-fill')
        _delete.addEventListener('click', ()=>{
            li.remove()
        })
    taskUl.appendChild(li)
}





// tasks //