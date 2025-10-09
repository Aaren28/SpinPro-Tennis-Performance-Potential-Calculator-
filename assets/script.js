function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

function getValue(key) {
  return localStorage.getItem(key);
}

function showError(id, msg) {
  document.getElementById(id).textContent = msg;
}

// ---------- Beep Test ---------- //
function saveBeepTest() {
  const beepLevel = document.getElementById("beepLevel").value;
  if (!beepLevel) {
    showError("beepError", "⚠️ Please enter your beep test level.");
    return;
  }
  saveToStorage("beepLevel", beepLevel);
  window.location.href = "cooper-test.html";
}

// ---------- Cooper Test ---------- //
let cooperTimer, cooperSeconds = 12 * 60, cooperRunning = false;

function updateCooperTimer() {
  const m = Math.floor(cooperSeconds / 60);
  const s = cooperSeconds % 60;
  document.getElementById("cooperTimer").textContent =
    `${m}:${s.toString().padStart(2, "0")}`;
}

function startCooper() {
  if (cooperRunning) return;
  cooperRunning = true;
  cooperTimer = setInterval(() => {
    if (cooperSeconds > 0) {
      cooperSeconds--;
      updateCooperTimer();
    } else {
      clearInterval(cooperTimer);
      cooperRunning = false;
      alert("⏰ Cooper Test complete!");
    }
  }, 1000);
}

function pauseCooper() {
  clearInterval(cooperTimer);
  cooperRunning = false;
}

function resetCooper() {
  clearInterval(cooperTimer);
  cooperSeconds = 12 * 60;
  cooperRunning = false;
  updateCooperTimer();
}

function saveCooperTest() {
  const dist = document.getElementById("cooperDistance").value;
  if (!dist) {
    showError("cooperError", "⚠️ Please enter your distance covered.");
    return;
  }
  saveToStorage("cooperDistance", dist);
  window.location.href = "sprint-test.html";
}

// ---------- Sprint Test ---------- //
function saveSprintTest() {
  const sprintTime = document.getElementById("sprintTime").value;
  if (!sprintTime) {
    showError("sprintError", "⚠️ Please enter your sprint time.");
    return;
  }
  saveToStorage("sprintTime", sprintTime);
  window.location.href = "pushups.html";
}

// ---------- Push-Ups ---------- //
function savePushups() {
  const count = document.getElementById("pushupsCount").value;
  if (!count) {
    showError("pushupsError", "⚠️ Please enter your push-up count.");
    return;
  }
  saveToStorage("pushupsCount", count);
  window.location.href = "plank.html";
}

// ---------- Plank Timer ---------- //
let plankTimer, plankSeconds = 0, plankRunning = false;

function updatePlankTimer() {
  const m = Math.floor(plankSeconds / 60);
  const s = plankSeconds % 60;
  document.getElementById("plankTimer").textContent =
    `${m}:${s.toString().padStart(2, "0")}`;
}

function startPlank() {
  if (plankRunning) return;
  plankRunning = true;
  plankTimer = setInterval(() => {
    plankSeconds++;
    updatePlankTimer();
  }, 1000);
}

function pausePlank() {
  clearInterval(plankTimer);
  plankRunning = false;
}

function resetPlank() {
  clearInterval(plankTimer);
  plankSeconds = 0;
  plankRunning = false;
  updatePlankTimer();
}

function savePlank() {
  const time = document.getElementById("plankTime").value;
  if (!time) {
    showError("plankError", "⚠️ Please enter your plank time in seconds.");
    return;
  }
  saveToStorage("plankTime", time);
  window.location.href = "resting-heart.html";
}

// ---------- Resting Heart Rate ---------- //
function saveHeart() {
  const rate = document.getElementById("heartRate").value;
  if (!rate) {
    showError("heartError", "⚠️ Please enter your resting heart rate.");
    return;
  }
  saveToStorage("heartRate", rate);
  window.location.href = "vertical-jump.html";
}

// ---------- Vertical Jump ---------- //
function saveVertical() {
  const height = document.getElementById("jumpHeight").value;
  if (!height) {
    showError("jumpError", "⚠️ Please enter your jump height.");
    return;
  }
  saveToStorage("jumpHeight", height);
  window.location.href = "tennis-stats.html";
}

// ---------- Tennis Stats ---------- //
function saveTennis() {
  const serve = document.getElementById("serveSpeed").value;
  const servePct = document.getElementById("servePercent").value;
  const errors = document.getElementById("unforcedErrors").value;
  const winPct = document.getElementById("winPercent").value;
  const exp = document.getElementById("experience").value;

  if (!serve || !servePct || !errors || !winPct || !exp) {
    showError("tennisError", "⚠️ Please fill in all tennis stats.");
    return;
  }

  saveToStorage("serveSpeed", serve);
  saveToStorage("servePercent", servePct);
  saveToStorage("unforcedErrors", errors);
  saveToStorage("winPercent", winPct);
  saveToStorage("experience", exp);

  window.location.href = "summary.html";
}

// ---------- Summary + Feedback ---------- //
if (window.location.pathname.includes("summary.html")) {
  const beep = +getValue("beepLevel");
  const cooper = +getValue("cooperDistance");
  const sprint = +getValue("sprintTime");
  const pushups = +getValue("pushupsCount");
  const plank = +getValue("plankTime");
  const heart = +getValue("heartRate");
  const jump = +getValue("jumpHeight");

  const serve = +getValue("serveSpeed");
  const servePct = +getValue("servePercent");
  const errors = +getValue("unforcedErrors");
  const winPct = +getValue("winPercent");
  const exp = +getValue("experience");

  const fitnessScore =
    beep * 2 + cooper / 100 + (50 - sprint) + pushups / 2 +
    plank / 30 + (80 - heart) / 2 + jump / 2;
  const tennisScore =
    serve / 5 + servePct / 2 - errors + winPct / 2 + exp * 2;

  const totalScore = (fitnessScore + tennisScore) / 2;
  let feedback, rating;

  if (totalScore > 200) {
    rating = "🔥 Pro-level Performance!";
    feedback = "Excellent! Maintain consistency and sharpen your precision.";
  } else if (totalScore > 120) {
    rating = "💪 Strong Competitive Potential";
    feedback = "Improve endurance and serve accuracy to reach elite levels.";
  } else {
    rating = "🎾 Good Start!";
    feedback = "Focus on stamina, control, and technique improvement.";
  }

  document.getElementById("summary").innerHTML = `
    <p><strong>Fitness Score:</strong> ${fitnessScore.toFixed(1)}</p>
    <p><strong>Tennis Skill Score:</strong> ${tennisScore.toFixed(1)}</p>
    <h2>${rating}</h2>
    <p>${feedback}</p>
  `;
}
