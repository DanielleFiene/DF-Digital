document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  const icon = toggleBtn.querySelector("i");

  // start with sun icon
  icon.classList.add("fa-sun");

  // Check stored theme
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === "light") {
    document.body.classList.add("light-theme");
    icon.classList.replace("fa-sun", "fa-moon");
  }

  toggleBtn.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-theme");
    icon.classList.toggle("fa-moon", isLight);
    icon.classList.toggle("fa-sun", !isLight);
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
});
