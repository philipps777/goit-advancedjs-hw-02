// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний в документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

iziToast.info({
  title: 'Hello my Friend!💜💜💜',
  message: 'Please, choose a date and click on start 🔻',
  position: 'topCenter',
});

const res = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

function updateCountdownElements(res, remainingTime) {
  res.days.textContent = addLeadingZero(remainingTime.days);
  res.hours.textContent = addLeadingZero(remainingTime.hours);
  res.minutes.textContent = addLeadingZero(remainingTime.minutes);
  res.seconds.textContent = addLeadingZero(remainingTime.seconds);
}

const activeBtn = document.querySelector('[data-start]');
activeBtn.setAttribute('disabled', 'disabled');

const myInput = document.querySelector('.myInput');

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const dateTimePicker = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDate]) {
    if (selectedDate >= Date.now()) {
      activeBtn.removeAttribute('disabled');
      iziToast.success({
        title: 'Great 😎',
        message: 'Successfully inserted record!',
        position: 'topRight',
      });
    } else {
      activeBtn.setAttribute('disabled', 'disabled');
      iziToast.error({
        title: '✖️ Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    }
  },
});

activeBtn.addEventListener('click', () => {
  activeBtn.setAttribute('disabled', 'disabled');
  myInput.setAttribute('disabled', 'disabled');
  const selectedDate = dateTimePicker.selectedDates[0];

  const currentDate = Date.now();

  const timeDifference = selectedDate - currentDate;

  const timerInterval = setInterval(() => {
    if (Date.now() >= selectedDate) {
      clearInterval(timerInterval);
      myInput.removeAttribute('disabled');
      iziToast.info({
        title: 'Please, choose a date and click on start 🔻',
        position: 'topCenter',
      });
      return;
    }

    const remainingTime = convertMs(selectedDate - Date.now());

    updateCountdownElements(res, remainingTime);
  }, 1000);
});
