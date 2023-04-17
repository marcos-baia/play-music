// REFERENCES
const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');

// VARIABLES
const Alive = {
  songName : 'Alive (It Feels Like)',
  artist : 'Alok',
  file : 'Alive (It Feels Like)'
};
const BigJetPlane = {
  songName : 'Big Jet Plane',
  artist : 'Alok & Mathieu Koss',
  file : 'Big Jet Plane'
};
const Favela = {
  songName : 'Favela',
  artist : 'Alok & Ina Wroldsen',
  file : 'Favela'
};
let isPlaying = false;
const playlist = [Alive, BigJetPlane, Favela];
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

function initializeSong(){
  cover.src = `images/${playlist[index].file}.jpg`;
  song.src = `songs/${playlist[index].file}.mp3`;
  songName.innerText = playlist[index].songName;
  bandName.innerText = playlist[index].artist;
}

function previousSong(){
  if(index === 0){
    index = playlist.length - 1;
  }else{
    index -= 1
  }
  initializeSong();
  playSong();
}

function nextSong(){
  if(index === playlist.length - 1){
    index = 0;
  }else{
    index += 1
  }
  initializeSong();
  playSong();
}

function updateProgressBar(){
  const barWidth = (song.currentTime/song.duration)*100;
  currentProgress.style.setProperty('--progress', `${barWidth}%`);
}

function jumpTo(event){
  const width = progressContainer.clientWidth;
  const clickPosition = event.offsetX;
  const jumpToTime = (clickPosition/width)* song.duration;
  song.currentTime = jumpToTime;
}

//EXECUTIONS OF FUNCTIONS
initializeSong();

// ADD EVENT
play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', jumpTo);
