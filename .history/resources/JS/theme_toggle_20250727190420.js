document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  const icon = toggleBtn.querySelector("i");

  // Check stored theme on page load
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === "light") {
    document.body.classList.add("light-theme");
    icon.classList.replace("fa-moon", "fa-sun");
  }

  toggleBtn.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-theme");
    icon.classList.toggle("fa-sun", isLight);
    icon.classList.toggle("fa-moon", !isLight);
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
});
