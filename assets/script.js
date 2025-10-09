console.log('assets/script.js loaded');

document.addEventListener('DOMContentLoaded', () => {
  // ======== Timer logic (works for both beep and cooper pages) =========
  let timerInterval = null;
  let timeLeft = null;

  const display = document.getElementById('timerDisplay');
  const startBtn = document.getElementById('startTimerBtn');
  const pauseBtn = document.getElementById('pauseTimerBtn');
  const resetBtn = document.getElementById('resetTimerBtn');

  function formatTime(t) {
    const mins = Math.floor(t / 60);
    const secs = t % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function updateDisplay() {
    if (!display) return;
    display.textContent = formatTime(timeLeft);
  }

  function startTimer() {
    if (!display) return;
    if (timerInterval) return; // already running
    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timerInterval);
        timerInterval = null;
        display.textContent = "Time’s up! ⏱️";
      }
    }, 1000);
  }

  function pauseTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function resetTimer() {
    if (!display) return;
    const minutes = parseInt(display.dataset.minutes || '0', 10) || 0;
    timeLeft = minutes * 60;
    updateDisplay();
    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
  }

  // Initialize timer if on a page with #timerDisplay
  if (display) {
    const minutes = parseInt(display.dataset.minutes || '0', 10) || 0;
    timeLeft = minutes * 60;
    updateDisplay();
    if (startBtn) startBtn.addEventListener('click', startTimer);
    if (pauseBtn) pauseBtn.addEventListener('click', pauseTimer);
    if (resetBtn) resetBtn.addEventListener('click', resetTimer);
  }

  // ======== Save inputs + Next navigation =========
  const nextBtn = document.getElementById('nextBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      // find any input with data-save and store it
      const inputs = document.querySelectorAll('[data-save]');
      let allOk = true;
      inputs.forEach(inp => {
        // required fields must have value
        if (inp.required && !inp.value) allOk = false;
        // save value (empty string allowed)
        try { localStorage.setItem(inp.dataset.save, inp.value); } catch (e) { console.warn('localStorage error', e); }
      });
      if (!allOk) {
        alert('Please fill required fields before continuing.');
        return;
      }
      // navigate
      const nextPage = nextBtn.dataset.next;
      if (nextPage) window.location.href = nextPage;
    });
  }

  // ======== Summary page: fill results if present =========
  const resultsDiv = document.getElementById('results');
  if (resultsDiv) {
    const keys = [
      'beepLevel','cooperDistance','sprintTime','jumpHeight',
      'pushups','plankTime','serveSpeed','firstServePercent','errors','winPercent','yearsExperience'
    ];
    let html = '<h3>Saved Test Values</h3><ul>';
    keys.forEach(k => {
      const v = localStorage.getItem(k);
      if (v !== null && v !== '') html += `<li><strong>${k}:</strong> ${v}</li>`;
    });
    html += '</ul>';
    resultsDiv.innerHTML = html;
  }
});
