// DOM

const monitor = document.querySelector('#monitor')
const result = document.querySelector('.result h2')

// data

let answer = null

console.log(result);

function counting () {
    answer = monitor.value.length
    result.innerText = answer
}

monitor.addEventListener('input',counting)