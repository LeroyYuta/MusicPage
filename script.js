const notes = document.querySelectorAll('.note');
const pads = document.querySelectorAll('.pad');
const pianoBlock = document.querySelector('.piano-block');
const launchpad = document.querySelector('.launchpad');

const playNoteOnKeyboard = (e) => {
    const audio = document.querySelector(`audio[data-key='${e.keyCode}']`);
    const note = document.querySelector(`.note[data-key='${e.keyCode}']`);
    if (!note) return;
    note.classList.add('active-note');
    audio.currentTime = 0;
    audio.play();
}

const playPadOnKeyboard = (e) => {
    const audio = document.querySelector(`audio[data-key='${e.keyCode}']`);
    const pad = document.querySelector(`.pad[data-key='${e.keyCode}']`);
    if (!pad) return;
    pad.classList.add('active-pad');
    audio.currentTime = 0;
    audio.play();
}

const playNoteOnMouse = (e) => {
    const dataKey = e.target.getAttribute('data-key');
    const note = document.querySelector(`.note[data-key='${dataKey}']`);
    const audio = document.querySelector(`audio[data-key='${dataKey}']`);
    if (!note) return;
    note.classList.add('active-note');
    audio.currentTime = 0;
    audio.play();
}

const playPadOnMouse = (e) => {
    const dataKey = e.target.getAttribute('data-key');
    const audio = document.querySelector(`audio[data-key='${dataKey}']`);
    const pad = document.querySelector(`.pad[data-key='${dataKey}']`);
    if (!pad) return;

    pad.classList.add('active-pad');
    audio.currentTime = 0;
    audio.play();
}

const removeActiveNote = (e) => {
    e.target.classList.remove("active-note");
}
const removeActivePad = (e) => {
    e.target.classList.remove("active-pad");
}

notes.forEach(note => note.addEventListener("transitionend", removeActiveNote));
pads.forEach(pad => pad.addEventListener("transitionend", removeActivePad));

window.addEventListener('keydown', playNoteOnKeyboard);
window.addEventListener('keydown', playPadOnKeyboard);
pianoBlock.addEventListener('click', playNoteOnMouse);
launchpad.addEventListener('click', playPadOnMouse);