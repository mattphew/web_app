document.addEventListener("DOMContentLoaded", () => {
    // 1. Responzívne mobilné menu
    const navToggle = document.querySelector(".nav-toggle");
    const mainNav = document.querySelector(".main-nav");

    if (navToggle && mainNav) {
        navToggle.addEventListener("click", () => {
            const isOpen = mainNav.classList.toggle("is-open");
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });

        mainNav.querySelectorAll(".nav-link").forEach((link) => {
            link.addEventListener("click", () => {
                mainNav.classList.remove("is-open");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    // 2. Ovládanie intenzity ekvalizéra a boost režimu
    const powerSlider = document.getElementById("powerSlider");
    const powerValue = document.getElementById("powerValue");
    const boostBtn = document.getElementById("boostPulseBtn");
    const modeLabel = document.getElementById("garageModeLabel");
    const eqBars = document.querySelectorAll(".eq-bars span");

    const applyIntensity = (value) => {
        const num = Number(value);
        if (powerValue) {
            powerValue.textContent = `${num} %`;
        }
        const speed = (0.5 + (num / 100) * 1.4).toFixed(2);
        eqBars.forEach((bar, idx) => {
            bar.style.setProperty("--eq-speed", speed);
            const waveHeight = Math.min(100, Math.max(25, (num * 0.85) + ((idx % 3) * 8 - 8)));
            bar.style.setProperty("--h", `${waveHeight}%`);
        });
    };

    if (powerSlider) {
        applyIntensity(powerSlider.value);
        powerSlider.addEventListener("input", (e) => {
            applyIntensity(e.target.value);
        });
    }

    if (boostBtn) {
        boostBtn.addEventListener("click", () => {
            const active = document.body.classList.toggle("boost-active");
            if (modeLabel) {
                modeLabel.textContent = active
                    ? "REŽIM: BOOST AKTÍVNY"
                    : "REŽIM: ŠTANDARDNÁ PREVÁDZKA";
            }
            boostBtn.textContent = active
                ? "Vypnúť boost režim"
                : "Aktivovať boost režim";

            if (powerSlider) {
                powerSlider.value = active ? "100" : "75";
                applyIntensity(powerSlider.value);
            }
        });
    }


    // 3. Plynulé zjavenie prvkov pri scrollovaní
    const revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && revealEls.length > 0) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );
        revealEls.forEach((el) => observer.observe(el));
    } else {
        revealEls.forEach((el) => el.classList.add("is-visible"));
    }
});