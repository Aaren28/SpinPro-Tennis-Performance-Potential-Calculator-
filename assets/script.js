let timer;
let timeRemaining = 0;
let running = false;

// Start timer
function startTimer(id) {
  const el = document.getElementById(id);
  const [min, sec] = el.textContent.split(":").map(Number);
  timeRemaining = min * 60 + sec;
  if (!running) {
    running = true;
    timer = setInterval(() => {
      if (timeRemaining > 0) {
        timeRemaining--;
        const m = String(Math.floor(timeRemaining / 60)).padStart(2, "0");
        const s = String(timeRemaining % 60).padStart(2, "0");
        el.textContent = `${m}:${s}`;
      } else {
        clearInterval(timer);
        alert("Time’s up!");
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  running = false;
}

function resetTimer(id, minutes) {
  clearInterval(timer);
  running = false;
  timeRemaining = minutes * 60;
  document.getElementById(id).textContent =
    String(minutes).padStart(2, "0") + ":00";
}

function nextPage(url) {
  window.location.href = url;
}
