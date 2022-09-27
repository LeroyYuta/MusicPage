//player
const playerContainer = document.querySelector('.player-container');
const playBtn = document.querySelector('.play');
const titleAudio = document.querySelector('.player-song');
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');

const playSong = () => {
    playerContainer.classList.add('play');
    playBtn.querySelector('i.fa').classList.remove('fa-play');
    playBtn.querySelector('i.fa').classList.add('fa-pause');

    titleAudio.play();
}

const pauseSong = () => {
    playerContainer.classList.remove('play');
    playBtn.querySelector('i.fa').classList.add('fa-play');
    playBtn.querySelector('i.fa').classList.remove('fa-pause');

    titleAudio.pause();
}

const updateProgress = e => {
    const {
        duration,
        currentTime
    } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = titleAudio.duration;

    titleAudio.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener('click', () => {
    const isPlaying = playerContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong()
    }
});

titleAudio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

titleAudio.addEventListener('ended', pauseSong);

//get duration & currentTime for Time of song
const durTime = document.querySelector('.dur-time');
const currTime = document.querySelector('.curr-time');

function DurTime(e) {
    const {duration, currentTime} = e.srcElement;
    let secCurr;
    let secDur;

    //minutes currentTime
    let minCurr = (currentTime == null) ? 0 : Math.floor(currentTime / 60);
    minCurr = minCurr < 10 ? '0' + minCurr : minCurr;

    //seconds currentTime
    function getSecCurr(x) {
        if (Math.floor(x) >= 60) {

            for (let i = 1; i <= 60; i++) {
                if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
                    secCurr = Math.floor(x) - (60 * i);
                    secCurr = secCurr < 10 ? '0' + secCurr : secCurr;
                }
            }
        } else {
            secCurr = Math.floor(x);
            secCurr = secCurr < 10 ? '0' + secCurr : secCurr;
        }
    }

    getSecCurr(currentTime, secCurr);

    currTime.innerHTML = minCurr + ':' + secCurr;

    //minutes duration
    let minDur = (isNaN(duration) === true) ? '0' : Math.floor(duration / 60);
    minDur = minDur < 10 ? '0' + minDur : minDur;

    //seconds duration
    function getSecDur(x) {
        if (Math.floor(x) >= 60) {

            for (let i = 1; i <= 60; i++) {
                if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
                    secDur = Math.floor(x) - (60 * i);
                    secDur = secDur < 10 ? '0' + secDur : secDur;
                }
            }
        } else {
            secDur = (isNaN(duration) === true) ? '0' :
                Math.floor(x);
            secDur = secDur < 10 ? '0' + secDur : secDur;
        }
    }

    getSecDur(duration);

    durTime.innerHTML = minDur + ':' + secDur;
};

titleAudio.addEventListener('timeupdate', DurTime);
//player

//synth&launchpad
const notes = document.querySelectorAll('.note');
const pianoContainer = document.querySelector('.container');
const btnShow = document.querySelector('.show-synth');

btnShow.addEventListener('click', () => {
    const isShow = pianoContainer.classList.contains('display');
    if (isShow) {
        pianoContainer.classList.remove('display');
        btnShow.innerHTML = 'HIDE SYNTH';
    } else {
        pianoContainer.classList.add('display');
        btnShow.innerHTML = 'SHOW SYNTH';
    }
})

const playNoteOnKeyboard = e => {
    const audio = document.querySelector(`audio[data-key='${e.keyCode}']`);
    const note = document.querySelector(`.note[data-key='${e.keyCode}']`);
    if (!note) return;

    const isShow = pianoContainer.classList.contains('display');
    if (!isShow) {
        note.classList.add('active-note');
        audio.currentTime = 0;
        audio.play();
    }
}

const playNoteOnMouse = e => {
    const dataKey = e.target.getAttribute('data-key');
    const note = document.querySelector(`.note[data-key='${dataKey}']`);
    const audio = document.querySelector(`audio[data-key='${dataKey}']`);
    if (!note) return;
    note.classList.add('active-note');
    audio.currentTime = 0;
    audio.play();
}

const removeActiveNote = e => {
    e.target.classList.remove("active-note");
}

notes.forEach(note => note.addEventListener("transitionend", removeActiveNote));

window.addEventListener('keydown', playNoteOnKeyboard);
window.addEventListener('click', playNoteOnMouse);
//synth&launchpad