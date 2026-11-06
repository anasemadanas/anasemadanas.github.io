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
