const url = 'https://jsonplaceholder.typicode.com/posts'

// DOM element
const resultContainer = document.querySelector('.result-container')
const filter = document.querySelector('.filter')
const loader = document.querySelector('.loader')

let limit = 5
let page = 1

// copy origin data
let backupData = null

async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
    const data = await res.json()
    // console.log(data);
    return data
}

// show post in Dom
async function showPosts(){
    const posts = await getPosts()
    // console.log(posts);
    let display = ''
    for (let i = 0 ; i < posts.length ; i++ ){
        display +=
        `
        <div class="post">
            <div class="number">${posts[i].id}</div>
            <div class="post-info">
                <h2 class="title">${posts[i].title}</h2>
                <p class="body">${posts[i].body}</p>
            </div>
        </div>
        `
    }
    resultContainer.innerHTML = display
}
async function showPosts2(){
    const posts = await getPosts()

    posts.forEach( post =>{
        const postEl = document.createElement('div')
        postEl.classList.add('post')
        postEl.innerHTML =
        `
        <div class="number">${post.id}</div>
        <div class="post-info">
            <h2 class="title">${post.title}</h2>
            <p class="body">${post.body}</p>
        </div>
        `
        resultContainer.appendChild(postEl)
    })
}

function showLoader() {
    loader.classList.add('show')
    setTimeout(() => {
        loader.classList.remove('show')
        setTimeout(() => {
           limit += 5 ;
        //    page ++ ;
           showPosts() 
        }  , 300)    
    } , 1200)
}
function showLoader2() {
    loader.classList.add('show')
    setTimeout(() => {
        loader.classList.remove('show')
        setTimeout(() => {
           page ++ ;
           showPosts2() 
        }  , 200)    
    } , 500)
}

// init
// showPosts()
showPosts2()

window.addEventListener('scroll',()=>{
    // console.log('scrollHeight',document.documentElement.scrollHeight);
    // console.log('clientHeight',document.documentElement.clientHeight);
    // console.log('scrollTop',document.documentElement.scrollTop);
    
    const {scrollTop,scrollHeight,clientHeight} = document.documentElement

    if(scrollTop+clientHeight >= scrollHeight - 3){
        // console.log('123');
        // showLoader()
        showLoader2()
    }
})



// search function
filter.addEventListener('input',(e)=>{
    // console.log(e.target.value);
    const compareTarget = e.target.value.toLowerCase()
    const posts = document.querySelectorAll('.post')
    // console.log(posts[0].querySelector('.title').innerText);
    posts.forEach(post=>{
        const title = post.querySelector('.title').innerText.toLowerCase()
        const body = post.querySelector('.body').innerText.toLowerCase()

        if(title.includes(compareTarget)){
            post.style.display = 'flex'
        }else{
            post.style.display = 'none'
        }
    })
    
})
