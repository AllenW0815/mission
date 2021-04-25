// DOM

const monitor = document.querySelector('#monitor')
const result = document.querySelector('.result')

// data

let answer = null

function counting () {
    answer = monitor.value.length
    result.innerHTML = answer
}

monitor.addEventListener('input',counting)