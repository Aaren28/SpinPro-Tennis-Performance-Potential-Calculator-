
let timerInterval;
function startTimer(minutes) {
  clearInterval(timerInterval);
  let time = minutes * 60;
  const timerDisplay = document.getElementById("timer");
  
  timerInterval = setInterval(() => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    timerDisplay.textContent = `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    if (time <= 0) clearInterval(timerInterval);
    time--;
  }, 1000);
}

// Save input and go to next page
function saveAndNext(id, nextPage) {
  const input = document.getElementById(id);
  if (input && input.value !== "") {
    localStorage.setItem(id, input.value);
    window.location.href = nextPage;
  } else {
    alert("Please enter a value before continuing!");
  }
}

// On summary page, display results
window.addEventListener("DOMContentLoaded", () => {
  const resultsDiv = document.getElementById("results");
  if (!resultsDiv) return;

  const keys = [
    "beepLevel",
    "cooperDistance",
    "sprintTime",
    "jumpHeight",
    "pushups",
    "plankTime",
    "serveSpeed",
    "firstServePercent",
    "errors",
    "winPercent",
    "yearsExperience"
  ];

  let html = "<h3>Your Entered Data:</h3><ul>";
  keys.forEach(k => {
    const v = localStorage.getItem(k);
    if (v) html += `<li><strong>${k}:</strong> ${v}</li>`;
  });
  html += "</ul>";

  resultsDiv.innerHTML = html;
});
