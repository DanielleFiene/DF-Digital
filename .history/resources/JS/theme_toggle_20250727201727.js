document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  const icon = toggleBtn.querySelector("i");

  // Check stored theme
  const storedTheme = localStorage.getItem("theme");

  if (storedTheme === "light") {
    document.body.classList.add("light-theme");
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  } else {
    // Default = dark theme
    document.body.classList.remove("light-theme");
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
    localStorage.setItem("theme", "dark");
  }

  toggleBtn.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-theme");
    icon.classList.toggle("fa-moon", isLight);
    icon.classList.toggle("fa-sun", !isLight);
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
});
