// script.js

// 🔹 Efeito de digitação no h1
document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector("h1");
  if (title) {
    const text = title.textContent;
    title.textContent = "";
    let i = 0;

    function typeEffect() {
      if (i < text.length) {
        title.textContent += text.charAt(i);
        i++;
        setTimeout(typeEffect, 100);
      }
    }
    typeEffect();
  }
});

// 🔹 Rolagem suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// 🔹 Animação ao aparecer na tela
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".portfolio-item, .qualificacoes li, .endereco li")
  .forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
  });

// 🔹 Efeito pulsante vermelho escuro nos botões
document.querySelectorAll(".header-button").forEach(button => {
  button.addEventListener("click", () => {
    button.classList.add("pulse");
    setTimeout(() => button.classList.remove("pulse"), 500);
  });
});

// 🔹 Partículas vampirescas
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.createElement("canvas");
  canvas.id = "particles";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let particlesArray = [];
  const colors = ["#8b0000", "#ff4444", "#3b2f2f", "#b30000"]; // tons vampirescos

  // Ajustar tamanho
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Criar partículas
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 10;
      ctx.fill();
    }
  }

  // Inicializar partículas
  function init() {
    particlesArray = [];
    for (let i = 0; i < 100; i++) {
      particlesArray.push(new Particle());
    }
  }
  init();

  // Animar partículas
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();
});
