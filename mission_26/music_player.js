// DOM Element
const musicContainer = document.querySelector('.music-container')
const musicName = document.querySelector('.music-name')

const audio = document.querySelector('audio')
const img = document.querySelector('.img-container img')

const prevBtn = document.querySelector('#prev')
const playBtn = document.querySelector('#play')
const nextBtn = document.querySelector('#next')

const progressArea = document.querySelector('.progress-area')
const progress = document.querySelector('.progress')

// song list
const songs = ['Lost_in_paradise','Desperado','Wild_side','山雀','Yuve_Yuve_Yu']
let songIndex = 1

loadingSong(songs[songIndex])

function loadingSong (song) {
    musicName.innerText = song.replaceAll('_',' ')
    audio.src = `music/${song}.mp3`
    img.src = `img/${song}.png`
}


// for playing
const playingMode = () =>{
    audio.play()
    musicContainer.classList.add('play')
    playBtn.querySelector('i').classList.remove('fa-play')
    playBtn.querySelector('i').classList.add('fa-pause')
}
const pauseMode = () =>{
    audio.pause()
    musicContainer.classList.remove('play')
    playBtn.querySelector('i').classList.remove('fa-pause')
    playBtn.querySelector('i').classList.add('fa-play')
}

function musicPlay() {
    const isPlaying = musicContainer.classList.contains('play')
    isPlaying ? pauseMode() :  playingMode()
}

playBtn.addEventListener('click',musicPlay)


function musicPrev() {
    songIndex > 0 ? songIndex-- : songIndex
    loadingSong(songs[songIndex])
    playingMode()
}
function musicNext() {
    songIndex < songs.length -1  ? songIndex++ : songIndex
    loadingSong(songs[songIndex])
    playingMode()
}

prevBtn.addEventListener('click',musicPrev) 
nextBtn.addEventListener('click',musicNext)

// for progress

function updateProgress(e) {
    // console.log(e);
    // console.log(e.srcElement);
    // 待研究
    const {duration,currentTime} = e.srcElement
    // console.log({duration,currentTime});
    const progressPercent = (currentTime / duration) * 100
    // console.log(progressPercent);
    progress.style.width = `${progressPercent}%`
}

audio.addEventListener('timeupdate',updateProgress)

function setProgress(e) {
    // div的長度
    const width = this.clientWidth
    console.log(width);
    // 點擊位置的長度
    const x = e.offsetX
    console.log(x);
    // 音樂長度
    const duration =  audio.duration
    console.log(duration);

    audio.currentTime = ( x / width ) * duration
}

progressArea.addEventListener('click',setProgress)

// music end
audio.addEventListener('ended',musicNext)

