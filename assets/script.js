let timerInterval;
let timeElapsed = 0;
let timerRunning = false;

function updateTimerDisplay(elementId, seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  document.getElementById(elementId).textContent =
    `${min}:${sec.toString().padStart(2, "0")}`;
}

// ===== Beep Test =====
function saveBeepTest() {
  const beepInput = document.getElementById("beep-test");
  const error = document.getElementById("beep-error");
  const value = parseFloat(beepInput.value);

  if (!value) {
    error.textContent = "⚠️ Please enter your beep test level before continuing.";
    return;
  }
  error.textContent = "";
  localStorage.setItem("beepTest", JSON.stringify({ beep: value }));
  window.location.href = "cooper-test.html";
}

// ===== Cooper Test =====
function startCooper() {
  if (timerRunning) return; // Prevent multiple intervals
  timerRunning = true;
  timerInterval = setInterval(() => {
    timeElapsed++;
    updateTimerDisplay("cooper-timer-display", timeElapsed);
  }, 1000);
}

function pauseCooper() {
  clearInterval(timerInterval);
  timerRunning = false;
}

function resetCooper() {
  clearInterval(timerInterval);
  timerRunning = false;
  timeElapsed = 0;
  updateTimerDisplay("cooper-timer-display", timeElapsed);
}

function saveCooperTest() {
  const input = document.getElementById("cooper-distance");
  const error = document.getElementById("cooper-error");
  const value = parseFloat(input.value);

  if (!value || value <= 0) {
    error.textContent = "⚠️ Please enter the distance you covered.";
    return;
  }
  error.textContent = "";
  localStorage.setItem("cooperTest", JSON.stringify({ cooper: value }));
  window.location.href = "sprint-test.html";
}

// ===== Sprint Test =====
function saveSprintTest() {
  const input = document.getElementById("sprint-test");
  const error = document.getElementById("sprint-error");
  const value = parseFloat(input.value);

  if (!value || value <= 0) {
    error.textContent = "⚠️ Please enter your sprint time.";
    return;
  }
  error.textContent = "";
  localStorage.setItem("sprintTest", JSON.stringify({ sprint: value }));
  window.location.href = "pushups.html";
}

// ===== Pushups =====
function savePushups() {
  const input = document.getElementById("pushups");
  const error = document.getElementById("pushup-error");
  const value = parseFloat(input.value);

  if (!value || value <= 0) {
    error.textContent = "⚠️ Please enter how many push-ups you can do.";
    return;
  }
  error.textContent = "";
  localStorage.setItem("pushups", JSON.stringify({ pushups: value }));
  window.location.href = "plank.html";
}

// ===== Plank =====
function startPlank() {
  if (timerRunning) return;
  timerRunning = true;
  timerInterval = setInterval(() => {
    timeElapsed++;
    updateTimerDisplay("plank-timer-display", timeElapsed);
  }, 1000);
}

function pausePlank() {
  clearInterval(timerInterval);
  timerRunning = false;
}

function resetPlank() {
  clearInterval(timerInterval);
  timerRunning = false;
  timeElapsed = 0;
  updateTimerDisplay("plank-timer-display", timeElapsed);
}

function savePlank() {
  const input = document.getElementById("plank");
  const error = document.getElementById("plank-error");
  const value = parseFloat(input.value);

  if (!value || value <= 0) {
    error.textContent = "⚠️ Please enter your plank time.";
    return;
  }
  error.textContent = "";
  localStorage.setItem("plank", JSON.stringify({ plank: value }));
  window.location.href = "resting-heart.html";
}

// ===== Resting Heart =====
function saveHeart() {
  const input = document.getElementById("resting-heart");
  const error = document.getElementById("heart-error");
  const value = parseFloat(input.value);

  if (!value || value <= 0) {
    error.textContent = "⚠️ Please enter your resting heart rate.";
    return;
  }
  error.textContent = "";
  localStorage.setItem("heart", JSON.stringify({ resting: value }));
  window.location.href = "vertical-jump.html";
}

// ===== Vertical Jump =====
function saveJump() {
  const input = document.getElementById("vertical-jump");
  const error = document.getElementById("jump-error");
  const value = parseFloat(input.value);

  if (!value || value <= 0) {
    error.textContent = "⚠️ Please enter your jump height.";
    return;
  }
  error.textContent = "";
  localStorage.setItem("jump", JSON.stringify({ jump: value }));
  window.location.href = "tennis-stats.html";
}

// ===== Tennis Stats =====
function saveTennisStats() {
  const inputs = {
    serve: +document.getElementById("serve-speed").value,
    firstServe: +document.getElementById("first-serve").value,
    errors: +document.getElementById("unforced-errors").value,
    win: +document.getElementById("win-percentage").value,
    years: +document.getElementById("years-experience").value,
  };

  const error = document.getElementById("tennis-error");

  // Check if all are filled
  if (Object.values(inputs).some(v => !v || v < 0)) {
    error.textContent = "⚠️ Please fill in all tennis stats before continuing.";
    return;
  }

  error.textContent = "";
  localStorage.setItem("tennisStats", JSON.stringify(inputs));
  window.location.href = "summary.html";
}

// ===== Summary =====
window.onload = function () {
  if (window.location.pathname.endsWith("summary.html")) {
    const beep = JSON.parse(localStorage.getItem("beepTest"))?.beep || 0;
    const cooper = JSON.parse(localStorage.getItem("cooperTest"))?.cooper || 0;
    const sprint = JSON.parse(localStorage.getItem("sprintTest"))?.sprint || 0;
    const pushups = JSON.parse(localStorage.getItem("pushups"))?.pushups || 0;
    const plank = JSON.parse(localStorage.getItem("plank"))?.plank || 0;
    const resting = JSON.parse(localStorage.getItem("heart"))?.resting || 0;
    const jump = JSON.parse(localStorage.getItem("jump"))?.jump || 0;
    const t = JSON.parse(localStorage.getItem("tennisStats")) || {};

    // Physical score
    let endurance = ((beep / 15) * 20 + (cooper / 3500) * 20);
    let strength = ((pushups / 60) * 15 + (plank / 240) * 15 + (jump / 70) * 15);
    let speed = ((4 - sprint) / 4) * 15;
    let heartBonus = (70 - resting) / 70 * 10;
    let physicalScore = Math.max(0, Math.min(endurance + strength + speed + heartBonus, 100));

    // Tennis score
    let tennisScore = (
      (t.serve / 200) * 25 +
      (t.firstServe / 100) * 15 +
      ((30 - t.errors) / 30) * 15 +
      (t.win / 100) * 25 +
      (t.years / 10) * 20
    );
    tennisScore = Math.max(0, Math.min(tennisScore, 100));

    const proPotential = (physicalScore * 0.45 + tennisScore * 0.55).toFixed(1);

    let feedback;
    if (proPotential >= 85) feedback = "🏆 Excellent! You have pro-level potential. Keep refining match strategy and endurance.";
    else if (proPotential >= 70) feedback = "🔥 Strong base! Improve your agility and consistency for top performance.";
    else if (proPotential >= 50) feedback = "💪 You're doing well! Work on strength and serve accuracy.";
    else feedback = "🎾 Keep going! Focus on building endurance and basic consistency.";

    document.getElementById("results").innerHTML = `
      <h3>Results Overview</h3>
      <p><strong>Physical Fitness Score:</strong> ${physicalScore.toFixed(1)}/100</p>
      <p><strong>Tennis Performance Score:</strong> ${tennisScore.toFixed(1)}/100</p>
      <h3>🌟 Pro Potential: ${proPotential}%</h3>
      <p>${feedback}</p>
    `;
  }
};
