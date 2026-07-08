/* Renaldy Bilal Setyawan — Data Analyst Portfolio. Vanilla JS, no dependencies. */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Mobile nav toggle ---- */
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Scrollspy: highlight active nav link on scroll ---- */
  var sections = document.querySelectorAll("main section[id]");
  var navLinkMap = {};
  document.querySelectorAll(".nav-link").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      navLinkMap[href.slice(1)] = link;
    }
  });

  if (sections.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = navLinkMap[entry.target.id];
          if (!link) return;
          if (entry.isIntersecting) {
            Object.keys(navLinkMap).forEach(function (id) {
              navLinkMap[id].removeAttribute("aria-current");
            });
            link.setAttribute("aria-current", "true");
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ---- Dynamic footer year ---- */
  var yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ---- Mailto-based contact form (static site, no backend) ---- */
  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var name = contactForm.elements["name"].value.trim();
      var email = contactForm.elements["email"].value.trim();
      var message = contactForm.elements["message"].value.trim();

      var subject = encodeURIComponent("Portfolio contact from " + (name || "website visitor"));
      var body = encodeURIComponent(
        message + "\n\n---\nName: " + name + "\nEmail: " + email
      );
      window.location.href = "mailto:renaldybys@gmail.com?subject=" + subject + "&body=" + body;
    });
  }

  /* ---- Respect prefers-reduced-motion for any future JS-driven motion ---- */
  if (prefersReducedMotion) {
    document.documentElement.classList.add("reduced-motion");
  }
})();
