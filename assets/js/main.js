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

  /* ---- Stack filter for Projects section ---- */
  var stackFilter = document.querySelector(".stack-filter");
  var projectCards = document.querySelectorAll(".projects-grid .project-card");

  if (stackFilter && projectCards.length) {
    var filterButtons = stackFilter.querySelectorAll(".stack-filter-btn");

    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        filterButtons.forEach(function (btn) {
          btn.classList.remove("is-active");
          btn.setAttribute("aria-pressed", "false");
        });
        button.classList.add("is-active");
        button.setAttribute("aria-pressed", "true");

        var stack = button.getAttribute("data-filter");
        projectCards.forEach(function (card) {
          var stacks = (card.getAttribute("data-stacks") || "").split(" ");
          var matches = stack === "all" || stacks.indexOf(stack) !== -1;
          card.classList.toggle("is-filtered-out", !matches);
        });
      });
    });
  }

  /* ---- Case study deck viewer ---- */
  /* Slides render as a plain stacked list until this runs, so the deck stays
     readable if JS is unavailable. */
  document.querySelectorAll(".deck-viewer").forEach(function (deck) {
    var slides = deck.querySelectorAll(".deck-slide");
    if (slides.length < 2) return;

    deck.classList.remove("no-js");

    var index = 0;
    var controls = document.createElement("div");
    controls.className = "deck-controls";
    controls.innerHTML =
      '<button type="button" class="deck-btn" data-deck-prev aria-label="Previous slide">←</button>' +
      '<button type="button" class="deck-btn" data-deck-next aria-label="Next slide">→</button>' +
      '<span class="deck-counter" aria-live="polite"></span>' +
      '<div class="deck-dots"></div>';
    deck.appendChild(controls);

    var prevBtn = controls.querySelector("[data-deck-prev]");
    var nextBtn = controls.querySelector("[data-deck-next]");
    var counter = controls.querySelector(".deck-counter");
    var dotWrap = controls.querySelector(".deck-dots");

    slides.forEach(function (slide, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "deck-dot";
      dot.setAttribute("aria-label", "Go to slide " + (i + 1));
      dot.addEventListener("click", function () {
        show(i);
      });
      dotWrap.appendChild(dot);
    });

    var dots = dotWrap.querySelectorAll(".deck-dot");

    function show(next) {
      index = Math.max(0, Math.min(next, slides.length - 1));
      slides.forEach(function (slide, i) {
        slide.classList.toggle("is-current", i === index);
        /* Keep off-screen slides out of the accessibility tree */
        slide.setAttribute("aria-hidden", i === index ? "false" : "true");
        /* Preload the neighbours so paging never shows a blank frame */
        if (Math.abs(i - index) <= 1) slide.loading = "eager";
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-current", i === index);
      });
      counter.textContent = index + 1 + " / " + slides.length;
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === slides.length - 1;
    }

    prevBtn.addEventListener("click", function () {
      show(index - 1);
    });
    nextBtn.addEventListener("click", function () {
      show(index + 1);
    });

    /* Arrow keys only while the deck has focus, so they don't hijack the page */
    deck.setAttribute("tabindex", "0");
    deck.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        show(index - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        show(index + 1);
      }
    });

    show(0);
  });

  /* ---- Respect prefers-reduced-motion for any future JS-driven motion ---- */
  if (prefersReducedMotion) {
    document.documentElement.classList.add("reduced-motion");
  }
})();
