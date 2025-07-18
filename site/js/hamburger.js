document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("hamburger-button");
  const nav = document.getElementById("mobile-nav");

  btn.addEventListener("click", () => {
    const isExpanded = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", !isExpanded);
    nav.classList.toggle("hidden");
  });
});
