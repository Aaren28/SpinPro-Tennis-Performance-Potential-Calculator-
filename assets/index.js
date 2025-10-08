document.getElementById("performanceForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const beep = parseFloat(document.getElementById("beepTest").value) || 0;
  const cooper = parseFloat(document.getElementById("cooperTest").value) || 0;
  const sprint = parseFloat(document.getElementById("sprint").value) || 0;
  const jump = parseFloat(document.getElementById("jump").value) || 0;
  const pushups = parseFloat(document.getElementById("pushups").value) || 0;
  const plank = parseFloat(document.getElementById("plank").value) || 0;
  const rhr = parseFloat(document.getElementById("rhr").value) || 0;
  const serveSpeed = parseFloat(document.getElementById("serveSpeed").value) || 0;
  const firstServe = parseFloat(document.getElementById("firstServe").value) || 0;
  const unforcedErrors = parseFloat(document.getElementById("unforcedErrors").value) || 0;
  const winRate = parseFloat(document.getElementById("winRate").value) || 0;
  const experience = parseFloat(document.getElementById("experience").value) || 0;

  // Normalize inputs into one performance score (simple but balanced)
  const enduranceScore = (beep * 10 + cooper / 100) - (rhr / 2);
  const powerScore = jump * 0.8 + pushups * 0.5 + plank / 5;
  const speedScore = 100 - (sprint * 10);
  const tennisSkill = (serveSpeed / 2 + firstServe * 1.2 + winRate * 1.5) - (unforcedErrors * 0.8);
  const experienceBonus = experience * 5;

  const totalScore = enduranceScore + powerScore + speedScore + tennisSkill + experienceBonus;
  const normalized = Math.max(0, Math.min(100, totalScore / 10));

  const proPotential = Math.max(0, Math.min(100, (normalized * 0.9 + experience * 2)));

  document.getElementById("score").textContent = `🏋️ Performance Score: ${normalized.toFixed(1)} / 100`;
  document.getElementById("potential").textContent = `🌟 Pro Potential: ${proPotential.toFixed(1)}%`;

  const resultDiv = document.getElementById("result");
  resultDiv.classList.remove("hidden");
});
