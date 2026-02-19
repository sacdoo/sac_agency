const spotlight = document.querySelector(".spotlight");

if (spotlight) {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  let targetX = window.innerWidth * 0.5;
  let targetY = window.innerHeight * 0.3;
  let currentX = targetX;
  let currentY = targetY;

  const lerp = (start, end, amt) => start + (end - start) * amt;

  const update = () => {
    if (!prefersReduced.matches) {
      currentX = lerp(currentX, targetX, 0.08);
      currentY = lerp(currentY, targetY, 0.08);
      spotlight.style.background = `radial-gradient(circle at ${currentX}px ${currentY}px, rgba(199, 255, 82, 0.18), rgba(17, 17, 17, 0) 60%)`;
    }
    requestAnimationFrame(update);
  };

  const handleMove = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    targetX = x;
    targetY = y;
  };

  if (!prefersReduced.matches) {
    window.addEventListener("mousemove", handleMove);
  } else {
    spotlight.style.opacity = "0.3";
  }

  prefersReduced.addEventListener("change", () => {
    if (prefersReduced.matches) {
      spotlight.style.opacity = "0.2";
    } else {
      spotlight.style.opacity = "1";
    }
  });

  update();
}
