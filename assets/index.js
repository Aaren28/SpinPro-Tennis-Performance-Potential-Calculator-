document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("performance-form");
  const resultSection = document.getElementById("result");
  const scoreText = document.getElementById("score");
  const feedback = document.getElementById("feedback");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get all values
    const beepCooper = parseFloat(document.getElementById("beepCooper").value);
    const sprint40 = parseFloat(document.getElementById("sprint40").value);
    const verticalJump = parseFloat(document.getElementById("verticalJump").value);
    const pushups = parseFloat(document.getElementById("pushups").value);
    const plankTime = parseFloat(document.getElementById("plankTime").value);
    const restingHR = parseFloat(document.getElementById("restingHR").value);
    const serveSpeed = parseFloat(document.getElementById("serveSpeed").value);
    const firstServe = parseFloat(document.getElementById("firstServe").value);
    const errors = parseFloat(document.getElementById("errors").value);
    const winPct = parseFloat(document.getElementById("winPct").value);
    const experience = parseFloat(document.getElementById("experience").value);

    // Calculate normalized scores (0–100 scale)
    const enduranceScore = Math.min((beepCooper / 12) * 10, 100); // rough scaling for beep test
    const sprintScore = Math.max(100 - sprint40 * 10, 0);
    const jumpScore = Math.min(verticalJump * 2, 100);
    const strengthScore = Math.min((pushups / 60) * 100, 100);
    const coreScore = Math.min((plankTime / 180) * 100, 100);
    const heartScore = Math.max(100 - (restingHR - 50), 0);

    const serveScore = Math.min((serveSpeed / 200) * 100, 100);
    const accuracyScore = firstServe;
    const errorScore = Math.max(100 - errors * 2, 0);
    const winScore = winPct;
    const expScore = Math.min(experience * 10, 100);

    // Weighted average
    const totalScore = Math.round(
      (enduranceScore * 0.15 +
        sprintScore * 0.1 +
        jumpScore * 0.1 +
        strengthScore * 0.1 +
        coreScore * 0.05 +
        heartScore * 0.05 +
        serveScore * 0.15 +
        accuracyScore * 0.1 +
        errorScore * 0.05 +
        winScore * 0.1 +
        expScore * 0.05)
    );

    // Display result
    resultSection.classList.remove("hidden");
    scoreText.textContent = `Overall Performance Score: ${totalScore}/100`;

    if (totalScore >= 85) {
      feedback.textContent = "🔥 Excellent! You’re performing at an advanced competitive level.";
    } else if (totalScore >= 70) {
      feedback.textContent = "💪 Strong foundation – keep refining your technique and conditioning.";
    } else if (totalScore >= 50) {
      feedback.textContent = "⚡ Decent potential – focus on consistency and endurance training.";
    } else {
      feedback.textContent = "🎾 Keep training! Improving fitness and fundamentals will boost your performance.";
    }
  });
});
