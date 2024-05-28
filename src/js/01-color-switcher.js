const startBtn = document.querySelector('.js-start');
const stopBtn = document.querySelector('.js-stop');
let timerId = null;
let currentColor = null;

startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    currentColor = getRandomHexColor();
    document.body.style.backgroundColor = currentColor;
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  //   timerId = null;
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
