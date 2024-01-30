let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : 'images/apna-bana-le.jpg',
        name : 'Apna Bana Le',
        artist : 'Arijit Singh, Sachin-Jigar',
        music : 'music/apna-bana-le.mp3'
    },
    {
        img : 'images/subhanallah.jpg',
        name : 'Subhanallah',
        artist : 'Sreeram, Shilpa Rao',
        music : 'music/subhanallah.mp3'
    },
    {
        img : 'images/tum-mile.jpg',
        name : 'Tum Mile',
        artist : 'Javed Ali , Pritam',
        music : 'music/tum-mile.mp3'
    },
    {
        img : 'images/maan-meri-jaan.jpg',
        name : 'Maan Meri Jaan',
        artist : 'King',
        music : 'music/maan-meri-jaan.mp3'
    },
    {
        img : 'images/agar-tum-saath-ho.jpg',
        name : 'Agar Tum Saath Ho',
        artist : 'Alka Yagnik, Arijit Singh',
        music : 'music/agar-tum-saath-ho.mp3'
    },
    {
        img : 'images/pehle-bhi-main.jpg',
        name : 'Pehle Bhi Main',
        artist : 'Vishal Mishra',
        music : 'music/pehle-bhi-main.mp3'
    },
    {
        img : 'images/tum-hi-ho-bandhu.jpg',
        name : 'Tum Hi Ho Bandhu',
        artist : 'Neeraj Shridhar, Kavita Seth',
        music : 'music/tum-hi-ho-bandhu.mp3'
    },
    {
        img : 'images/mera-mann-kehne-laga.jpg',
        name : 'Mera Mann Kehne Laga',
        artist : 'Falak Shabir',
        music : 'music/mera-mann-kehne-laga.mp3'
    },
    {
        img : 'images/softly.jpg',
        name : 'Softly',
        artist : 'Karan Aujla',
        music : 'music/softly.mp3'
    },
    {
        img : 'images/husn.jpg',
        name : 'Husn',
        artist : 'Anuv Jain',
        music : 'music/husn.mp3'
    },
    {
        img : 'images/nasamajh.jpg',
        name : 'Nasamajh',
        artist : 'Aditya Rikhari',
        music : 'music/nasamajh.mp3'
    },
    {
        img : 'images/chaleya.jpg',
        name : 'Chaleya',
        artist : 'Arijit Singh, Shilpa Rao',
        music : 'music/chaleya.mp3'
    },
    {
        img : 'images/heeriye.jpg',
        name : 'Heeriye',
        artist : 'Jasleen Royal, Arijit Singh',
        music : 'music/heeriye.mp3'
    },
    {
        img : 'images/samjho-na.jpg',
        name : 'Samjho Na',
        artist : 'Aditya Rikhari',
        music : 'music/samjho-na.mp3'
    },
    {
        img : 'images/ude-dil-befikre.jpg',
        name : 'Ude Dil Befikre',
        artist : 'Benny Dayal',
        music : 'music/ude-dil-befikre.mp3'
    },
    {
        img : 'images/jaane-kyun.jpg',
        name : 'Jaane Kyun',
        artist : 'Vishal-Shekhar, Vishal Dadlani',
        music : 'music/jaane-kyun.mp3'
    },
    {
        img : 'images/kabira.jpg',
        name : 'Kabira',
        artist : 'Tochi Raina, Rekha Bhardwaj',
        music : 'music/kabira.mp3'
    },
    {
        img : 'images/mileya-mileya.jpg',
        name : 'Mileya Mileya',
        artist : 'Rekha Bhardwaj',
        music : 'music/mileya-mileya.mp3'
    },
    {
        img : 'images/kun-faaya-kun.jpg',
        name : 'Kun Faaya Kun',
        artist : 'A.R. Rahman',
        music : 'music/kun-faaya-kun.mp3'
    }
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
    randomIcon.classList.add('blue');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
    randomIcon.classList.remove('blue');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}