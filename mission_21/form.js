//input
const userName = document.querySelector('#userName')
const email = document.querySelector('#email')
const phoneNumber = document.querySelector('#phoneNumber')
const password = document.querySelector('#password')
const passwordCheck = document.querySelector('#passwordCheck')
//錯誤提示
const samlls = document.querySelectorAll('small')
//表單
const form = document.querySelector('.form')

// console.log(samlls[0].innerText)


const checkUserName = ()=>{
    let targetOfComparison = userName.value.trim()
    if(targetOfComparison.length > 2 && targetOfComparison.length < 15){
        samlls[0].innerText = ''
    }else if(targetOfComparison.length < 3){
        samlls[0].innerText = '最少為3個英文及數字'
    }else if(targetOfComparison.length > 15){
        samlls[0].innerText = '最多為15個英文及數字'
    }else return
}
//不過不用正則的話就無法避掉標點符號了
userName.addEventListener('keyup',checkUserName)
//用 keyup 來實現輸入之後馬上進行檢查
//若用 change 的話需要離開後才可以觸發
//若用 focus 的話需離開後再次進入該 input 才可以觸發

const checkEmail = ()=>{
    //正則上網查再自己測試
    let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let targetOfComparison = email.value.trim()
    if(reg.test(targetOfComparison)){
        samlls[1].innerText = ''
    }else{
        samlls[1].innerText = '郵件格式錯誤'
    }
}
email.addEventListener('keyup',checkEmail)

const checkPhoneNumber = ()=>{
    //正則自己寫的 未上網確認
    let reg = /^09[0-9]{8}$/
    let targetOfComparison = phoneNumber.value.trim()
    if(reg.test(targetOfComparison)){
        samlls[2].innerText = ''
    }else{
        samlls[2].innerText = '電話號碼格式錯誤'
    }
}
phoneNumber.addEventListener('keyup',checkPhoneNumber)

const checkPassword = ()=>{
    let reg = /^\d{6,16}$/
    let targetOfComparison = password.value.trim()
    if(reg.test(targetOfComparison)){
        samlls[3].innerText = ''
    }else if(targetOfComparison.length < 6){
        samlls[3].innerText = '密碼至需6碼以上'
    }else if(targetOfComparison.length > 16){
        samlls[3].innerText = '密碼至需16碼以下'
    }else return
}
password.addEventListener('keyup',checkPassword)

const doubleCheck = ()=>{
    let firstInuput = password.value.trim()
    let secondInput = passwordCheck.value.trim()
    if(secondInput === firstInuput){
        samlls[4].innerText = ''
    }else{
        samlls[4].innerText = '與第一次輸入密碼不符'
    }
}
passwordCheck.addEventListener('keyup',doubleCheck)

form.addEventListener('submit',function(e){
    e.preventDefault()
})