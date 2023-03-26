let play_btn = document.querySelector(".play");
let prev_btn = document.querySelector(".previous");
let next_btn = document.querySelector(".next");

let curr_time = document.querySelector(".currenttime");
let total_duration = document.querySelector(".totalduration");

let seek_slider = document.querySelector(".player_slider input");
let volume_slider = document.querySelector(".volume_slider input");

let song_name = document.querySelector(".songname");
let song_cover = document.querySelector(".songcover");
let song_artist = document.querySelector(".artistname");

let track_index = 0;
let isPlaying = false;
let timer;

let current_track = document.createElement('audio');

let track_list = [
    {
        name: 'Syntact',
        artist: 'Ego',
        cover: './images/track1.jpg',
        link: './tracks/Syntact - Ego [NCS Release].mp3',
    },
    {
        name: 'I Hear Sleigh Bells',
        artist: 'Severin & Like Lions',
        cover: './images/track2.jpg',
        link: './tracks/Severin & Like Lions - I Hear Sleigh Bells [NCS Release].mp3',
    },
    {
        name: 'Not Giving In',
        artist: 'Culture Code',
        cover: './images/track3.jpg',
        link: './tracks/Culture Code - Not Giving In [NCS Release].mp3',
    },
    {
        name: 'Illusion (ft. Crunr)',
        artist: 'BEAUZ',
        cover: './images/track4.jpg',
        link: './tracks/BEAUZ - Illusion (feat. Crunr) [NCS Release].mp3',
    },
    {
        name: 'Voyage (ft. DNAKM)',
        artist: 'Mendum & Abandoned',
        cover: './images/track5.jpg',
        link: './tracks/Mendum & Abandoned - Voyage (Feat. DNAKM) [NCS Release].mp3',
    },
    {
        name: 'The Garden',
        artist: 'Lochlainn',
        cover: './images/track6.jpg',
        link: './tracks/Lochlainn - The Garden [NCS Release].mp3',
    },
    {
        name: 'Heaven Knows',
        artist: 'Vizzen & Protolizard',
        cover: './images/track7.jpg',
        link: './tracks/Vizzen & Protolizard - Heaven Knows [NCS Release].mp3',
    },   
];

function loadTrack(track_index){

    clearInterval(timer);
    resetValue();

    current_track.src = track_list[track_index].link;
    current_track.load();

    song_cover.setAttribute("src", track_list[track_index].cover);
    song_name.innerHTML = track_list[track_index].name;
    song_artist.innerHTML = track_list[track_index].artist;

    timer = setInterval(seekUpdate, 1000);

    setbg(track_index);

    current_track.addEventListener("ended", nextTrack);

}

function resetValue(){
    curr_time.innerHTML = "00:00";
    total_duration.innerHTML = "00:00";
    seek_slider.value = 0;
}

function setbg(track_index){
    let bg;
    switch (track_index) {
        case 0:
            bg = "./images/bg1.gif"
            break;
        case 1:
            bg = "./images/bg2.gif"
            break;
        case 2:
            bg = "./images/bg3.gif"
            break;
        case 3:
            bg = "./images/bg4.gif"
            break;
        case 4:
            bg = "./images/bg5.gif"
            break;
        case 5:
            bg = "./images/bg6.gif"
            break;
        case 6:
            bg = "./images/bg7.gif"
            break;
        default:
    }
    document.body.style.backgroundImage = "url(" + bg + ")";
}

function playAndpause(){
    if(!isPlaying){
        playTrack();
    }
    else{
        pauseTrack();
    }
}

function playTrack(){
    current_track.play();
    isPlaying = true;
    play_btn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    document.title = track_list[track_index].name + " - " + track_list[track_index].artist;
}

function pauseTrack(){
    isPlaying = false;
    current_track.pause();
    play_btn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    
}

function previousTrack(){
    if(track_index > 0){
        track_index -= 1;
    }
    else{
        track_index = track_list.length-1;
    }
    loadTrack(track_index);
    playTrack();
}

function nextTrack(){
    if(track_index == track_list.length-1){
        track_index = 0;
    }
    else{
        track_index += 1; 
    }
    loadTrack(track_index);
    playTrack();
}

function directPlay(list_number){
    track_index = list_number;
    loadTrack(track_index);
    playTrack();
}

function setVolume(){
    current_track.volume = volume_slider.value / 100;
}

function seekUpdate(){

    let seekPosition = 0;
    seekPosition = current_track.currentTime * (100 / current_track.duration);
    seek_slider.value = seekPosition;
    let currentMinutes = Math.floor(current_track.currentTime / 60);
        let currentSeconds = Math.floor(current_track.currentTime - currentMinutes * 60);
        let totalMinutes = Math.floor(current_track.duration / 60);
        let totalSeconds = Math.floor(current_track.duration - totalMinutes * 60);

        if(currentSeconds<10){
            currentSeconds = "0" + currentSeconds;
        }
        if(totalSeconds<10){
            totalSeconds = "0" + totalSeconds;
        }
        curr_time.innerHTML = "0" + currentMinutes +":" + currentSeconds
        total_duration.innerHTML = "0" + totalMinutes + ":" + totalSeconds
}

function seekTo(){
    let seekValue = current_track.duration * (seek_slider.value / 100);
    current_track.currentTime = seekValue; 
}

loadTrack(track_index);

