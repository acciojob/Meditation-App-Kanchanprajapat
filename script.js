//your JS code here. If required.
const video = document.getElementById('video');
const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('play-pause');
const timeDisplay = document.getElementById('time-display');
let isPlaying = false;
let timer;

const sounds = {
    beach: {
        videoSrc: 'videos/beach.mp4',
        audioSrc: 'sounds/beach.mp3'
    },
    rain: {
        videoSrc: 'videos/rain.mp4',
        audioSrc: 'sounds/rain.mp3'
    }
};

function switchSound(type) {
    const sound = sounds[type];
    video.src = sound.videoSrc;
    audio.src = sound.audioSrc;
    video.load();
    audio.load();
    if (isPlaying) {
        video.play();
        audio.play();
    }
}

document.getElementById('smaller-mins').addEventListener('click', () => setTime(2));
document.getElementById('medium-mins').addEventListener('click', () => setTime(5));
document.getElementById('long-mins').addEventListener('click', () => setTime(10));

function setTime(minutes) {
    clearInterval(timer);
    timeDisplay.textContent = `${minutes}:00`;
}

playPauseButton.addEventListener('click', () => {
    if (isPlaying) {
        video.pause();
        audio.pause();
        clearInterval(timer);
        playPauseButton.textContent = 'Play';
    } else {
        video.play();
        audio.play();
        startTimer();
        playPauseButton.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
});

function startTimer() {
    let [minutes, seconds] = timeDisplay.textContent.split(':').map(Number);
    timer = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(timer);
                video.pause();
                audio.pause();
                isPlaying = false;
                playPauseButton.textContent = 'Play';
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }, 1000);
}

// Initial load
switchSound('beach');
