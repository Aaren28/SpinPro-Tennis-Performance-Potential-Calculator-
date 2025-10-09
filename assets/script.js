let timerInterval;
let totalSeconds;
let isRunning = false;

function startTimer(duration) {
  if (isRunning) return;
  isRunning = true;
  totalSeconds = duration;
  const timerDisplay = document.getElementById("timer-display");

  timerInterval = setInterval(() => {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    timerDisplay.textContent = `${minutes}:${seconds}`;

    if (--totalSeconds < 0) {
      clearInterval(timerInterval);
      timerDisplay.textContent = "TIME'S UP!";
      isRunning = false;
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false;
}

function resetTimer(initialTime) {
  clearInterval(timerInterval);
  isRunning = false;
  const timerDisplay = document.getElementById("timer-display");
  timerDisplay.textContent = initialTime;
}

document.addEventListener("DOMContentLoaded", () => {
  const timerDisplay = document.getElementById("timer-display");
  if (!timerDisplay) return;

  let initialTime = timerDisplay.textContent.trim();
  let seconds = initialTime.includes(":")
    ? parseInt(initialTime.split(":")[0]) * 60 + parseInt(initialTime.split(":")[1])
    : 0;

  document.getElementById("start-timer")?.addEventListener("click", () => startTimer(seconds));
  document.getElementById("pause-timer")?.addEventListener("click", pauseTimer);
  document.getElementById("reset-timer")?.addEventListener("click", () => resetTimer(initialTime));
});
