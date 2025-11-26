// Set tahun otomatis di footer
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Animasi sederhana untuk statistik ketika masuk viewport
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute("data-count"), 10);
          let current = 0;
          const duration = 1400;
          const step = Math.max(1, Math.floor(target / (duration / 30)));

          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }
            el.textContent =
              target >= 1000 ? current.toLocaleString("id-ID") + "+" : current;
          }, 30);

          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((c) => observer.observe(c));
});
