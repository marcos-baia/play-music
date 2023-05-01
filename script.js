// REFERENCES
const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const likeButton = document.getElementById('like');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');

// VARIABLES
const Alive = {songName: 'Alive (It Feels Like)', artist: 'Alok', file: 'Alive (It Feels Like)', liked: false,};
const BigJetPlane = {songName: 'Big Jet Plane', artist: 'Alok & Mathieu Koss', file: 'Big Jet Plane', liked: false,};
const Favela = {songName: 'Favela', artist: 'Alok & Ina Wroldsen', file: 'Favela', liked: false,};
const FeelTheLove = {songName: 'Feel The Love', artist: 'Rudimental feat. John Newman', file: 'Feel The Love', liked: false,};
const Friendships = {songName: 'Friendships', artist: 'Rudimental feat. John Newman', file: 'Friendships', liked: false,};
const Fuego = {songName: 'Fuego', artist: 'Alok & Bhaskar', file: 'Fuego', liked: false,};
const GetLucky = {songName: 'Get Lucky', artist: 'Daft Punk', file: 'Get Lucky', liked: false,};
const HearMeNowlive = {songName: 'Hear Me Now', artist: 'Bruno Martini feat Zeeba', file: 'Hear Me Now', liked: false,};
const InMyMindRemix = {songName: 'In My Mind (Remix)', artist: 'Joel Corry Remix', file: 'In My Mind (Joel Corry Remix)', liked: false,};
const InMyMind = {songName: 'In My Mind', artist: 'Alok & John Legend', file: 'In My Mind', liked: false,};
const LoseControl = {songName: 'Lose Control', artist: 'Meduza, Becky Hill, Goodboys', file: 'Lose Control', liked: false,};
const MeYou = {songName: 'Me & You', artist: 'Alok feat. iRO', file: 'Me & You', liked: false,};
const NeverLetMeGo = {songName: 'Never Let Me Go', artist: 'Bruno Martini feat Zeeba', file: 'Never Let Me Go', liked: false,};
const Ocean = {songName: 'Ocean', artist: 'Alok feat. Zeeba', file: 'Ocean', liked: false,};
const OnOn = {songName: 'On & On', artist: 'Cartoon feat Daniel Levi', file: 'On & On', liked: false,};
const SixDays = {songName: 'Six Days (Remix)', artist: 'Dj Shadow', file: 'Six Days (Remix)', liked: false,};
const Sugar = {songName: 'Sugar', artist: 'Robin Schulz feat. Francesco Yates', file: 'Sugar', liked: false,};
const Titanium = {songName: 'Titanium', artist: 'David Guetta feat Sia', file: 'Titanium', liked: false,};
const Waves = {songName: 'Waves', artist: 'Robin Schulz Remix Radio Edit', file: 'Waves', liked: false,};
const Whistle = {songName: 'Whistle', artist: 'Flo Rida', file: 'Whistle', liked: false,};

// auxiliary variables
let isPlaying = false;
let isShuffled = false;
let repeatOn = false;

// array
const originalPlaylist = [Alive, BigJetPlane, Favela, FeelTheLove, Friendships, Fuego, GetLucky, HearMeNowlive, InMyMindRemix, InMyMind, LoseControl, MeYou, NeverLetMeGo, Ocean, OnOn, SixDays, Sugar, Titanium, Waves, Whistle];

let sortedPlaylist = [...originalPlaylist];
let index = 0;

// FUNCTIONS
function playSong(){
  play.querySelector('.bi').classList.remove('bi-play-circle-fill');
  play.querySelector('.bi').classList.add('bi-pause-circle-fill');
  song.play();
  isPlaying = true;
}

function pauseSong(){
  play.querySelector('.bi').classList.add('bi-play-circle-fill');
  play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
  song.pause();
  isPlaying = false;
}

function playPauseDecider(){
  if(isPlaying === true){
    pauseSong();
  }else {
    playSong();
  }
}

function likeButtonRender(){
  if(sortedPlaylist[index].liked === true){
    likeButton.querySelector('.bi').classList.remove('bi-heart');
    likeButton.querySelector('.bi').classList.add('bi-heart-fill');
    likeButton.classList.add('button-active');
  } else {
    likeButton.querySelector('.bi').classList.add('bi-heart');
    likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
    likeButton.classList.remove('button-active');
  }
}

function initializeSong(){
  cover.src = `images/${sortedPlaylist[index].file}.jpg`;
  song.src = `songs/${sortedPlaylist[index].file}.mp3`;
  songName.innerText = sortedPlaylist[index].songName;
  bandName.innerText = sortedPlaylist[index].artist;
  likeButtonRender();
}

function previousSong(){
  if(index === 0){
    index = sortedPlaylist.length - 1;
  }else{
    index -= 1
  }
  initializeSong();
  playSong();
}

function nextSong(){
  if(index === sortedPlaylist.length - 1){
    index = 0;
  }else{
    index += 1
  }
  initializeSong();
  playSong();
}

function updateProgress(){
  const barWidth = (song.currentTime/song.duration)*100;
  currentProgress.style.setProperty('--progress', `${barWidth}%`);
  songTime.innerText = toHHMMSS(song.currentTime);
}

function jumpTo(event){
  const width = progressContainer.clientWidth;
  const clickPosition = event.offsetX;
  const jumpToTime = (clickPosition/width)* song.duration;
  song.currentTime = jumpToTime;
}

function shuffleArray(preShuffleArray){
  const size = preShuffleArray.length;
  let currentIndex = size - 1;

  while(currentIndex > 0){
    let randomIndex = Math.floor(Math.random() * size);
    let aux = preShuffleArray[currentIndex];
    preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
    preShuffleArray[randomIndex] = aux;
    currentIndex -= 1;
  }
}

function shuffleButtonClicked(){
  if(isShuffled === false){
    isShuffled = true;
    shuffleArray(sortedPlaylist);
    shuffleButton.classList.add('button-active');
  } else {
    isShuffled = false;
    sortedPlaylist = [...originalPlaylist];
    shuffleButton.classList.remove('button-active');
  }
}

function repeatButtonClicked() {
  if(repeatOn === false){
    repeatOn = true;
    repeatButton.classList.add('button-active');
  } else{
    repeatOn = false;
    repeatButton.classList.remove('button-active');
  }
}

function nextOrRepeat() {
  if(repeatOn === false){
    nextSong();
  } else {
    playSong();
  }
}

/* auxiliary function to convert to hours, minutes and seconds */
function toHHMMSS(originalNumber){
  let hours = Math.floor(originalNumber / 3600);
  let min = Math.floor((originalNumber - hours * 3600) / 60);
  let secs = Math.floor(originalNumber - hours * 3600 - min * 60);

  return `${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`; 
}

function updateTotalTime(){
  totalTime.innerHTML = toHHMMSS(song.duration);
}

function likeButtonClicked(){
  if(sortedPlaylist[index].liked === false){
    sortedPlaylist[index].liked = true;
  } else {
    sortedPlaylist[index].liked = false;
  }
  likeButtonRender();
}

//EXECUTIONS OF FUNCTIONS
initializeSong();

// ADD EVENT
play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgress);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('loadedmetadata', updateTotalTime);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked);
repeatButton.addEventListener('click', repeatButtonClicked);
likeButton.addEventListener('click', likeButtonClicked);
