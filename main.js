const gradientField = document.querySelector(".gradient-field");
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

if (gradientField) {
  const state = {
    x: window.innerWidth * 0.5,
    y: window.innerHeight * 0.4,
    tx: window.innerWidth * 0.5,
    ty: window.innerHeight * 0.4,
  };

  const lerp = (start, end, amt) => start + (end - start) * amt;

  const update = () => {
    if (!prefersReduced.matches) {
      state.x = lerp(state.x, state.tx, 0.06);
      state.y = lerp(state.y, state.ty, 0.06);

      const x = state.x;
      const y = state.y;

      document.documentElement.style.setProperty("--blob-a-x", `${x * 0.6}px`);
      document.documentElement.style.setProperty("--blob-a-y", `${y * 0.6}px`);
      document.documentElement.style.setProperty("--blob-b-x", `${x * 0.9}px`);
      document.documentElement.style.setProperty("--blob-b-y", `${y * 0.35}px`);
      document.documentElement.style.setProperty("--blob-c-x", `${x * 0.45}px`);
      document.documentElement.style.setProperty("--blob-c-y", `${y * 0.9}px`);
    }

    requestAnimationFrame(update);
  };

  const handleMove = (event) => {
    state.tx = event.clientX;
    state.ty = event.clientY;
  };

  if (!prefersReduced.matches) {
    window.addEventListener("mousemove", handleMove, { passive: true });
  } else {
    gradientField.style.opacity = "0.55";
  }

  prefersReduced.addEventListener("change", () => {
    gradientField.style.opacity = prefersReduced.matches ? "0.4" : "1";
  });

  update();
}
