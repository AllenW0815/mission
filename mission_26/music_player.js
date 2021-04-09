// DOM Element
const musicContainer = document.querySelector('.music-container')
const musicName = document.querySelector('.music-name')

const audio = document.querySelector('audio')
const img = document.querySelector('.img-container img')

const prevBtn = document.querySelector('#prev')
const playBtn = document.querySelector('#play')
const nextBtn = document.querySelector('#next')
play
// song list
const songs = ['Lost_in_paradise','Desperado','Wild_side']
let songIndex = 2

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

function musicPrev () {
    pauseMode()
    songIndex > 0 ? songIndex-- : songIndex
    loadingSong(songs[songIndex])
}
function musicNext () {
    pauseMode()
    songIndex < songs.length -1  ? songIndex++ : songIndex
    loadingSong(songs[songIndex])
}


prevBtn.addEventListener('click',musicPrev)
nextBtn.addEventListener('click',musicNext)