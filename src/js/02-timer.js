// Описан в документации
import Notiflix from 'notiflix';

import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const date = new Date();
const refs = {
    timepicker: document.querySelector("#datetime-picker"),
    startBtn: document.querySelector("[data-start]"),
    days:document.querySelector("[data-days]"),
    hours:document.querySelector("[data-hours]"),
    minutes:document.querySelector("[data-minutes]"),
    seconds:document.querySelector("[data-seconds]"),
}

let startTime=0
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (selectedDates[0] < date) {
        refs.startBtn.disabled=true
        Notiflix.Notify.warning("Please choose a date in the future")
      }
      else {
          startTime = selectedDates[0]
          console.log(startTime)
          refs.startBtn.disabled = false
          Notiflix.Notify.success('Date has been chosen');
      }
  },
};

flatpickr(refs.timepicker, options)



class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;

    this.init();
  }

  init() {
    const time = this.convertMs(0);
    this.onTick(time);
  }

  start() {
    if (this.isActive) {
      return;
    }

    
    this.isActive = true;

    this.intervalId = setInterval(() => {
        const currentTime = Date.now();
      const deltaTime =startTime-currentTime;
      const time = this.convertMs(deltaTime);
      this.onTick(time);
    }, 1000);
  }

 convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = this.addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

  /*
   * Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х знаков
   */
  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new Timer({
  onTick: updateClockface,
});

refs.startBtn.addEventListener('click', timer.start.bind(timer));

/*
 * - Принимает время в миллисекундах
 * - Высчитывает сколько в них вмещается часов/минут/секунд
 * - Рисует интерфейс
 */
function updateClockface({ days,hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}
