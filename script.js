document.getElementById("year").textContent = new Date().getFullYear();

// copy email
document.querySelectorAll(".copy").forEach((btn) => {
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      btn.textContent = "copied ✓";
    } catch {
      btn.textContent = "copy failed";
    }
    setTimeout(() => (btn.textContent = "copy"), 1500);
  });
});

// highlight active section in nav
const links = new Map(
  [...document.querySelectorAll(".nav nav a[href^='#']")].map((a) => [a.getAttribute("href").slice(1), a])
);
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.classList.remove("active"));
      links.get(e.target.id)?.classList.add("active");
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);
links.forEach((_, id) => {
  const el = document.getElementById(id);
  if (el) observer.observe(el);
});
