
document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. AUTOMATIC FOOTER YEAR
    // ==========================================

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // ==========================================
    // 2. LIVE CLOCK
    // ==========================================

    const clockElement = document.getElementById("clock");

    function updateClock() {
        if (!clockElement) return;

        clockElement.textContent = new Date().toLocaleTimeString(
            "en-GB",
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
        );
    }

    updateClock();
    setInterval(updateClock, 1000);


    // ==========================================
    // 3. WEBSITE COLOR THEMES
    // ==========================================

    const colorButtons = document.querySelectorAll(".color-option");

    const themes = [
        "classic",
        "navy",
        "white",
        "charcoal",
        "vibrant",
        "forest",
        "pink",
        "beige"
    ];

    let currentTheme = "classic";
    let previousTheme = "classic";

    const themeButton = document.getElementById("theme-toggle");
    const themeLabel = document.getElementById("theme-label");

    // APPLY SELECTED THEME

    function applyTheme(theme, save = true) {

        if (!themes.includes(theme)) {
            theme = "classic";
        }

        currentTheme = theme;

        document.body.setAttribute("data-theme", theme);

        // Identify dark themes for existing dark-mode styles
        const darkThemes = ["navy", "charcoal", "forest"];

        const isDark = darkThemes.includes(theme);

        document.body.classList.toggle("dark", isDark);

        // Update active color circle
        colorButtons.forEach(function (button) {

            const isActive = button.dataset.theme === theme;

            button.classList.toggle("active", isActive);

            button.setAttribute(
                "aria-pressed",
                isActive ? "true" : "false"
            );

        });

        // Update existing theme button label
        if (themeLabel) {
            themeLabel.textContent = isDark ? "DARK" : "LIGHT";
        }

        // Save selected theme
        if (save) {
            try {
                localStorage.setItem("auwalPortfolioTheme", theme);
            } catch (error) {
                console.warn("Theme could not be saved.");
            }
        }

    }


    // LOAD SAVED THEME

    let savedTheme = "classic";

    try {
        savedTheme = localStorage.getItem("auwalPortfolioTheme") || "classic";
    } catch (error) {
        console.warn("Saved theme could not be loaded.");
    }

    applyTheme(savedTheme, false);


    // CLICK COLOR CIRCLES

    colorButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedTheme = this.dataset.theme;

            if (selectedTheme === currentTheme) return;

            previousTheme = currentTheme;

            applyTheme(selectedTheme);

        });

    });


    // ==========================================
    // 4. EXISTING DARK / LIGHT TOGGLE
    // ==========================================

    if (themeButton) {

        themeButton.addEventListener("click", function () {

            if (currentTheme === "charcoal") {

                applyTheme(previousTheme || "classic");

            } else {

                previousTheme = currentTheme;

                applyTheme("charcoal");

            }

        });

    }


    // ==========================================
    // 5. SMOOTH NAVIGATION
    // ==========================================

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    // ==========================================
    // 6. SLIDE TEXT AND REVEAL ANIMATION
    // ==========================================

    const revealElements = document.querySelectorAll(
        ".reveal, .slide-text"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("active");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.15
            }
        );

        revealElements.forEach(function (element) {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("active");
        });

    }


    // ==========================================
    // 7. HERO ANIMATION ON PAGE LOAD
    // ==========================================

    document.querySelectorAll(
        ".home-section .reveal"
    ).forEach(function (element) {

        element.classList.add("active");

    });


    // ==========================================
    // 8. WEBSITE LOADED
    // ==========================================

    console.log("AUWAL PORTFOLIO LOADED SUCCESSFULLY");
    console.log("COLOR THEME SYSTEM READY");

});
// Mobile Navigation Menu
const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");

if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
        navbar.classList.toggle("show");
    });

    document.querySelectorAll(".navbar a").forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("show");
        });
    });
}