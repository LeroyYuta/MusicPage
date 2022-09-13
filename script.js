const notes = document.querySelectorAll('.note');
const pianoBlock = document.querySelector('.piano-block');

const playNoteOnKeyboard = (e) => {
    const audio = document.querySelector(`audio[data-key='${e.keyCode}']`);
    const note = document.querySelector(`.note[data-key='${e.keyCode}']`);

    if (!note) return;

    note.classList.add('active');
    audio.currentTime = 0;
    audio.play();
}

const playNoteOnMouse = (e) => {
    const dataKey = e.target.getAttribute('data-key');
    const note = document.querySelector(`.note[data-key='${dataKey}']`);
    const audio = document.querySelector(`audio[data-key='${dataKey}']`);

    if (!note) return;

    note.classList.add('active');
    audio.currentTime = 0;
    audio.play();
}

const removeActive = (e) => {
    e.target.classList.remove("active");
}

notes.forEach(note => note.addEventListener("transitionend", removeActive));

window.addEventListener('keydown', playNoteOnKeyboard);
pianoBlock.addEventListener('click', playNoteOnMouse);