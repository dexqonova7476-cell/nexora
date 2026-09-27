/* =========================================
   NEXORA — MAIN JAVASCRIPT
========================================= */
/* =========================================
   CYBER PARTICLE BACKGROUND
========================================= */

const canvas = document.querySelector("#cyberBackground");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


class Particle {

    constructor() {

        this.x = Math.random() * canvas.width;

        this.y = Math.random() * canvas.height;

        this.size =
            Math.random() * 1.8 + 0.4;

        this.speedX =
            (Math.random() - 0.5) * 0.35;

        this.speedY =
            (Math.random() - 0.5) * 0.35;

        this.opacity =
            Math.random() * 0.6 + 0.2;

    }


    update() {

        this.x += this.speedX;

        this.y += this.speedY;


        if (this.x < 0)
            this.x = canvas.width;

        if (this.x > canvas.width)
            this.x = 0;

        if (this.y < 0)
            this.y = canvas.height;

        if (this.y > canvas.height)
            this.y = 0;

    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(0,255,136,${this.opacity})`;

        ctx.shadowBlur = 10;

        ctx.shadowColor =
            "rgba(0,255,136,0.5)";

        ctx.fill();

        ctx.shadowBlur = 0;

    }

}


/* Create particles */

const particleCount =
    window.innerWidth < 700 ? 45 : 100;


for (let i = 0; i < particleCount; i++) {

    particles.push(
        new Particle()
    );

}


/* Connect nearby particles */

function connectParticles() {

    for (
        let i = 0;
        i < particles.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < particles.length;
            j++
        ) {

            const dx =
                particles[i].x -
                particles[j].x;

            const dy =
                particles[i].y -
                particles[j].y;

            const distance =
                Math.sqrt(
                    dx * dx + dy * dy
                );


            if (distance < 120) {

                const opacity =
                    0.12 *
                    (1 - distance / 120);


                ctx.beginPath();

                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );

                ctx.lineTo(
                    particles[j].x,
                    particles[j].y
                );

                ctx.strokeStyle =
                    `rgba(0,255,136,${opacity})`;

                ctx.lineWidth = 0.5;

                ctx.stroke();

            }

        }

    }

}


/* Animation */

function animateCyberBackground() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach((particle) => {

        particle.update();

        particle.draw();

    });


    connectParticles();


    requestAnimationFrame(
        animateCyberBackground
    );

}


animateCyberBackground();

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       LOADER
    ========================================== */

    const loader = document.querySelector("#loader");

    setTimeout(() => {
        if (loader) {
            loader.classList.add("hidden");
        }
    }, 1800);


    /* =========================================
       MOBILE MENU
    ========================================== */

    const menuButton = document.querySelector("#menuButton");
    const navLinks = document.querySelector(".nav-links");

    if (menuButton && navLinks) {

        menuButton.addEventListener("click", () => {

            navLinks.classList.toggle("mobile-active");

            menuButton.classList.toggle("menu-active");

        });

    }


    /* =========================================
       MOBILE NAVIGATION
    ========================================== */

    const navItems = document.querySelectorAll(".nav-link");

    navItems.forEach((item) => {

        item.addEventListener("click", () => {

            navItems.forEach((link) => {
                link.classList.remove("active");
            });

            item.classList.add("active");

            navLinks.classList.remove("mobile-active");

            menuButton.classList.remove("menu-active");

        });

    });


    /* =========================================
       SMOOTH NAVIGATION
    ========================================== */

    const allLinks = document.querySelectorAll('a[href^="#"]');

    allLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (
                targetId &&
                targetId !== "#"
            ) {

                const target = document.querySelector(targetId);

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }

        });

    });


    /* =========================================
       NAVBAR SCROLL EFFECT
    ========================================== */

    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {

        if (!header) return;

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });


    /* =========================================
       ACTIVE NAV LINK ON SCROLL
    ========================================== */

    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop = section.offsetTop - 150;

            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection = section.getAttribute("id");

            }

        });


        navItems.forEach((link) => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {

                link.classList.add("active");

            }

        });

    });


    /* =========================================
       SCROLL REVEAL
    ========================================== */

    const revealElements = document.querySelectorAll(
        ".section-label, .about-heading, .about-content, .service-card, .project-card, .stat, .tech-card, .founder-card, .contact-content"
    );

    revealElements.forEach((element) => {

        element.classList.add("reveal");

    });


    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("reveal-visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });


    /* =========================================
       STATISTICS COUNTER
    ========================================== */

    const statNumbers = document.querySelectorAll(".stat-number");

    const counterObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                const element = entry.target;

                const originalText = element.textContent.trim();

                const number = parseInt(
                    originalText.replace(/\D/g, "")
                );

                const suffix = originalText.replace(/[0-9]/g, "");

                if (isNaN(number)) return;

                let current = 0;

                const duration = 1500;

                const startTime = performance.now();


                function updateCounter(currentTime) {

                    const progress =
                        Math.min(
                            (currentTime - startTime) / duration,
                            1
                        );

                    const easedProgress =
                        1 - Math.pow(1 - progress, 3);

                    current = Math.floor(
                        easedProgress * number
                    );

                    element.textContent =
                        current + suffix;

                    if (progress < 1) {

                        requestAnimationFrame(updateCounter);

                    } else {

                        element.textContent =
                            originalText;

                    }

                }


                requestAnimationFrame(updateCounter);

                observer.unobserve(element);

            });

        },
        {
            threshold: 0.7
        }
    );


    statNumbers.forEach((stat) => {

        counterObserver.observe(stat);

    });


    /* =========================================
       TERMINAL TYPING EFFECT
    ========================================== */

    const terminalCommand =
        document.querySelector(".terminal-command");

    if (terminalCommand) {

        const text = "initializing_future.exe";

        terminalCommand.textContent = "";

        let index = 0;

        function typeCommand() {

            if (index < text.length) {

                terminalCommand.textContent +=
                    text.charAt(index);

                index++;

                setTimeout(typeCommand, 55);

            }

        }

        setTimeout(typeCommand, 700);

    }


    /* =========================================
       HERO PARALLAX
    ========================================== */

    const heroGrid =
        document.querySelector(".hero-grid");

    const heroGlow =
        document.querySelector(".hero-glow");


    window.addEventListener("mousemove", (event) => {

        if (!heroGrid || !heroGlow) return;

        const x =
            (event.clientX / window.innerWidth - 0.5);

        const y =
            (event.clientY / window.innerHeight - 0.5);


        heroGrid.style.transform =
            `translate(${x * 15}px, ${y * 15}px)`;


        heroGlow.style.transform =
            `translate(
                ${x * 30}px,
                calc(-50% + ${y * 30}px)
            )`;

    });


    /* =========================================
       SERVICE CARD HOVER
    ========================================== */

    const serviceCards =
        document.querySelectorAll(".service-card");


    serviceCards.forEach((card) => {

        card.addEventListener("mousemove", (event) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            card.style.setProperty(
                "--mouse-x",
                `${x}px`
            );

            card.style.setProperty(
                "--mouse-y",
                `${y}px`
            );

        });

    });


    /* =========================================
       PROJECT CARD TILT
    ========================================== */

    const projectCards =
        document.querySelectorAll(".project-card");


    projectCards.forEach((card) => {

        card.addEventListener("mousemove", (event) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateX =
                (y - centerY) / 35;

            const rotateY =
                (centerX - x) / 35;


            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(900px) rotateX(0) rotateY(0)";

        });

    });


    /* =========================================
       CURRENT YEAR
    ========================================== */

    const yearElement =
        document.querySelector(".footer-bottom span");

    if (yearElement) {

        const currentYear =
            new Date().getFullYear();

        yearElement.textContent =
            `© ${currentYear} NEXORA. ALL RIGHTS RESERVED.`;

    }


    /* =========================================
       CONSOLE MESSAGE
    ========================================== */

    console.log(
        "%c NEXORA SYSTEM ",
        "background:#00ff88;color:#000;font-size:16px;font-weight:bold;padding:8px;"
    );

    console.log(
        "%c Digital intelligence redefined.",
        "color:#00ff88;font-size:13px;"
    );

});