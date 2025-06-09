window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  if (!data.nom || !data.email || !data.message) {
    alert("Veuillez remplir tous les champs obligatoires.");
    return;
  }

  const submitBtn = this.querySelector(".submit-btn");
  const originalText = submitBtn.textContent;

  submitBtn.textContent = "Envoi en cours...";
  submitBtn.disabled = true;

  setTimeout(() => {
    alert(
      "Merci pour votre message ! Nous vous répondrons dans les plus brefs délais."
    );
    this.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 2000);
});

document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }

  updateCounter();
}

const statsObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const number = entry.target.querySelector(".stat-number");
        const target = parseInt(number.textContent);
        if (!isNaN(target)) {
          animateCounter(number, target);
        }
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".stat-item").forEach((stat) => {
  statsObserver.observe(stat);
});

const mobileMenu = document.querySelector(".mobile-menu");
const navMenu = document.querySelector(".nav-menu");

mobileMenu.addEventListener("click", function () {
  this.classList.toggle("active");
  navMenu.classList.toggle("active");
});

const mobileStyles = `
            @media (max-width: 768px) {
                .nav-menu.active {
                    display: flex;
                    position: fixed;
                    top: 80px;
                    left: 0;
                    width: 100%;
                    height: calc(100vh - 80px);
                    background: var(--primary-green);
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 3rem;
                    z-index: 999;
                }
                
                .mobile-menu.active span:nth-child(1) {
                    transform: rotate(-45deg) translate(-5px, 6px);
                }
                
                .mobile-menu.active span:nth-child(2) {
                    opacity: 0;
                }
                
                .mobile-menu.active span:nth-child(3) {
                    transform: rotate(45deg) translate(-5px, -6px);
                }
            }
        `;

const styleSheet = document.createElement("style");
styleSheet.textContent = mobileStyles;
document.head.appendChild(styleSheet);

window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  const rate = scrolled * -0.5;

  if (hero) {
    hero.style.transform = `translateY(${rate}px)`;
  }
});

document.querySelectorAll(".service-icon").forEach((icon, index) => {
  icon.style.animation = `float 3s ease-in-out infinite ${index * 0.2}s`;
});

document
  .querySelectorAll(
    ".form-group input, .form-group textarea, .form-group select"
  )
  .forEach((field) => {
    field.addEventListener("focus", function () {
      this.parentElement.style.transform = "scale(1.02)";
      this.style.boxShadow = "0 0 0 3px rgba(143, 188, 143, 0.3)";
    });

    field.addEventListener("blur", function () {
      this.parentElement.style.transform = "scale(1)";
      this.style.boxShadow = "none";
    });
  });

function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = "";
  element.style.opacity = "1";

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

window.addEventListener("load", function () {
  setTimeout(() => {
    const heroTitle = document.querySelector(".hero h1");
    if (heroTitle) {
      typeWriter(heroTitle, "Paysagisme Écologique", 150);
    }
  }, 1000);
});

const scrollProgress = document.createElement("div");
scrollProgress.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--light-green), var(--accent-green));
            z-index: 9999;
            transition: width 0.1s ease;
        `;
document.body.appendChild(scrollProgress);

window.addEventListener("scroll", function () {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  scrollProgress.style.width = scrolled + "%";
});

document.querySelectorAll(".service-card").forEach((card, index) => {
  card.style.animationDelay = `${index * 0.1}s`;
});

const revealElements = document.querySelectorAll(".fade-in");
revealElements.forEach((element, index) => {
  element.style.transitionDelay = `${index * 0.1}s`;
});
