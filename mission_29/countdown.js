// DOM
const day = document.querySelector('.day h2')
const hour = document.querySelector('.hour h2')
const minute = document.querySelector('.minute h2')
const second = document.querySelector('.second h2')

// const currentTime = new Date().getTime()
const targetTime = new Date("2022/01/01 00:00:00").getTime()



// 測試
// console.log(currentTime)
// console.log(targetTime)
// console.log(timeSub/1000/60/60/24)


const updateTime = () =>{
    let currentTime = new Date().getTime()
    let timeSub = targetTime-currentTime
    let d = Math.floor(timeSub/1000/60/60/24)
    let h = Math.floor(timeSub/1000/60/60)%24
    let m = Math.floor(timeSub/1000/60)%60
    let s = Math.floor(timeSub/1000)%60

    console.log(d,h,m,s);
    // console.log(Math.ceil(d));
    // console.log(Math.floor(d));

    day.innerHTML = d
    hour.innerHTML = h
    minute.innerHTML = m
    second.innerHTML = s
}

setInterval(updateTime,1000)