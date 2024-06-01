// Описаний в документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

iziToast.info({
  title: 'Hello!💜💜💜',

  message:
    'Please, choose First delay, Delay step, Amount and click on Create promises 🔻',
  position: 'topCenter',
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const initialDelay = parseInt(form.elements.delay.value);
  const step = parseInt(form.elements.step.value);
  const amount = parseInt(form.elements.amount.value);

  let currentDelay = initialDelay;

  for (let i = 1; i <= amount; i++) {
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        iziToast.success({
          title: `✔️ Fulfilled promise ${position} in ${delay}ms`,
          position: 'topRight',
        });
      })
      .catch(({ position, delay }) => {
        iziToast.error({
          title: `✖️ Rejected promise ${position} in ${delay}ms`,

          position: 'topRight',
        });
      });

    currentDelay += step;
  }
  form.reset();
  setTimeout(() => {
    iziToast.info({
      title: 'Choice new Promise',
      position: 'topCenter',
    });
  }, currentDelay);
});
