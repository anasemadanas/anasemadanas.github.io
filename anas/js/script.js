const typedElement = document.querySelector("#typed");

if (typedElement && window.Typed) {

  new Typed("#typed", {
    strings: [
      "Backend Developer",
      ".NET | C# | REST APIs",
      "Django | Databases | APIs",
      "Java | Spring Boot",
      "Cybersecurity Learner",
      "Building Real-World Systems"
    ],

    typeSpeed: 55,
    backSpeed: 35,
    backDelay: 1200,
    loop: true
  });

}

// Lightweight section reveals, inspired by the reference site's scroll motion.
// Content stays visible by default and when reduced motion is requested.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduceMotion && "IntersectionObserver" in window) {
  document.documentElement.classList.add("js-motion");
  const revealItems = document.querySelectorAll("main > section, main > header, .card, .project-card, .profile-panel, .logo-link");
  revealItems.forEach((item, index) => {
    item.classList.add("reveal-on-scroll");
    if (item.matches(".card, .project-card, .logo-link")) {
      item.style.setProperty("--reveal-delay", `${(index % 3) * 75}ms`);
    }
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

  revealItems.forEach(item => revealObserver.observe(item));
}


// Shared theme controls and home-page section navigation.
(() => {
  const storageKey = "anas-portfolio-theme";
  const storedTheme = localStorage.getItem(storageKey);
  const systemTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const toggle = document.querySelector(".theme-toggle");
    if (toggle) {
      toggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
      toggle.setAttribute("aria-pressed", String(theme === "light"));
      toggle.innerHTML = theme === "dark"
        ? '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg><span>Light</span>'
        : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8 8.7 8.7 0 1 0 20.2 15.2Z"/></svg><span>Dark</span>';
    }
  }

  const navContent = document.querySelector(".nav-content");
  if (navContent) {
    const toggle = document.createElement("button");
    toggle.className = "theme-toggle";
    toggle.type = "button";
    toggle.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      localStorage.setItem(storageKey, next);
      applyTheme(next);
    });
    navContent.append(toggle);
    applyTheme(storedTheme || systemTheme);
  }

  const sections = [...document.querySelectorAll("main > header[id], main > section[id]")];
  if (!sections.length) return;
  const dock = document.createElement("nav");
  dock.className = "section-dots";
  dock.setAttribute("aria-label", "Home page sections");
  const buttons = sections.map(section => {
    const name = section.dataset.sectionName || section.querySelector("h1, h2")?.textContent.trim() || section.id;
    const button = document.createElement("a");
    button.href = `#${section.id}`;
    button.className = "section-dot";
    button.setAttribute("aria-label", `Go to ${name}`);
    button.title = name;
    button.dataset.target = section.id;
    dock.append(button);
    return button;
  });
  document.body.append(dock);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      buttons.forEach(button => {
        const active = button.dataset.target === entry.target.id;
        button.classList.toggle("is-active", active);
        if (active) button.setAttribute("aria-current", "location");
        else button.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-25% 0px -55% 0px", threshold: 0 });
  sections.forEach(section => observer.observe(section));
})();
