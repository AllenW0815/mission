// origin Data
const number = ['08','18','27','33','47','52','66','79','87','99']
const listItems = []
// DOM
const dragArea = document.querySelector('.drag-area')
const checkBtn = document.querySelector('.check-btn')
// 讓陣列隨機排序 這個實作使用另一個方式打亂排列
const random = (a,b) => Math.random() > 0.5 ? 1 : -1
// 起始拖曳區塊位置索引 在dragstart的時候會賦值
let dragStartIndex = null;

// 事件監聽執行
function dragStart() {
    // 一拖曳的時候會觸發
    // console.log('Event','dragStart');
    dragStartIndex = this.closest('li').getAttribute('data-index')    
    // console.log(dragStartIndex);
}
function dragEnter() {
    // 進入範圍時會觸發
    // console.log('Event','dragEnter');
    // console.log(this);
    this.classList.add('over')
}
function dragLeave() {
    // 離開範圍時會觸發
    // console.log('Event','dragLeave');
    this.classList.remove('over')
}
function dragOver(e) {
    // 到目標物上時持續被觸發
    // console.log('Event','dragOver');
    e.preventDefault();
}
function dragDrop() {
    // console.log('Event','drop');
    const dragEndIndex =  this.getAttribute('data-index')
    swapItems(dragStartIndex, dragEndIndex)   
    this.classList.remove('over')
}
const swapItems = (fromIndex, toIndex) =>{
    // console.log(fromIndex,toIndex);
    let firstItem = listItems[fromIndex].querySelector('.draggable')
    let secondItem = listItems[toIndex].querySelector('.draggable')

    console.log(firstItem,secondItem);
    console.log(listItems[fromIndex],listItems[toIndex]);
    listItems[fromIndex].appendChild(secondItem)
    listItems[toIndex].appendChild(firstItem)
}

// 事件監聽
const addEventListeners = () =>{
    const draggables = document.querySelectorAll('.draggable')
    const listItems = document.querySelectorAll('.drag-area li')

    draggables.forEach(draggable =>{
        draggable.addEventListener('dragstart',dragStart) 
    })

    listItems.forEach(item =>{
        item.addEventListener('dragenter',dragEnter)
        item.addEventListener('dragleave',dragLeave)
        item.addEventListener('dragover',dragOver)
        item.addEventListener('drop',dragDrop)
    })
}

// 主執行
const createList = () =>{
    [...number]
    .map(num => ( { value : num, sort : Math.random()} ))
    .sort((a, b) => a.sort - b.sort)
    .forEach((item,index) => {
        // console.log(item);
        const listItem = document.createElement('li')
        listItem.setAttribute('data-index', index)
        listItem.innerHTML =
        `
        <span class="number"> ${index+1}.</span>
        <div class="draggable" draggable="true">
        <p>Drag Number : ${item.value}</p>
        <i class="fas fa-bars"></i>
        </div>        
        `
        listItems.push(listItem)
        // console.log(listItems);
        dragArea.appendChild(listItem)
    });
    addEventListeners()
}
createList()

function checkOrder(){
    const standerOrder = []
    let ps = document.querySelectorAll('p')

    ps.forEach(p => {
        standerOrder.push((p.innerText).slice(-2))  
    })
    standerOrder.sort().reverse();
    // console.log(standerOrder);
    ps.forEach((p,index) => {
          if((p.innerText).slice(-2) !== standerOrder[index]){
            p.classList.remove('correct')
            p.classList.add('wrong')
          } else{
            p.classList.remove('wrong')
            p.classList.add('correct')
          }
    })

}

checkBtn.addEventListener('click',checkOrder)


