/* Renaldy Bilal Setyawan — Portfolio. Vanilla JS, no dependencies. */
(function () {
    "use strict";

    /* Mobile nav toggle */
    var navToggle = document.getElementById("navToggle");
    var navMenu = document.getElementById("navMenu");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", function () {
            var isOpen = navMenu.classList.toggle("open");
            navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        navMenu.querySelectorAll(".nav-link").forEach(function (link) {
            link.addEventListener("click", function () {
                navMenu.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    /* Active nav link highlighting on scroll */
    var sections = Array.prototype.slice.call(document.querySelectorAll("main > section[id]"));
    var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));

    function setActiveLink() {
        var current = sections[0];
        var headerOffset = 100;

        sections.forEach(function (section) {
            if (section.getBoundingClientRect().top - headerOffset <= 0) {
                current = section;
            }
        });

        navLinks.forEach(function (link) {
            var matches = link.getAttribute("href") === "#" + current.id;
            link.classList.toggle("active", matches);
        });
    }

    if (sections.length && navLinks.length) {
        window.addEventListener("scroll", setActiveLink, { passive: true });
        setActiveLink();
    }

    /* Footer year */
    var yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    /* Contact form -> mailto (no backend on GitHub Pages) */
    var contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            var name = contactForm.querySelector("#name").value.trim();
            var email = contactForm.querySelector("#email").value.trim();
            var subject = contactForm.querySelector("#subject").value.trim();
            var message = contactForm.querySelector("#message").value.trim();

            var body = "From: " + name + " <" + email + ">\n\n" + message;
            var mailto =
                "mailto:renaldybys@gmail.com" +
                "?subject=" + encodeURIComponent(subject) +
                "&body=" + encodeURIComponent(body);

            window.location.href = mailto;
        });
    }
})();
