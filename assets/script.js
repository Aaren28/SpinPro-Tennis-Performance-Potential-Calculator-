let timerInterval;
let timeRemaining = 0;

function startTimer(minutes = 0) {
  if (timeRemaining === 0) timeRemaining = minutes * 60;
  timerInterval = setInterval(() => {
    timeRemaining--;
    const min = Math.floor(timeRemaining / 60);
    const sec = timeRemaining % 60;
    document.getElementById("timer-display").textContent =
      `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    if (timeRemaining <= 0) clearInterval(timerInterval);
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
}

function resetTimer(minutes = 0) {
  clearInterval(timerInterval);
  timeRemaining = minutes * 60;
  document.getElementById("timer-display").textContent =
    minutes > 0 ? `${minutes}:00` : "00:00";
}

// Save data functions
function saveBeepTest() {
  const data = { beep: +document.getElementById("beep-test").value };
  localStorage.setItem("beepTest", JSON.stringify(data));
  window.location.href = "cooper-test.html";
}

function saveCooperTest() {
  const data = { cooper: +document.getElementById("cooper-test").value };
  localStorage.setItem("cooperTest", JSON.stringify(data));
  window.location.href = "sprint-test.html";
}

function saveSprintTest() {
  const data = { sprint: +document.getElementById("sprint-test").value };
  localStorage.setItem("sprintTest", JSON.stringify(data));
  window.location.href = "pushups.html";
}

function savePushups() {
  const data = { pushups: +document.getElementById("pushups").value };
  localStorage.setItem("pushups", JSON.stringify(data));
  window.location.href = "plank.html";
}

function savePlank() {
  const data = { plank: +document.getElementById("plank").value };
  localStorage.setItem("plank", JSON.stringify(data));
  window.location.href = "resting-heart.html";
}

function saveHeart() {
  const data = { resting: +document.getElementById("resting-heart").value };
  localStorage.setItem("heart", JSON.stringify(data));
  window.location.href = "vertical-jump.html";
}

function saveJump() {
  const data = { jump: +document.getElementById("vertical-jump").value };
  localStorage.setItem("jump", JSON.stringify(data));
  window.location.href = "tennis-stats.html";
}

function saveTennisStats() {
  const data = {
    serve: +document.getElementById("serve-speed").value,
    firstServe: +document.getElementById("first-serve").value,
    errors: +document.getElementById("unforced-errors").value,
    win: +document.getElementById("win-percentage").value,
    years: +document.getElementById("years-experience").value,
  };
  localStorage.setItem("tennisStats", JSON.stringify(data));
  window.location.href = "summary.html";
}

// Calculate final results
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

    document.getElementById("results").innerHTML = `
      <h3>Results Overview</h3>
      <p><strong>Physical Fitness Score:</strong> ${physicalScore.toFixed(1)}/100</p>
      <p><strong>Tennis Performance Score:</strong> ${tennisScore.toFixed(1)}/100</p>
      <h3>🌟 Pro Potential: ${proPotential}%</h3>
    `;

    document.getElementById("ratings").innerHTML =
      proPotential >= 85 ? "🏆 Pro Level Potential" :
      proPotential >= 70 ? "🔥 Advanced Player" :
      proPotential >= 50 ? "💪 Intermediate Player" :
      "🎾 Beginner – Keep Training!";
  }
};

