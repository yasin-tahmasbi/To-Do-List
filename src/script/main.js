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
