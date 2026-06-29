// Anonymous project page — no external libraries, no tracking.
(function () {
  const tiles = Array.from(document.querySelectorAll(".tile, .gtcard"));

  // Per-tile speed buttons + click-to-toggle.
  tiles.forEach((tile) => {
    const v = tile.querySelector("video");
    const btns = Array.from(tile.querySelectorAll(".speed button"));

    btns.forEach((b) => b.addEventListener("click", (e) => {
      e.stopPropagation();
      v.playbackRate = parseFloat(b.dataset.rate);
      btns.forEach((x) => x.classList.toggle("on", x === b));
      if (v.paused) v.play().catch(() => {});
    }));

    // Click the video to play/pause.
    v.addEventListener("click", () => { v.paused ? v.play().catch(() => {}) : v.pause(); });
  });

  // Autoplay (muted) only while in view; pause when out — keeps the page light.
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        const v = en.target.querySelector("video");
        if (en.isIntersecting) {
          if (v.preload === "none") v.preload = "auto";
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.35 });
    tiles.forEach((t) => io.observe(t));
  } else {
    tiles.forEach((t) => t.querySelector("video").setAttribute("controls", ""));
  }
})();
