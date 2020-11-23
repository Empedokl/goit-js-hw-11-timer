import './styles.css';
const ref = {
    days: document.querySelector('span[data-value="days"]'),
    hours: document.querySelector('span[data-value="hours"]'),
    mins: document.querySelector('span[data-value="mins"]'),
    secs: document.querySelector('span[data-value="secs"]'),
    input: document.querySelector(".input"),
    btnStart: document.querySelector('button[data-action="start"]'),
    btnStop: document.querySelector('button[data-action="stop"]'),
  };
  
  const timer = {
    intervalid: null,
    isActive: false,
  
    start() {
      if (this.isActive || !ref.input.value) {
        return;
      }
      const targetDate = Date.parse(ref.input.valueAsDate.toString());
      const isDateCorrect =
        Date.parse(ref.input.valueAsDate.toString()) > Date.now();
  
      if (!isDateCorrect) {
        return alert("Date must be longer than the current date");
      }
  
      this.isActive = true;
  
      this.intervalid = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = targetDate - currentTime;
  
        ref.secs.textContent = pad(Math.floor((deltaTime % (1000 * 60)) / 1000));
        ref.mins.textContent = pad(
          Math.floor((deltaTime % (1000 * 60 * 60)) / (1000 * 60))
        );
        ref.hours.textContent = pad(
          Math.floor((deltaTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        );
        ref.days.textContent = Math.floor(deltaTime / (1000 * 60 * 60 * 24));
      }, 1000);
    },
  
    stop() {
      clearInterval(this.intervalid);
      ref.input.value = "";
      this.isActive = false;
      ref.secs.textContent = "00";
      ref.mins.textContent = "00";
      ref.hours.textContent = "00";
      ref.days.textContent = "00";
    },
  };
  
  function pad(value) {
    return String(value).padStart(2, "0");
  }
  
  ref.btnStart.addEventListener("click", timer.start.bind(timer));
  ref.btnStop.addEventListener("click", timer.stop.bind(timer));