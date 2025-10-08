document.getElementById("calculateBtn").addEventListener("click", () => {
  const serveSpeed = parseFloat(document.getElementById("serveSpeed").value);
  const winPercent = parseFloat(document.getElementById("winPercent").value);
  const stamina = parseFloat(document.getElementById("stamina").value);

  if (isNaN(serveSpeed) || isNaN(winPercent) || isNaN(stamina)) {
    alert("Please enter valid numbers for all fields!");
    return;
  }

  // Formula for performance score
  const performanceScore = (serveSpeed / 200) * 0.4 + (winPercent / 100) * 0.4 + (stamina / 10) * 0.2;

  // Potential percentage
  const potentialPercent = Math.min(Math.round(performanceScore * 100), 100);

  document.getElementById("performanceResult").textContent = `Performance Score: ${performanceScore.toFixed(2)}`;
  document.getElementById("potentialResult").textContent = `Pro Potential: ${potentialPercent}%`;
});
