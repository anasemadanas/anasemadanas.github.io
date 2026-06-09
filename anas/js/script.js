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
