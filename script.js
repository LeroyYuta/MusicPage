const notes = document.querySelectorAll('.note');
const pads = document.querySelectorAll('.pad');

const playNoteOnKeyboard = (e) => {
    const audio = document.querySelector(`audio[data-key='${e.keyCode}']`);
    const note = document.querySelector(`.note[data-key='${e.keyCode}']`);
    if (!note) return;
    note.classList.add('active-note');
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

const removeActiveNote = (e) => {
    e.target.classList.remove("active-note");
}

notes.forEach(note => note.addEventListener("transitionend", removeActiveNote));

window.addEventListener('keydown', playNoteOnKeyboard);
window.addEventListener('click', playNoteOnMouse);