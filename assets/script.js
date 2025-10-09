let timer;
let timeLeft = 15 * 60;
let running = false;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

if (startBtn) {
  startBtn.addEventListener("click", () => {
    if (!running) {
      running = true;
      timer = setInterval(() => {
        if (timeLeft > 0) {
          timeLeft--;
          updateTimerDisplay();
        } else {
          clearInterval(timer);
          alert("Time’s up!");
        }
      }, 1000);
    }
  });
}

if (pauseBtn) {
  pauseBtn.addEventListener("click", () => {
    running = false;
    clearInterval(timer);
  });
}

if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    running = false;
    clearInterval(timer);
    timeLeft = 15 * 60;
    updateTimerDisplay();
  });
}

updateTimerDisplay();

