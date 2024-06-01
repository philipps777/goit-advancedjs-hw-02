const startBtn = document.querySelector('.js-start');
const stopBtn = document.querySelector('.js-stop');
let timerId = null;
let currentColor = null;

stopBtn.setAttribute('disabled', 'disabled');

startBtn.addEventListener('click', () => {
  startBtn.setAttribute('disabled', 'disabled');
  stopBtn.removeAttribute('disabled');
  timerId = setInterval(() => {
    currentColor = getRandomHexColor();
    document.body.style.backgroundColor = currentColor;
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  stopBtn.setAttribute('disabled', 'disabled');
  startBtn.removeAttribute('disabled');
  clearInterval(timerId);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
