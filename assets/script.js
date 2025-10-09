function savePhysicalTests() {
  const data = {
    beep: +document.getElementById("beep-test").value,
    cooper: +document.getElementById("cooper-test").value,
    sprint: +document.getElementById("sprint-test").value,
    pushups: +document.getElementById("pushups").value,
    plank: +document.getElementById("plank").value,
    resting: +document.getElementById("resting-heart").value,
    jump: +document.getElementById("vertical-jump").value,
  };
  localStorage.setItem("physicalTests", JSON.stringify(data));
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

function calculateScores(p, t) {
  // Physical score (max 100)
  let endurance = ((p.beep / 15) * 20 + (p.cooper / 3500) * 20);
  let strength = ((p.pushups / 60) * 15 + (p.plank / 240) * 15 + (p.jump / 70) * 15);
  let speed = ((4 - p.sprint) / 4) * 15; // lower sprint = better
  let heartBonus = (70 - p.resting) / 70 * 10;
  let physicalScore = endurance + strength + speed + heartBonus;
  physicalScore = Math.min(Math.max(physicalScore, 0), 100);

  // Tennis score (max 100)
  let tennisScore = (
    (t.serve / 200) * 25 +
    (t.firstServe / 100) * 15 +
    ((30 - t.errors) / 30) * 15 +
    (t.win / 100) * 25 +
    (t.years / 10) * 20
  );
  tennisScore = Math.min(Math.max(tennisScore, 0), 100);

  // Combined Pro Potential
  let proPotential = (physicalScore * 0.45 + tennisScore * 0.55).toFixed(1);

  return { physicalScore, tennisScore, proPotential };
}

window.onload = function () {
  if (window.location.pathname.endsWith("summary.html")) {
    const p = JSON.parse(localStorage.getItem("physicalTests") || "{}");
    const t = JSON.parse(localStorage.getItem("tennisStats") || "{}");
    const { physicalScore, tennisScore, proPotential } = calculateScores(p, t);

    let verdict =
      proPotential >= 85 ? "🏆 Pro Level Potential" :
      proPotential >= 70 ? "🔥 Advanced Player" :
      proPotential >= 50 ? "💪 Intermediate" :
      "🎾 Beginner – Keep Training!";

    document.getElementById("results").innerHTML = `
      <h3>Physical Fitness</h3>
      <ul>
        <li>Beep Test Level: ${p.beep}</li>
        <li>Cooper Test Distance: ${p.cooper} m</li>
        <li>20m Sprint: ${p.sprint} sec</li>
        <li>Push-ups: ${p.pushups}</li>
        <li>Plank: ${p.plank} sec</li>
        <li>Resting Heart Rate: ${p.resting} bpm</li>
        <li>Vertical Jump: ${p.jump} cm</li>
      </ul>
      <h3>Tennis Stats</h3>
      <ul>
        <li>Serve Speed: ${t.serve} km/h</li>
        <li>First Serve %: ${t.firstServe}%</li>
        <li>Unforced Errors: ${t.errors}</li>
        <li>Win %: ${t.win}%</li>
        <li>Years Experience: ${t.years}</li>
      </ul>
    `;

    document.getElementById("ratings").innerHTML = `
      <p>💪 Physical Fitness Score: <strong>${physicalScore.toFixed(1)} / 100</strong></p>
      <p>🎾 Tennis Performance Score: <strong>${tennisScore.toFixed(1)} / 100</strong></p>
      <h3 style="margin-top:15px;">🌟 Pro Potential: <span style="color:#008b2f;">${proPotential}%</span></h3>
      <p>${verdict}</p>
    `;
  }
};

